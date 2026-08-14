import Course from "../models/Course.js";
import redisClient from "../config/redis.js";

// get all courses

export const getAllCourse = async (req,res) => {
    try {
        if (redisClient.isOpen) {
            const cachedCourses = await redisClient.get('courses:all');
            if (cachedCourses) {
                console.log("Serving all courses from Redis cache");
                return res.json({ success: true, courses: JSON.parse(cachedCourses) });
            }
        }

        const courses = await Course.find({isPublished: true}).select(['-courseContent','-enrolledStudents']).populate({path: 'educator'})
        
        if (redisClient.isOpen) {
            await redisClient.set('courses:all', JSON.stringify(courses), {
                EX: 3600 // Cache for 1 hour
            });
        }

        res.json ({success: true, courses})
    } catch (error) {
        res.json({success: false, message:error.message})
    }
}


// get course by id

export const getCourseId = async(req,res)=>{
    const {id} = req.params 
    try {
        if (redisClient.isOpen) {
            const cachedCourse = await redisClient.get(`course:${id}`);
            if (cachedCourse) {
                console.log(`Serving course ${id} from Redis cache`);
                return res.json({ success: true, courseData: JSON.parse(cachedCourse) });
            }
        }

        const courseData = await Course.findById(id).populate({path:'educator'});

        // Remove lecture Url if previewFrese is false

        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree){
                    lecture.lectureurl = "";
                }
            })
        })
        
        if (redisClient.isOpen) {
            await redisClient.set(`course:${id}`, JSON.stringify(courseData), {
                EX: 3600 // Cache for 1 hour
            });
        }

        res.json({success:true, courseData})
        
    } catch (error) {
        res.json({success: false, message:error.message})
    }
}
// Step-by-step explanation:

// import Course from "../models/Course.js";

// Importing your Mongoose Course model (schema that represents courses collection in MongoDB).

// export const getAllCourse = async (req, res) => { ... }

// This is a controller function (async because it calls MongoDB, which is asynchronous).

// It will be used in routes, e.g. router.get("/courses", getAllCourse).

// const courses = await Course.find({ isPublished: true })

// Querying the database to get all courses where isPublished: true.

// So only published courses will be fetched, draft/unpublished ones are ignored.

// .select(['-courseContent','-enrolledStudents'])

// This tells MongoDB to exclude certain fields from the result.

// -courseContent → don’t include courseContent field (maybe it’s heavy/long).

// -enrolledStudents → don’t include enrolledStudents field (maybe sensitive info).

// So response will be lighter and safer.

// .populate({ path: 'educator' })

// If your Course schema has something like:

// educator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }


// then .populate('educator') will replace the educator id with the full User document (name, email, etc.) from the User collection.

// Basically it joins two collections: Course ↔ User.

// res.json({ success: true, courses })

// Sending back a JSON response with:

// success: true

// courses: [...] (array of course objects fetched).

// Error handling (catch)

// If something goes wrong (DB error, etc.), it will send:

// {
//   "success": false,
//   "message": "error details..."
// }

// ✅ Example Response (if 2 courses are found):
// {
//   "success": true,
//   "courses": [
//     {
//       "_id": "64abc123",
//       "title": "Full Stack Bootcamp",
//       "price": 499,
//       "educator": {
//         "_id": "62xyz789",
//         "name": "Saumya Jha",
//         "email": "saumya@example.com"
//       },
//       "isPublished": true
//     },
//     {
//       "_id": "64def456",
//       "title": "Data Structures in JS",
//       "price": 199,
//       "educator": {
//         "_id": "62uvw456",
//         "name": "Vedant",
//         "email": "vedant@example.com"
//       },
//       "isPublished": true
//     }
//   ]
// }


// 👉 In short:
// This controller gets all published courses, hides heavy/private fields, attaches educator details, and returns them as JSON.

// Do you also want me to show you how to add filters (like search by course title or price range) in this same function?
