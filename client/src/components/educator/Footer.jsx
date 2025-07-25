

//   import React from 'react'
// import { assets } from '../../assets/assets'
// import { Link } from 'react-router-dom'
// import { FacebookLogo, GitBranch, GithubLogo, LinkedinLogo, TwitterLogo, WhatsappLogo } from 'phosphor-react'
// import SocialIcons from '../SocialIcons'

// const Footer = () => {
//   return (
//     <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t'>
//       <div className='flex items-center gap-4'>
//         <img className='hidden md:block w-20' src={assets.logo} alt="logo" />
//         <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
//         <p className='py-4 text-center text-xs md:text-sm text-gray-500'>
//           Copyright 2025 © Edemy. All Right Reserved.
//         </p>
//       </div>

//       <div className=''>
//         <SocialIcons/>
//       </div>
//     </footer>
//   )
// }

// export default Footer


import React from 'react';
import { assets } from '../../assets/assets';
import SocialIcons from '../SocialIcons';

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse md:flex-row items-center justify-between w-full px-6 md:px-12 border-t py-4 bg-gray-50 text-gray-600 text-sm">
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-6 w-px bg-gray-400/40" />
        <p className="text-center">© 2025 Edemy. All Rights Reserved.</p>
      </div>
      <div className="mb-3 md:mb-0">
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;