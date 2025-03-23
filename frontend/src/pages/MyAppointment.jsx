import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointment = () => {
  const { backendUrl, token ,getDoctorData } = useContext(AppContext)
 
  const [appointments,setAppointments] = useState([])


  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)  
    } 
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorData()

        
      }else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    
  }


  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div className='p-4 md:p-6 max-w-6xl mx-auto'>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
          My <span className="text-blue-600">Appointment</span>
        </h2>
      
      <div className='space-y-4'>
        {appointments.map((item, index) => (
          <div key={index} className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6'>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Doctor Image */}
              <div className='flex-shrink-0 w-full md:w-48'>
                <div className='relative pb-[120%]'> {/* 4:5 aspect ratio container */}
                  <img 
                    className='absolute w-full h-full rounded-xl object-cover border-2 border-blue-50'
                    src={item.docData.image} 
                    alt=""
                    style={{ objectPosition: 'top center' }}
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className='flex-1 grid gap-4 md:grid-cols-2'>
                {/* Left Column */}
                <div className='space-y-2'>
                  <h3 className='text-xl font-semibold text-gray-800'>{item.docData.name}</h3>
                  <div className='flex items-center'>
                    <svg 
                      className='w-5 h-5 text-blue-600 mr-2' 
                      fill='none' 
                      stroke='currentColor' 
                      viewBox='0 0 24 24'
                    >
                      <path 
                        strokeLinecap='round' 
                        strokeLinejoin='round' 
                        strokeWidth={2} 
                        d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' 
                      />
                    </svg>
                    <span className='text-sm text-gray-600'>{item.docData.speciality}</span>
                  </div>
                  
                  <div className='flex items-start'>
                    <svg 
                      className='w-5 h-5 text-blue-600 mr-2 flex-shrink-0' 
                      fill='none' 
                      stroke='currentColor' 
                      viewBox='0 0 24 24'
                    >                      <path 
                        strokeLinecap='round' 
                        strokeLinejoin='round' 
                        strokeWidth={2} 
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' 
                      />
                      <path 
                        strokeLinecap='round' 
                        strokeLinejoin='round' 
                        strokeWidth={2} 
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' 
                      />
                    </svg>
                    <div>
                      <p className='text-sm text-gray-600'>{item.docData.address.line1}</p>
                      <p className='text-sm text-gray-600'>{item.docData.address.line2}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className='space-y-4'>
                  <div className='flex items-center'>
                    <svg 
                      className='w-5 h-5 text-blue-600 mr-2' 
                      fill='none' 
                      stroke='currentColor' 
                      viewBox='0 0 24 24'
                    >
                      <path 
                        strokeLinecap='round' 
                        strokeLinejoin='round' 
                        strokeWidth={2} 
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
                      />
                    </svg>
                    <div>
                      <p className='text-sm font-medium text-gray-700'>Appointment Time</p>
                      <p className='text-sm text-gray-600'> {item.slotDate} | {item.slotTime} </p>
                    </div>
                  </div>

                  <div className='md:text-right'>
                    {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors w-full md:w-auto'> 
                      Cancel Appointment
                    </button> }
                    {item.cancelled && !item.isCompleted && <button className='px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg transition-colors w-full md:w-auto'>Appointment Cancelled</button>}
                     {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MyAppointment