import React from 'react'

const Loading1 = ({ isLoading }: any) => {
  return (
    <div className={`${isLoading ? 'block' : 'hidden'} / bg-black/10 w-full h-full rounded-2xl / absolute top-0 left-0 z-30 p-14`}>
      <div className="animate-spin / rounded-full border-4 border-solid border-x-transparent border-y-primary / w-10 h-10 mx-auto">

      </div>
    </div>
  )
}

export default Loading1