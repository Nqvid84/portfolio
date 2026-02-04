import React from 'react'

const Contact = () => {
  return (
    <div className='text-zinc-400 w-full h-full flex flex-col justify-between gap-4 items-center relative '>
      <div className="w-full h-32 flex flex-col justify-start items-start gap-4">
        <div className="grid grid-cols-4 gird-rows-2 gap-4 px-4">
        </div>
      </div>
         <div className='w-64 h-64 overflow-hidden bg-white border border-white rounded-full group flex justify-center items-center relative'>
          <div className='w-64 h-64 absolute bg-zinc-950 z-20 rounded-full transition-all duration-500 ease-in-out group-hover:translate-x-[-100%] group-hover:translate-y-[-100%] translate-x-[50%] translate-y-[50%] '/>
          <div className='w-64 h-64 absolute bg-zinc-950 z-20 rounded-full transition-all duration-500 ease-in-out group-hover:translate-x-[100%] group-hover:translate-y-[-100%] translate-x-[-50%] translate-y-[50%] '/>
          <div className='w-64 h-64 absolute bg-zinc-950 z-20 rounded-full transition-all duration-500 ease-in-out group-hover:translate-x-[-100%] group-hover:translate-y-[100%] translate-x-[50%] translate-y-[-50%] '/>
          <div className='w-64 h-64 absolute bg-zinc-950 z-20 rounded-full transition-all duration-500 ease-in-out group-hover:translate-x-[100%] group-hover:translate-y-[100%] translate-x-[-50%] translate-y-[-50%] '/>
          <p className='group-hover:after:content-["thanks"] z-30 after:content-["hover"]'></p>
          {/* change image to profissional */}
          <img src="https://sapi.buildspace.so/storage/v1/render/image/public/assets/6417fe8c-83b0-4327-aeef-210444d549e9/a4x1TQR?width=640&resize=contain&quality=75" alt="me" className='w-full h-full rounded-full object-cover absolute z-10 saturate-0 group-hover:opacity-100 opacity-0 duration-500 ease-in-out' />
        </div> 
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <h3 className="text-lg text-zinc-400 hover:text-zinc-300 transition-colors duration-300 ease-in-out">Phone: +98 901 123 0864
        </h3>
        <h3 className="text-lg text-zinc-400 hover:text-zinc-300 transition-colors duration-300 ease-in-out">Email: neisinavid@gmail.com
        </h3>
        <h3 className="text-lg text-zinc-400 hover:text-zinc-300 transition-colors duration-300 ease-in-out">Location: Mashhad, Razavi Khorasan, Iran
        </h3>
        <h3 className="text-lg text-zinc-400 hover:text-zinc-300 transition-colors duration-300 ease-in-out">Education: B.Sc. in Computer Science, Islamic Azad University of Mashhad (2024 - Now)
        </h3>
      </div>
    </div>
    )
}

export default Contact