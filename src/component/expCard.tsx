import React from 'react'

const ExpCard = ({ img, skills, title, desc, time, job }: { img: string, skills: string[], title: string, desc: string, time: [string, string], job: string }) => {
  return (
    <div className='group w-full h-full flex flex-col border gap-4 border-zinc-500 rounded-lg p-4 justify-between items-center'>
      <div className='h-full w-full flex flex-row justify-start items-start gap-2'>
        <h4 className="w-fit whitespace-nowrap text-lg text-zinc-300">{title}</h4>
        <h5 className="w-fit whitespace-nowrap text-base text-zinc-400">{job}</h5>
        <h4 className="text-lg w-full text-right text-zinc-300 flex flex-row justify-end items-center gap-2">{time[0]} <div className='w-8 border-b text-[1px] border-b-zinc-300' /> {time[1]}</h4>
      </div>
      <div className='h-full w-full flex flex-row-reverse justify-between items-start gap-8'>
        {/* <img src={img} alt={title} className='w-auto h-52 aspect-video object-cover saturate-0 rounded-2xl ' /> */}
        <div className='w-auto h-52 aspect-video bg-zinc-100 object-cover saturate-0 rounded-2xl ' />

        <div className='flex flex-col h-full justify-between items-start gap-4'>
          <p className='max-w-[60%]'>
            {desc}
          </p>
          <div className='flex flex-row gap-4'>
            {skills.map((skill: string) =>
            (
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-3 h-3 bg-zinc-300 rounded-full" />
                {skill}
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </div >
  )
}

export default ExpCard