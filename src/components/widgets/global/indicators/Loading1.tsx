import React from 'react'

const Loading1 = ({ isLoading, customclass = "" }: any) => {
  return (
    <div className={`${isLoading ? 'flex' : 'hidden'} justify-center items-center / bg-zinc-200 dark:bg-black/20 w-full h-full min-h-20 rounded-2xl / absolute top-0 left-0 z-30 ${customclass}`}>
      <div className="animate-spin / rounded-full border-2 border-solid border-x-transparent border-y-primary / w-8 h-8 mx-auto">

      </div>
    </div>
  )
}

export default Loading1