import Stripe from "stripe";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import { CourseProgress } from "../models/CourseProgress.js";

// Get user data
export const getUserData = async (req, res) => {
	 // Adding these three lines to disable caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
	try {
		const userId = req.auth.userId;
		const user = await User.findById(userId);
		if (!user) {
			return res.json({ success: false, message: "User not found!" });
		}

		return res.json({ success: true, user });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

// User enrolled courses
export const userEnrolledCourses = async (req, res) => {
	  // Adding these three lines to disable caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
	try {
		const userId = req.auth.userId;
		const userData = await User.findById(userId).populate("enrolledCourses");

		return res.json({
			success: true,
			enrolledCourses: userData.enrolledCourses,
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

// Purchase course
export const purchaseCourse = async (req, res) => {
	try {
		const { courseId } = req.body;
		const { origin } = req.headers;
		const userId = req.auth.userId;

		const userData = await User.findById(userId);
		const courseData = await Course.findById(courseId);

		if (!userData || !courseData) {
			return res.json({ success: false, message: "Data Not Found" });
		}

		const purchaseData = {
			courseId: courseData._id,
			userId,
			amount: (
				courseData.coursePrice -
				(courseData.discount * courseData.coursePrice) / 100
			).toFixed(2),
		};

		const newPurchase = await Purchase.create(purchaseData);

		// Stripe
		const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
		const currency = process.env.CURRENCY.toLowerCase();

		const line_items = [
			{
				price_data: {
					currency,
					product_data: {
						name: courseData.courseTitle,
					},
					unit_amount: Math.floor(newPurchase.amount * 100),
				},
				quantity: 1,
			},
		];

		const session = await stripeInstance.checkout.sessions.create({
			success_url: `${origin}/loading/my-enrollments`,
			cancel_url: `${origin}/`,
			line_items: line_items,
			mode: "payment",
			metadata: {
				purchaseId: newPurchase._id.toString(),
			},
		});
		

// const session = await stripeInstance.checkout.sessions.create({
//   payment_method_types: ['card'],
//   mode: 'payment',
//   line_items: [
//     {
//       price_data: {
//         currency: process.env.CURRENCY.toLowerCase(), // 'inr'
//         product_data: {
//           name: courseData.courseTitle,
//         },
//         unit_amount: Math.floor(
//           (
//             courseData.coursePrice -
//             (courseData.discount * courseData.coursePrice) / 100
//           ) * 100
//         ),
//       },
//       quantity: 1,
//     },
//   ],
//   success_url: `${origin}/loading/my-enrollments`,
//   cancel_url: `${origin}/course/${courseData._id}`,
//   metadata: {
//     userId: userId.toString(),
//     courseId: courseData._id.toString(),
//     purchaseId: newPurchase._id.toString(),
//   },
// });


		return res.json({ success: true, session_url: session.url });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

// Update user course progress
export const updateUserCourseProgress = async (req, res) => {
	try {
		const userId = req.auth.userId;
		const { courseId, lectureId } = req.body;
		const progressData = await CourseProgress.findOne({ userId, courseId });

		if (progressData) {
			if (progressData.lectureCompleted.includes(lectureId)) {
				return res.json({
					success: true,
					message: "Lecture Already Completed",
				});
			}

			progressData.lectureCompleted.push(lectureId);
			progressData.completed = true;
			await progressData.save();
		} else {
			await CourseProgress.create({
				userId,
				courseId,
				lectureCompleted: [lectureId],
			});
		}
		return res.json({ success: true, message: "Progress Updated" });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

// Get user course progress
export const getUserCourseProgress = async (req, res) => {
	try {
		const userId = req.auth.userId;
		const { courseId } = req.body;
		const progressData = await CourseProgress.findOne({ userId, courseId });

		return res.json({ success: true, progressData });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

// Add user rating
export const addUserRating = async (req, res) => {
	try {
		const userId = req.auth.userId;
		const { courseId, rating } = req.body;

		if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
			return res.json({ success: false, message: "Invalid details" });
		}

		const course = await Course.findById(courseId);
		if (!course) {
			return res.json({ success: false, message: "Course Not found!" });
		}

		const user = await User.findById(userId);
		if (!user || !user.enrolledCourses.includes(courseId)) {
			return res.json({
				success: false,
				message: "User has not purchased this course.",
			});
		}

		const existingRatingIndex = course.courseRatings.findIndex(
			(r) => r.userId === userId
		);

		if (existingRatingIndex > -1) {
			course.courseRatings[existingRatingIndex].rating = rating;
		} else {
			course.courseRatings.push({ userId, rating });
		}

		await course.save();
		return res.json({ success: true, message: "Rating Added" });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
