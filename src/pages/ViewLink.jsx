import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { decryptData } from '../utils/security'
import giftAnimation from '../assets/gift.webm'
import choclate from '../assets/choclate.png'
const ViewLink = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    const encrypted = searchParams.get('data')
    if (encrypted) {
      const decrypted = decryptData(decodeURIComponent(encrypted))
      setData(decrypted)
    }
  }, [searchParams])

  if (!data) return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='bg-pink-400 p-10 rounded-2xl text-white text-2xl'>
            Invalid or broken link 💔
        </div>
    </div>
  )

  if (!isOpened) return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-pink-200 cursor-pointer' onClick={() => setIsOpened(true)}>
      <h1 className='text-3xl text-pink-600 font-bold mb-8'>You have a surprise! 🎁</h1>
      <video src={giftAnimation} autoPlay loop muted playsInline className='w-80 h-80 object-contain' />
      <p className='text-pink-500 mt-8 text-xl animate-bounce'>Click to open</p>
    </div>
  )

  return (
    <div className='h-screen w-full flex justify-center items-center relative bg-pink-100'>
        <div className="absolute w-full h-full z-0 opacity-10" style={{ backgroundImage: `url(${choclate})`, backgroundSize: '40px', backgroundRepeat: 'space' }}>     
        </div>
    <div className='h-screen w-full flex justify-center items-center absolute z-10'>
      <div className='bg-pink-400 h-100 w-200 rounded-2xl flex flex-col justify-center items-center gap-5'>
        <h3 className='text-2xl text-white pb-5'>You received a Chocolate! 🍫</h3>
        <div className="name">
            <h4 className='text-white mb-1'>From:</h4>
            <div className='bg-white w-150 h-10 rounded-3xl flex items-center px-4 text-pink-500 font-bold'>
                {data.name}
            </div>
        </div>
        <div className="message">
          <h4 className='text-white mb-1'>Message:</h4>
          <div className='bg-white w-150 h-30 rounded-3xl p-4 text-pink-500 overflow-y-auto'>
            {data.message}
          </div>
        </div>
      </div>  
    </div>
</div>
  )
}

export default ViewLink