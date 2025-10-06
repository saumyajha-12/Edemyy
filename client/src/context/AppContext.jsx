// import { createContext, useEffect, useState } from "react";
// import { dummyCourses } from "../assets/assets";
// import { data, useNavigate } from "react-router-dom";
// import humanizeDuration from "humanize-duration"
// import {useAuth, useUser} from '@clerk/clerk-react'
//  import axios from 'axios'
// import {  toast } from 'react-toastify'; //till here
// export const AppContext = createContext()

// export const AppContextProvider = (props)=>{

//      const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const currency = import.meta.env.VITE_CURRENCY;
//     const navigate = useNavigate();

//     const {getToken} = useAuth();
//     // new c const {user} = useUser()
// // new line below
//  const {user}=useUser()
//     const [allCourses, setAllCourses] = useState([])
//     const [isEducator, setIsEducator] = useState(false)
//     const [enrolledCourses, setEnrolledCourses] = useState([])
//     const [userData, setUserData] = useState(null)

//     // fetch all courses 
//     const fetchAllCourses = async ()=>{
//         //  setAllCourses(dummyCourses) 
//          try {
//             const {data} = await axios.get(backendUrl + '/api/course/all');
//             if(data.success)
//             {
//                 setAllCourses(data.courses)
//             }else{
//                 toast.error(data.message);
//             }
            
//         } catch (error) {
//             toast.error(error.message)
//         } 
//     }

//     // fetch user data
//    const fetchUserData = async ()=>{

//         if(user.publicMetadata.role === 'educator'){
//             setIsEducator(true);
//         }

//         try {
//             const token = await getToken();

//             const {data} = await axios.get(backendUrl + '/api/user/data' , {headers: {Authorization: `Bearer ${token}`}})
        
//             if(data.success){
//                 setUserData(data.user)
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     } 

//     // Function to calculate average rating of course
//     const calculateRating = (course) => {
//         if(course.courseRatings.length === 0){
//             return 0;
//         }
//         let totalRating = 0;
//         course.courseRatings.forEach(rating =>{
//             totalRating += rating.rating;
//         })
//         return Math.floor(totalRating / course.courseRatings.length)
//     }

//     // function to calculate course chapter time
//     const calculateChapterTime = (chapter) => {
//         let time = 0;
//         chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
//         return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
//     }

//     // Function to calculate course Duratuion
//     const calculateCourseDuration = (course)=>{
//         let time = 0 ;
//         course.courseContent.map((chapter)=> chapter.chapterContent.map(
//             (lecture)=> time += lecture.lectureDuration 
//         ))

//         return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]}) 
//     }

//     // Function to calculate to no. of lectures in the course
//     const calculateNoOfLectures = (course) => {
//         let totalLectures = 0;
//         course.courseContent.forEach(chapter => {
//             if(Array.isArray(chapter.chapterContent)){
//                 totalLectures += chapter.chapterContent.length;
//             }
//         });
//         return totalLectures;
//     }

   
//     //  // Fetch user enrolled courses
//  // prev comm
//       const fetchUserEnrolledCourses = async()=>{
//   //   setEnrolledCourses(dummyCourses)
//        try {
//       const token = await getToken();

//        const data = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}})
        
//          console.log("Data",data);
//    if(data.success){
//           setEnrolledCourses(data.enrolledCourses.reverse());
//            // console.log("enroll", enrolledCourses);
//          // console.log("setenroll", enrolledCourses);
            
//         }else{
//           toast.error(data.message)
//      }
//     } catch (error) {
//          toast.error(error.message)
//        }
//       }

//     // prev unc
//     // const fetchUserEnrolledCourses = async () => {
//     //     try {
//     //         const token = await getToken();
//     //         const response = await axios.get(backendUrl + "/api/user/enrolled-courses", {
//     //             headers: { Authorization: `Bearer ${token}` }
//     //         });
    
//     //         // console.log("Response:", response); // Debugging: Log full response
    
//     //         if (response.data && response.data.enrolledCourses) {
//     //             setEnrolledCourses(response.data.enrolledCourses.reverse());
//     //         } else {
//     //             toast.error(response.data?.message || "No enrolled courses found.");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error fetching courses:", error);
//     //         toast.error(error.response?.data?.message || error.message);
//     //     }
//     // }; yha tk
    
