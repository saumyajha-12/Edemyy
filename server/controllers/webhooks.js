


// import { Webhook } from "svix";
// import User from "../models/User.js";
// import Stripe from "stripe";
// import { request, response } from "express";
// import { Purchase } from "../models/Purchase.js";
// import Course from "../models/Course.js";

// export const clerkWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//         const payload = JSON.stringify(req.body); // Use req.rawBody if available

//         await whook.verify(payload, {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         });

//         const { data, type } = req.body;

//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses?.[0]?.email_address || "",
//                     name: (data.first_name || "") + " " + (data.last_name || ""),
//                     imageUrl: data.image_url || "",
//                 };
//                 await User.create(userData);
//                 return res.json({});
//             }

//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_addresses?.[0]?.email_address || "",
//                     name: (data.first_name || "") + " " + (data.last_name || ""),
//                     imageUrl: data.image_url || "",
//                 };
//                 await User.findByIdAndUpdate(data.id, userData);
//                 return res.json({});
//             }

//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id);
//                 return res.json({});
//             }

//             default:
//                 return res.status(400).json({ success: false, message: "Unhandled event type" });
//         }
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
// };



// export const stripeWebhooks = async (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//         return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     const handlePaymentSuccess = async (paymentIntent) => {
//         try {
//             const paymentIntentId = paymentIntent.id;
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             if (!session.data.length) {
//                 console.error("No session data found for payment intent:", paymentIntentId);
//                 return;
//             }

//             const { purchaseId } = session.data[0].metadata;
//             const purchaseData = await Purchase.findById(purchaseId);

//             if (!purchaseData) {
//                 console.error("No purchase found for ID:", purchaseId);
//                 return;
//             }

//             const userData = await User.findById(purchaseData.userId);
//             const courseData = await Course.findById(purchaseData.courseId.toString());

//             if (!userData || !courseData) {
//                 console.error("User or Course not found");
//                 return;
//             }

//             // Add user to enrolled students
//             courseData.enrolledStudents.push(userData._id);
//             await courseData.save();

//             // Add course to user's enrolled courses
//             userData.enrolledCourses.push(courseData._id);
//             await userData.save();

//             // Update purchase status
//             purchaseData.status = 'completed';
//             await purchaseData.save();
//         } catch (error) {
//             console.error("Error handling payment success:", error);
//         }
//     };

//     const handlePaymentFailed = async (paymentIntent) => {
//         try {
//             const paymentIntentId = paymentIntent.id;
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent: paymentIntentId,
//             });

//             if (!session.data.length) {
//                 console.error("No session data found for failed payment intent:", paymentIntentId);
//                 return;
//             }

//             const { purchaseId } = session.data[0].metadata;
//             const purchaseData = await Purchase.findById(purchaseId);

//             if (!purchaseData) {
//                 console.error("No purchase found for ID:", purchaseId);
//                 return;
//             }

//             purchaseData.status = 'failed';
//             await purchaseData.save();
//         } catch (error) {
//             console.error("Error handling payment failure:", error);
//         }
//     };

//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             await handlePaymentSuccess(event.data.object);
//             break;


//         case 'payment_intent.payment_failed':
//             await handlePaymentFailed(event.data.object);
//             break;

//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a response to acknowledge receipt of the event
//     response.json({ received: true });
// };



console.log("--- WEBHOOKS FILE LOADED - NEW VERSION ---");

import Stripe from 'stripe';
import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import { Webhook } from "svix";

// CLERK WEBHOOK HANDLER
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const payload = JSON.stringify(req.body);

        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    imageUrl: data.image_url || "",
                };
                await User.create(userData);
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    imageUrl: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

// STRIPE WEBHOOK HANDLER

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            request.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 2. Handle the 'checkout.session.completed' event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        if (!session.metadata || !session.metadata.purchaseId) {
            console.error("Webhook received without purchaseId in metadata.");
            return response.status(400).send("Missing required metadata.");
        }

        try {
            const purchaseId = session.metadata.purchaseId;
            const purchaseData = await Purchase.findById(purchaseId);

            if (!purchaseData || purchaseData.status !== 'pending') {
                console.log(`Purchase not found or already processed: ${purchaseId}`);
                return response.json({ received: true, message: "Already processed." });
            }

            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId);

            if (!userData || !courseData) {
                console.error(`User or Course not found for Purchase ID: ${purchaseId}`);
                return response.status(404).send("User or Course not found.");
            }

            courseData.enrolledStudents.push(userData._id);
            userData.enrolledCourses.push(courseData._id);
            purchaseData.status = 'completed';

            await Promise.all([courseData.save(), userData.save(), purchaseData.save()]);
            console.log(`Successfully processed purchase: ${purchaseId}`);

        } catch (dbError) {
            console.error(`Database error while processing purchase: ${dbError.message}`);
            return response.status(500).send("Internal server error during DB update.");
        }
    }

    response.status(200).json({ received: true });
};