// import React, { useContext } from "react";
// import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// //import Logger from "../Logger";

// const Navbar = () => {


// 	const isCourseListPage = location.pathname.includes("/course-list");
// 	const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext(AppContext);
// 	const { openSignIn } = useClerk();
// 	const { user } = useUser();

// 	const becomeEducator = async () => {
// 		try {
// 			if(isEducator){
// 				navigate('/educator')
// 				return;
// 			}

// 			const token = await getToken();

// 			const {data} = await axios.get(backendUrl + '/api/educator/update-role' , {headers: {Authorization: `Bearer ${token}`}})
// 			console.log("educ", data);
			
// 			if(data.success){
// 				setIsEducator(true);
// 				toast.success(data.message)
// 			}else{
// 				toast.error(data.message)
// 			}
// 		} catch (error) {
// 			toast.error(error.message)
// 		}
// 	}

// 	return (
// 		<div
// 			className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-3 ${
// 				isCourseListPage ? "bg-white" : "bg-cyan-100/70"
// 			} `}
// 		>
// 			<img onClick={()=>navigate('/')}
// 				src={assets.logo}
// 				alt="Logo"
// 				className="w-28 lg:w-32  cursor-pointer"
// 			/>
// 			<div className="hidden md:flex items-center gap-5 text-gray-500">
// 				<div className="flex items-center gap-5">
					
// 				</div>
// 				<div className="flex items-center gap-5">
// 					{user && (
// 						<>
// 							<button onClick={becomeEducator}>{isEducator ? "Educator Dashboard" : "Become Educator" }</button>|{" "}
// 							<Link to="/my-enrollments">My Enrollments</Link>
// 						</>
// 					)}
// 				</div>

// 				{user ? (
// 					<UserButton />
// 				) : (
// 					<button
// 						onClick={() => openSignIn()}
// 						className="bg-blue-600 text-white px-5 py-2 rounded-full"
// 					>
// 						Create Account
// 					</button>
// 				)}
// 			</div>
// 			<div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
// 				{/* for phone scree  */}
				
// 				<div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
//         {user && (
// 						<>
// 						<button onClick={becomeEducator}>{isEducator ? "Educator Dashboard" : "Become Educator" }</button>|{" "}
// 						<Link to="/my-enrollments">My Enrollments</Link>
// 					</>
// 					)}
// 				</div>
//         {
//           user ? <UserButton/> :
// 				<button onClick={()=>openSignIn()}>
// 					<img src={assets.user_icon} alt="" />
// 				</button>
//         }
// 			</div>
// 		</div>
// 	);
// };

// export default Navbar;
//above is working
// import React, { useContext } from "react";
// import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const isCourseListPage = location.pathname.includes("/course-list");
//   const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
//   const { openSignIn } = useClerk();
//   const { user } = useUser();

//   const becomeEducator = async () => {
//     try {
//       if (isEducator) {
//         navigate('/educator');
//         return;
//       }
//       const token = await getToken();
//       const { data } = await axios.get(backendUrl + '/api/educator/update-role', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (data.success) {
//         setIsEducator(true);
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className={`flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-24 border-b py-4 shadow-sm
//       ${isCourseListPage ? "bg-white" : "bg-cyan-50"}`}>
      
//       <img
//         onClick={() => navigate('/')}
//         src={assets.logo}
//         alt="Logo"
//         className="w-28 lg:w-32 cursor-pointer hover:opacity-80 transition"
//       />

//       {/* Desktop View */}
//       <div className="hidden md:flex items-center gap-6 text-gray-600 text-sm font-medium">
//         {user && (
//           <>
//             <button
//               onClick={becomeEducator}
//               className="hover:text-indigo-600 transition"
//             >
//               {isEducator ? "Educator Dashboard" : "Become Educator"}
//             </button>
//             <span className="text-gray-400">|</span>
//             <Link to="/my-enrollments" className="hover:text-indigo-600 transition">My Enrollments</Link>
//           </>
//         )}

//         {user ? (
//           <UserButton />
//         ) : (
//           <button
//             onClick={() => openSignIn()}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm shadow transition"
//           >
//             Create Account
//           </button>
//         )}
//       </div>

//       {/* Mobile View */}
//       <div className="md:hidden flex items-center gap-4 text-gray-600 text-xs">
//         {user && (
//           <>
//             <button onClick={becomeEducator} className="hover:text-indigo-600 transition">
//               {isEducator ? "Dashboard" : "Educator"}
//             </button>
//             <span>|</span>
//             <Link to="/my-enrollments" className="hover:text-indigo-600 transition">Enrollments</Link>
//           </>
//         )}
//         {user ? (
//           <UserButton />
//         ) : (
//           <button onClick={() => openSignIn()}>
//             <img src={assets.user_icon} alt="User" className="w-5 h-5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/update-role", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-3 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      {/* Removed border and background image styling */}

      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-gray-700">
        {user && (
          <>
            <button onClick={becomeEducator} className="hover:underline">
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            |
            <Link to="/my-enrollments" className="hover:underline">
              My Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-700">
        {user && (
          <>
            <button onClick={becomeEducator} className="hover:underline">
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            |
            <Link to="/my-enrollments" className="hover:underline">
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="User Icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
