


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




//with logs
// import Stripe from 'stripe';
// import User from "../models/User.js";
// import { Purchase } from "../models/Purchase.js";
// import Course from "../models/Course.js";
// import { Webhook } from "svix";//svix is node js liabrary that helps handle webhooks

// // CLERK WEBHOOK HANDLER
// export const clerkWebhooks = async (req, res) => {
//     //When the user logs in with Google the first time, Clerk actually treats it as sign up under the hood (creates a new user).
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//         const payload = JSON.stringify(req.body);

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
//                     name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//                     imageUrl: data.image_url || "",
//                 };
//                 await User.create(userData);//saves the user data in our db
//                 break;
//             }
//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_addresses?.[0]?.email_address || "",
//                     name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//                     imageUrl: data.image_url || "",
//                 };
//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;
//             }
//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id);
//                 break;
//             }
//         }
//         return res.status(200).json({ success: true });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: error.message });
//     }
// };

// // STRIPE WEBHOOK HANDLER

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (request, response) => {
//     const sig=request.headers['stripe-signature'];
//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             request.headers['stripe-signature'],
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (err) {
//         console.error(`Webhook signature verification failed: ${err.message}`);
//         return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // 2. Handle the 'checkout.session.completed' event
//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;

//         if (!session.metadata || !session.metadata.purchaseId) {
//             console.error("Webhook received without purchaseId in metadata.");
//             return response.status(400).send("Missing required metadata.");
//         }

//         try {
//             const purchaseId = session.metadata.purchaseId;
//             const purchaseData = await Purchase.findById(purchaseId);

//             if (!purchaseData || purchaseData.status !== 'pending') {
//                 console.log(`Purchase not found or already processed: ${purchaseId}`);
//                 return response.json({ received: true, message: "Already processed." });
//             }

//             const userData = await User.findById(purchaseData.userId);
//             const courseData = await Course.findById(purchaseData.courseId);

//             if (!userData || !courseData) {
//                 console.error(`User or Course not found for Purchase ID: ${purchaseId}`);
//                 return response.status(404).send("User or Course not found.");
//             }

//             courseData.enrolledStudents.push(userData._id);
//             userData.enrolledCourses.push(courseData._id);
//             purchaseData.status = 'completed';

//             await Promise.all([courseData.save(), userData.save(), purchaseData.save()]);
//             console.log(`Successfully processed purchase: ${purchaseId}`);

//         } catch (dbError) {
//             console.error(`Database error while processing purchase: ${dbError.message}`);
//             return response.status(500).send("Internal server error during DB update.");
//         }
//     }

//     response.status(200).json({ received: true });
// };


//multiple console log to check the break point
import Stripe from "stripe";
import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import { Webhook } from "svix"; // Clerk

// ================== CLERK WEBHOOK HANDLER ==================
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);

    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };
        await User.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
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

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (request, response) => {
//     const sig=request.headers['stripe-signature'];
//     let event;

//     try {
//         event = Stripe.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (err) {
//         //console.error(`Webhook signature verification failed: ${err.message}`);
//         return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // 2. Handle the 'checkout.session.completed' event
//     switch(event.type) {
//       case 'payment_intent.succeeded':{
//         const paymentIntent = event.data.object;
//         const paymentIntentId = paymentIntent.id;

//         const session = await stripeInstance.checkout.sessions.list({
//           payment_intent: paymentIntentId
//         })

//         const {purchaseId} = session.data[0].metadata;

//         const purchaseData = await Purchase.findById(purchaseId)
//         const userData=await User.findById(purchaseData.userId)
//         const courseData=await Course.findById(purchaseData.courseId.toString())

//         courseData.enrolledStudents.push(userData)
//         await courseData.save()

//         userData.enrolledCourses.push(courseData._id)
//         await userData.save()

//         purchaseData.status='completed'
//         await purchaseData.save()

//         break;
//       }
//       case 'payment_intent.payment_failed':{
//            const paymentIntent = event.data.object;
//         const paymentIntentId = paymentIntent.id;

//         const session = await stripeInstance.checkout.sessions.list({
//           payment_intent: paymentIntentId
//         })

//         const {purchaseId} = session.data[0].metadata;
//         const purchaseData=await Purchase.findById(purchaseId)
//         purchaseData.status='failed'
//         await purchaseData.save()
//         break;
//       }

//       default:{
//         console.log('Unhandled event type ${event.type}');
//     }
// }
//     response.status(200).json({ received: true });
// }
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (request, response) => {
//   const sig = request.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       request.body, // must be raw body
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }
// console.log(`🔔 Received event: ${event.type}`);

//   switch (event.type) {
//     case 'checkout.session.completed': {
//       const session = event.data.object;

//       // ✅ pull purchaseId straight from metadata
//       const { purchaseId } = session.metadata;

//       const purchaseData = await Purchase.findById(purchaseId);
//       const userData = await User.findById(purchaseData.userId);
//       const courseData = await Course.findById(purchaseData.courseId.toString());

//       courseData.enrolledStudents.push(userData);
//       await courseData.save();

//       userData.enrolledCourses.push(courseData._id);
//       await userData.save();

//       purchaseData.status = 'completed';
//       await purchaseData.save();

//       break;
//     }

//     case 'checkout.session.expired':
//     case 'payment_intent.payment_failed': {
//       // handle failure
//       const session = event.data.object;
//       const { purchaseId } = session.metadata;

//       const purchaseData = await Purchase.findById(purchaseId);
//       purchaseData.status = 'failed';
//       await purchaseData.save();

//       break;
//     }

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   response.status(200).json({ received: true });
// };

// import Stripe from "stripe";
// import User from "../models/User.js";
// import { Purchase } from "../models/Purchase.js";
// import Course from "../models/Course.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Stripe Webhook Handler
 * ⚠️ Make sure to use `express.raw({ type: "application/json" })` in server.js
 */
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout session completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (!session.metadata || !session.metadata.purchaseId) {
      console.error("❌ Webhook received without purchaseId in metadata.");
      return res.status(400).send("Missing required metadata.");
    }

    try {
      const purchaseId = session.metadata.purchaseId;
      const purchase = await Purchase.findById(purchaseId);

      if (!purchase) {
        console.error(`❌ Purchase not found: ${purchaseId}`);
        return res.status(404).send("Purchase not found");
      }

      if (purchase.status !== "pending") {
        console.log(`⚠️ Purchase already processed: ${purchaseId}`);
        return res.json({ received: true, message: "Already processed" });
      }

      // Find related user & course
      const user = await User.findById(purchase.userId);
      const course = await Course.findById(purchase.courseId);

      if (!user || !course) {
        console.error(`❌ User or Course not found for Purchase ID: ${purchaseId}`);
        return res.status(404).send("User or Course not found");
      }

      // ✅ Update purchase status first
      purchase.status = "completed";
      await purchase.save();

      // ✅ Add user to course enrolledStudents array if not already
      if (!course.enrolledStudents.includes(user._id)) {
        course.enrolledStudents.push(user._id);
        await course.save();
      }

      // ✅ Add course to user enrolledCourses array if not already
      if (!user.enrolledCourses.includes(course._id)) {
        user.enrolledCourses.push(course._id);
        await user.save();
      }

      console.log(`✅ Purchase completed and enrollment updated: ${purchaseId}`);
    } catch (dbErr) {
      console.error(`❌ Database error processing purchase: ${dbErr.message}`);
      return res.status(500).send("Internal server error during DB update");
    }
  }

  // Handle other events if needed (optional)
  // e.g., payment failed, session expired
  // if (event.type === "payment_intent.payment_failed") { ... }

  return res.status(200).json({ received: true });
};
