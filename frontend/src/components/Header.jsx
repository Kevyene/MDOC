import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-1g px-6 md:px-10 1g:px-20'>
        
        {/*------- left side------*/}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl 1g:text-5xl text-white font-semibold leading-tight md:leading-tight 1g:leading-tight'>
                Book Appointments <br/> With Professional Doctors 
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-5m font-light'>
                <img  className='w-28' src={assets.group_profiles} alt="" />
            <p>Browse through our extensive list of professional doctors,<br className='hidden sm:block'/> schedule your appointment hassle free.</p>
            
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book Appointment <img className ='w-3' src={assets.arrow_icon}alt=""/>
            </a>

        </div>
        {/*----right side----*/}
        <div className='md:w-1/2 relative'>
            <img className ='w-full md:absolute bottom-0 h-auto rounded-1g'src={assets.header_img} alt="" />

        </div>
    </div>
  )
}

export default Header