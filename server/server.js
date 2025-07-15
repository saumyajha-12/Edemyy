import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks,stripeWebhooks} from './controllers/webhooks.js'; //, import  later
import educatorRouter from './routes/educatorRoutes.js';
 import { clerkMiddleware ,getAuth} from '@clerk/express';
//import { ClerkExpressWithAuth } from '@clerk/express';
import connectCloudinay from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';

// initialize express 
const app = express();


// connect to db
await connectDB();
await connectCloudinay();


// middleware
app.use(cors());
app.use(express.json());
//app.use(clerkMiddleware())
//app.use(ClerkExpressWithAuth());

app.use(clerkMiddleware(), (req, res, next) => {
  // Manually inject auth from the request
  req.auth = getAuth(req);
  next();
});
// Routes
app.get('/', (req,res)=>{res.send("API is working fine!")})
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);






// port
const PORT = process.env.PORT || 5000;

// app.listen(PORT, ()=> {
//     console.log(`Server is running on ${PORT}`);
    
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

