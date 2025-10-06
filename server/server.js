// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './configs/mongodb.js';
// import { clerkWebhooks,stripeWebhooks} from './controllers/webhooks.js'; 
// import educatorRouter from './routes/educatorRoutes.js';
//  import { clerkMiddleware ,getAuth} from '@clerk/express';
// //import { ClerkExpressWithAuth } from '@clerk/express';
// import connectCloudinay from './configs/cloudinary.js';
// import courseRouter from './routes/courseRoute.js';
// import userRouter from './routes/userRoutes.js';

// // initialize express 
// const app = express();


// // connect to db
// await connectDB();
// await connectCloudinay();


// // middleware
// app.use(cors());
// app.use('/clerk', express.json(), clerkWebhooks);
// app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);
// //app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);
// //app.use(express.json());
// //app.use(clerkMiddleware())
// //app.use(ClerkExpressWithAuth());

// app.use(clerkMiddleware(), (req, res, next) => {
//   // Manually inject auth from the request
//   req.auth = getAuth(req);
//   next();
// });
// // Routes
// app.get('/', (req,res)=>{res.send("API is working fine!")})
// //app.post('/clerk', express.json(), clerkWebhooks)
// app.use('/api/educator', express.json(), educatorRouter);
// app.use('/api/course', express.json(), courseRouter);
// app.use('/api/user', express.json(), userRouter);
// // app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);//uncomment this






// // port
// const PORT = process.env.PORT || 5000;

// // app.listen(PORT, ()=> {
// //     console.log(`Server is running on ${PORT}`);
    
// // })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// }).on("error", (err) => {
//   if (err.code === "EADDRINUSE") {
//     console.error(`Port ${PORT} is already in use`);
//     process.exit(1);
//   }
// });

// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/mongodb.js';
// import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
// import educatorRouter from './routes/educatorRoutes.js';
// import { clerkMiddleware, getAuth } from '@clerk/express';
// import connectCloudinary from './configs/cloudinary.js';
// import courseRouter from './routes/courseRoute.js';
// import userRouter from './routes/userRoutes.js';

// const app = express();

// // connect to db
// await connectDB();
// await connectCloudinary();

// // middleware
// app.use(cors());

// // ✅ Stripe webhook (MUST come BEFORE express.json)
// app.post(
//   '/stripe',
//   express.raw({ type: 'application/json' }),
//   stripeWebhooks
// );

// // ✅ Clerk webhook
// app.post('/clerk', express.json(), clerkWebhooks);

// // ✅ Apply JSON for everything else
// app.use(express.json());

// // ✅ Clerk middleware
// app.use(clerkMiddleware(), (req, res, next) => {
//   req.auth = getAuth(req);
//   next();
// });

// // Routes
// app.get('/', (req, res) => {
//   res.send('API is working fine!');
// });

// app.use('/api/educator', educatorRouter);
// app.use('/api/course', courseRouter);
// app.use('/api/user', userRouter);

// // port
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// }).on('error', (err) => {
//   if (err.code === 'EADDRINUSE') {
//     console.error(`Port ${PORT} is already in use`);
//     process.exit(1);
//   }
// });


// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './configs/mongodb.js';
// import { clerkWebhooks,stripeWebhooks} from './controllers/webhooks.js'; 
// import educatorRouter from './routes/educatorRoutes.js';
//  import { clerkMiddleware ,getAuth} from '@clerk/express';
// //import { ClerkExpressWithAuth } from '@clerk/express';
// import connectCloudinay from './configs/cloudinary.js';
// import courseRouter from './routes/courseRoute.js';
// import userRouter from './routes/userRoutes.js';

// // initialize express 
// const app = express();


// // connect to db
// await connectDB();
// await connectCloudinay();


// // middleware
// app.use(cors());
// // app.use('/clerk', express.json(), clerkWebhooks);
// // app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);
// // //app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);
// // //app.use(express.json());
// app.use(clerkMiddleware())
// //app.use(ClerkExpressWithAuth());


// // Routes
// app.get('/', (req,res)=>res.send("API is working fine!"))
// app.post('/clerk', express.json(), clerkWebhooks)
// app.use('/api/educator', express.json(), educatorRouter);
// app.use('/api/course', express.json(), courseRouter);
// app.use('/api/user', express.json(), userRouter);
//  app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);


// // port
// const PORT = process.env.PORT || 5000;

// // app.listen(PORT, ()=> {
// //     console.log(`Server is running on ${PORT}`);
    
// // })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// })

// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/mongodb.js';
// import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'; 
// import educatorRouter from './routes/educatorRoutes.js';
// import { clerkMiddleware } from '@clerk/express';
// import connectCloudinay from './configs/cloudinary.js';
// import courseRouter from './routes/courseRoute.js';
// import userRouter from './routes/userRoutes.js';

// // initialize express 
// const app = express();

// // connect to db
// await connectDB();
// await connectCloudinay();

// // middleware
// app.use(cors());
// app.use(clerkMiddleware());

// // Routes
// app.get('/', (req,res)=>res.send("API is working fine!"));

// // Clerk webhook
// app.post('/clerk', express.json(), clerkWebhooks);

// // Stripe webhook (⚠️ raw body required!)
// app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// // API routes (safe to use express.json() here)
// app.use('/api/educator', express.json(), educatorRouter);
// app.use('/api/course', express.json(), courseRouter);
// app.use('/api/user', express.json(), userRouter);

// // port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import connectCloudinay from "./configs/cloudinary.js";

import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";

import educatorRouter from "./routes/educatorRoutes.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// --- Connect to DB & Cloudinary ---
await connectDB();
await connectCloudinay();

// --- Middleware ---
app.use(cors());

// Clerk middleware (must come before Clerk routes)
app.use(clerkMiddleware());

// --- Routes ---
// Root
app.get("/", (req, res) => res.send("API is working fine!"));

// Clerk webhook route
app.post("/clerk", express.json(), clerkWebhooks);

// Stripe webhook route (⚠️ must use express.raw for Stripe)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// JSON body parser for regular API routes
app.use(express.json());

// API routes
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


