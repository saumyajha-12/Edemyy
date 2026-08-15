import React, { lazy, Suspense } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Navbar from './components/student/Navbar'
import Loading from './components/student/Loading'
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';

// Lazy loaded page components
const Home = lazy(() => import('./pages/student/Home'))
const CoursesList = lazy(() => import('./pages/student/CoursesList'))
const CourseDetails = lazy(() => import('./pages/student/CourseDetails'))
const MyEnrollMents = lazy(() => import('./pages/student/MyEnrollMents'))
const Player = lazy(() => import('./pages/student/Player'))
const Educator = lazy(() => import('./pages/educator/Educator'))
const Dashboard = lazy(() => import('./pages/educator/Dashboard'))
const AddCourse = lazy(() => import('./pages/educator/AddCourse'))
const MyCourses = lazy(() => import('./pages/educator/MyCourses'))
const StudentsEnrolled = lazy(() => import('./pages/educator/StudentsEnrolled'))
const About = lazy(() => import('./components/About'))
const ContactForm = lazy(() => import('./components/ContactForm'))

const App = () => {


  const isEducatorRoute = useMatch('/educator/*')



  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer />
      {!isEducatorRoute &&<Navbar/> }
      
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/course-list' element={<CoursesList/>} />
          <Route path='/course-list/:input' element={<CoursesList/>} />
          <Route path='/course/:id' element={<CourseDetails/>} />
          <Route path='/my-enrollments' element={<MyEnrollMents/>} />
          <Route path='/player/:courseId' element={<Player/>} />
          <Route path='/loading/:path' element={<Loading/>} />

          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<ContactForm/>} />


          <Route path='/educator' element={ <Educator />} >
              <Route path='/educator' element={<Dashboard />} />
              <Route path='add-course' element={<AddCourse />} />
              <Route path='my-courses' element={<MyCourses />} />
              <Route path='student-enrolled' element={<StudentsEnrolled />} />
          </Route>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App
