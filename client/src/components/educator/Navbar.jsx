// import React from "react";
// import { assets, dummyEducatorData } from "../../assets/assets";
// import { UserButton, useUser } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import Logger from "../Logger";
// const Navbar = () => {
// 	const educatorData = dummyEducatorData;
// 	const { user } = useUser();
// 	return (
// 		<div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
// 			<Link to="/">
// 				<img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
// 			</Link>

// 			<div className="flex items-center gap-5 text-gray-500 relative">
// 				<div className="hidden md:block">
// 					<Logger />
// 				</div>
// 				<p>Hi! {user ? user.fullName : "Developers"} </p>
// 				{user ? (
// 					<UserButton />
// 				) : (
// 					<img className="max-w-8" src={assets.profile_img} alt="profile_img" />
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Navbar;

/* Updated Educator Navbar */
import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
//import Logger from "../Logger";

const Navbar = () => {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 bg-white py-4 shadow-sm">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-4 text-gray-700">
        <div className="hidden md:block">
         
        </div>
        <p className="text-sm font-medium">Hi, {user ? user.fullName : "Developer"}</p>
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <img src={assets.profile_img} alt="profile_img" className="w-8 h-8 rounded-full" />
        )}
      </div>
    </header>
  );
};

export default Navbar;