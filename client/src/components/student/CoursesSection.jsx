import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import Loading from "./Loading";

const CoursesSection = () => {
    const { allCourses } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            setLoading(false);
        }
    }, [allCourses]);

    // Filter courses based on search term
    const filteredCourses = allCourses?.filter(course => 
        course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="py-16 md:px-40 px-8">
            <h2 className="text-3xl font-medium text-gray-800">Learn from the best</h2>
            <p className="text-sm md:text-base text-gray-500 mt-3">
                Discover our top-rated courses across various categories. From coding
                and design to <br className="hidden md:block" /> business and wellness, our courses are crafted to deliver
                results.
            </p>

            {/* Action Bar: Search and Show All Courses */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-10 mb-8 gap-4">
                <Link
                    to={"/course-list"}
                    onClick={() => scrollTo(0, 0)}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition-colors w-full md:w-auto text-center"
                >
                    Show all courses
                </Link>
                
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-72 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {loading ? (
                <Loading />
            ) : (
                /* Changed to explicit grid columns (1 on mobile, 2 on tablet, 4 on desktop) for horizontal layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
                    {filteredCourses.length > 0 ? (
                        // If searching, show all matches. If not searching, only show top 4.
                        (searchTerm ? filteredCourses : filteredCourses.slice(0, 4)).map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center py-10">No courses found matching "{searchTerm}"</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoursesSection;
