import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"
 import {useAuth, useUser} from '@clerk/clerk-react'
//new C/ // import axios from 'axios'
// import {  toast } from 'react-toastify'; //till here
export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    // new c const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const {getToken} = useAuth();
    // new c const {user} = useUser()
// new line below
 const {user}=useUser()
    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([])
   // new c  const [userData, setUserData] = useState(null)

    // fetch all courses 
    const fetchAllCourses = async ()=>{
          setAllCourses(dummyCourses) // you can comment it to hide courses
      //new c  // try {
        //     const {data} = await axios.get(backendUrl + '/api/course/all');
        //     if(data.success)
        //     {
        //         setAllCourses(data.courses)
        //     }else{
        //         toast.error(data.message);
        //     }
            
        // } catch (error) {
        //     toast.error(error.message)
        // } //till h
    }

    // fetch user data
  //new c  const fetchUserData = async ()=>{

    //     if(user.publicMetadata.role === 'educator'){
    //         setIsEducator(true);
    //     }

    //     try {
    //         const token = await getToken();

    //         const {data} = await axios.get(backendUrl + '/api/user/data' , {headers: {Authorization: `Bearer ${token}`}})
        
    //         if(data.success){
    //             setUserData(data.user)
    //         }else{
    //             toast.error(data.message)
    //         }

    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // } till h 

    // Function to calculate average rating of course
    const calculateRating = (course) => {
        if(course.courseRatings.length === 0){
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating =>{
            totalRating += rating.rating;
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

    // function to calculate course chapter time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    // Function to calculate course Duratuion
    const calculateCourseDuration = (course)=>{
        let time = 0 ;
        course.courseContent.map((chapter)=> chapter.chapterContent.map(
            (lecture)=> time += lecture.lectureDuration 
        ))

        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]}) 
    }

    // Function to calculate to no. of lectures in the course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }

   
    //  // Fetch user enrolled courses
 // prev comm
      const fetchUserEnrolledCourses = async()=>{
     setEnrolledCourses(dummyCourses)
    // //    try {
    // //     const token = await getToken();

    // //     const data = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}})
        
    // //     console.log("Data",data);
    // //     if(data){
    // //         setEnrolledCourses(data.enrolledCourses.reverse());
    // //         // console.log("enroll", enrolledCourses);
    // //         // console.log("setenroll", enrolledCourses);
            
    // //     }else{
    // //         toast.error(data.message)
    // //     }
    // //    } catch (error) {
    // //     toast.error(error.message)
    // //    }
      }

    // prev unc
    // const fetchUserEnrolledCourses = async () => {
    //     try {
    //         const token = await getToken();
    //         const response = await axios.get(backendUrl + "/api/user/enrolled-courses", {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    
    //         // console.log("Response:", response); // Debugging: Log full response
    
    //         if (response.data && response.data.enrolledCourses) {
    //             setEnrolledCourses(response.data.enrolledCourses.reverse());
    //         } else {
    //             toast.error(response.data?.message || "No enrolled courses found.");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching courses:", error);
    //         toast.error(error.response?.data?.message || error.message);
    //     }
    // }; yha tk
    
    useEffect(()=>{
        fetchAllCourses()
    },[])

    useEffect(()=>{

    },[])

//prev comm
    const logToken = async ()=>{
        console.log(await getToken());
        
    }
//till here
    useEffect(()=>{
        if(user){
           // fetchUserData() not comm
            logToken() //prev comm
          //  fetchUserEnrolledCourses() not com
        }
    },[user])

    const value = {
        currency,allCourses, navigate, isEducator, setIsEducator,
        calculateRating,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures
        ,fetchUserEnrolledCourses, setEnrolledCourses,enrolledCourses, getToken, fetchAllCourses

    } //backendUrl, userData, setUserData add these too


    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )

    

}