//     useEffect(()=>{
//         fetchAllCourses()
//     },[])

//     useEffect(()=>{

//     },[])

// //prev comm
//     // const logToken = async ()=>{
//     //     console.log(await getToken());
        
//     // }
// //till here
//     useEffect(()=>{
//         if(user){
//             fetchUserData() 
//            // logToken()
//            fetchUserEnrolledCourses() 
//         }
//     },[user])

//     const value = {
//         currency,allCourses, navigate, isEducator, setIsEducator,
//         calculateRating,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures
//         ,fetchUserEnrolledCourses, setEnrolledCourses,enrolledCourses, getToken, fetchAllCourses,
//         backendUrl, userData, setUserData,user

//     } // add these too


//     return (
//         <AppContext.Provider value={value} >
//             {props.children}
//         </AppContext.Provider>
//     )

    

// }

//new
// import { createContext, useEffect, useState } from "react";
// import { dummyCourses } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import humanizeDuration from "humanize-duration";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const currency = import.meta.env.VITE_CURRENCY;

//   const navigate = useNavigate();

//   const { getToken } = useAuth();
//   const { user /*, isLoaded */ } = useUser(); // isLoaded optional

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setIsEducator] = useState(false);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [userData, setUserData] = useState(null);

//   // Fetch all courses
//   const fetchAllCourses = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/course/all`);
//       if (data.success) {
//         setAllCourses(data.courses);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch user data
//   const fetchUserData = async () => {
//     if (user?.publicMetadata?.role === "educator") {
//       setIsEducator(true);
//     }

//     try {
//       const token = await getToken();
//       const { data } = await axios.get(`${backendUrl}/api/user/data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch user enrolled courses
//   const fetchUserEnrolledCourses = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setEnrolledCourses(data.enrolledCourses.reverse());
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Calculate average rating of a course
//   const calculateRating = (course) => {
//     if (course.courseRatings.length === 0) return 0;
//     const totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
//     return Math.floor(totalRating / course.courseRatings.length);
//   };

//   // Calculate duration of a chapter
//   const calculateChapterTime = (chapter) => {
//     const time = chapter.chapterContent.reduce((sum, lec) => sum + lec.lectureDuration, 0);
//     return humanizeDuration(time * 60000, { units: ["h", "m"] });
//   };

//   // Calculate total duration of a course
//   const calculateCourseDuration = (course) => {
//     let time = 0;
//     course.courseContent.forEach((chapter) =>
//       chapter.chapterContent.forEach((lecture) => {
//         time += lecture.lectureDuration;
//       })
//     );
//     return humanizeDuration(time * 60000, { units: ["h", "m"] });
//   };

//   // Calculate total number of lectures
//   const calculateNoOfLectures = (course) => {
//     return course.courseContent.reduce(
//       (total, chapter) =>
//         total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0),
//       0
//     );
//   };

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//       fetchUserEnrolledCourses();
//     }
//   }, [user]);

//   const value = {
//     currency,
//     allCourses,
//     navigate,
//     isEducator,
//     setIsEducator,
//     calculateRating,
//     calculateChapterTime,
//     calculateCourseDuration,
//     calculateNoOfLectures,
//     fetchUserEnrolledCourses,
//     setEnrolledCourses,
//     enrolledCourses,
//     getToken,
//     fetchAllCourses,
//     backendUrl,
//     userData,
//     setUserData,
//     user, // ✅ now available across the app
//   };

//   return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
// };

// src/context/AppContext.jsx
//old
// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import humanizeDuration from "humanize-duration";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const currency = import.meta.env.VITE_CURRENCY;

//   const navigate = useNavigate();
//   const { getToken } = useAuth();
//   const { user, isLoaded } = useUser(); // ✅ isLoaded added

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setIsEducator] = useState(false);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [userData, setUserData] = useState(null);

//   const fetchAllCourses = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/course/all`);
//       if (data.success) {
//         setAllCourses(data.courses);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchUserData = async () => {
//     if (!user) return;

