import React from 'react'

const LoadingDashboard = ({ isLoading }: any) => {
  return (
    <div className={`${isLoading ? 'flex' : 'hidden'} justify-center items-center / w-full h-[90vh] rounded-2xl p-14`}>
      <div className="animate-spin / rounded-full border-2 border-solid border-x-transparent border-y-primary / w-8 h-8 mx-auto">

      </div>
    </div>
  )
}

export default LoadingDashboard