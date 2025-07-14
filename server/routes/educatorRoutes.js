import express from 'express'

import { 
     addCourse,updateRoleToEducator } from '../controllers/educatorController.js'//import  educatorDashboardData,  getEnrolledStudentsData,getEducatorCourses,
import { protectEducator } from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';

const educatorRouter = express.Router()

// add educator role

educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);
educatorRouter.get('/courses', protectEducator, getEducatorCourses);
// educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);
// educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);


export default educatorRouter;