//     if (user?.publicMetadata?.role === "educator") {
//       setIsEducator(true);
//     }

//     try {
//       const token = await getToken();
//       const { data } = await axios.get(`${backendUrl}/api/user/data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//  const fetchUserEnrolledCourses = async () => {
//   if (!user) return;

//   try {
//     const token = await getToken();

//     const res = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = res.data;

//     if (data?.success && Array.isArray(data.enrolledCourses)) {
//       setEnrolledCourses(data.enrolledCourses.reverse());
//     } else {
//       setEnrolledCourses([]); // fallback
//       toast.warn("No enrolled courses found");
//     }
//   } catch (error) {
//     setEnrolledCourses([]); // fallback
//     toast.error(error?.response?.data?.message || error.message);
//   }
// };


//   const calculateRating = (course) => {
//     if (course.courseRatings.length === 0) return 0;
//     const totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
//     return Math.floor(totalRating / course.courseRatings.length);
//   };

//   const calculateChapterTime = (chapter) => {
//     const time = chapter.chapterContent.reduce((sum, lec) => sum + lec.lectureDuration, 0);
//     return humanizeDuration(time * 60000, { units: ["h", "m"] });
//   };

//   const calculateCourseDuration = (course) => {
//     let time = 0;
//     course.courseContent.forEach((chapter) =>
//       chapter.chapterContent.forEach((lecture) => {
//         time += lecture.lectureDuration;
//       })
//     );
//     return humanizeDuration(time * 60000, { units: ["h", "m"] });
//   };

//   const calculateNoOfLectures = (course) => {
//     return course.courseContent.reduce(
//       (total, chapter) =>
//         total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0),
//       0
//     );
//   };

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   useEffect(() => {
//     if (isLoaded && user) {
//       fetchUserData();
//       fetchUserEnrolledCourses();
//     }
//   }, [user, isLoaded]);

//   const value = {
//     currency,
//     allCourses,
//     navigate,
//     isEducator,
//     setIsEducator,
//     calculateRating,
//     calculateChapterTime,
//     calculateCourseDuration,
//     calculateNoOfLectures,
//     fetchUserEnrolledCourses,
//     setEnrolledCourses,
//     enrolledCourses,
//     getToken,
//     fetchAllCourses,
//     backendUrl,
//     userData,
//     setUserData,
//     user, // 🔥 required
//   };

//   return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
// };

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    if (user?.publicMetadata?.role === "educator") {
      setIsEducator(true);
    }

    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserEnrolledCourses = async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const res = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      if (data?.success && Array.isArray(data.enrolledCourses)) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        setEnrolledCourses([]);
        toast.warn("No enrolled courses found");
      }
    } catch (error) {
      setEnrolledCourses([]);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;
    const totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return Math.floor(totalRating / course.courseRatings.length);
  };

  const calculateChapterTime = (chapter) => {
    if (!chapter?.chapterContent?.length) return "0m";
    const time = chapter.chapterContent.reduce((sum, lec) => sum + lec.lectureDuration, 0);
    return humanizeDuration(time * 60000, { units: ["h", "m"], round: true });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course?.courseContent?.forEach((chapter) => {
      chapter.chapterContent?.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });
    return humanizeDuration(time * 60000, { units: ["h", "m"], round: true });
  };

  const calculateNoOfLectures = (course) => {
    return course?.courseContent?.reduce(
      (total, chapter) =>
        total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0),
      0
    );
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [user, isLoaded]);

    // 👇 ADD THIS useEffect to log token on console
  useEffect(() => {
    const logToken = async () => {
      if (isLoaded && user) {
        try {
          const token = await getToken();
          console.log("Clerk Token:", token); // 🔥 check browser console
        } catch (err) {
          console.error("Error fetching token:", err);
        }
      }
    };

    logToken();
  }, [isLoaded, user, getToken]);
//till here


  const value = {
    currency,
    allCourses,
    navigate,
    isEducator,
    setIsEducator,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    fetchUserEnrolledCourses,
    setEnrolledCourses,
    enrolledCourses,
    getToken,
    fetchAllCourses,
    backendUrl,
    userData,
    setUserData,
    user,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
