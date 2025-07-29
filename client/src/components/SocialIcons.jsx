import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FacebookLogo, 
  TwitterLogo, 
  LinkedinLogo, 
  GithubLogo, 
  GitBranch, 
  WhatsappLogo 
} from 'phosphor-react'

const SocialIcons = () => {
  return (
    <div className='flex items-center gap-3 mt-5 ml-1 mb-2 max-md:mt-4'>
     
      {/* <Link 
        target='_blank' 
        to=''
        className="group transition transform hover:scale-110 text-[#cbc3c3] hover:text-gray-700"
      >
        <TwitterLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link> */}
      <Link 
        target='_blank' 
        to='http://www.linkedin.com/in/saumya-prakash-085a01229'
        className="group transition transform hover:scale-110 text-[#1e17ea] hover:text-blue-600"
      >
        <LinkedinLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://github.com/saumyajha-12'
        className="group transition transform hover:scale-110 text-[#c2baba] hover:text-gray-500"
      >
        <GithubLogo size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
    
   
    </div>
  )
}

export default SocialIcons
