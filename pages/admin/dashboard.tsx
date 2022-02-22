import React, { ReactElement, useState } from 'react'
import Head from 'next/head'
import DashboardBox from '@/components/widgets/Cards/DashboardBox'
import AdminLayout from '@/components/widgets/layouts/AdminLayout'
import { FaBox, FaProductHunt } from 'react-icons/fa'
import { dashboardBoxes_data } from '@/components/widgets/_data'

export default function dashboard() {
  const [dashboardBoxes] = useState(dashboardBoxes_data)

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dashboard-boxes grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 xl:gap-4">
        {dashboardBoxes?.map((item, key) => (
          <DashboardBox
            icon={item.icon}
            text={item.text}
            count={item.count}
            textColor={item.textColor}
            bgColor={item.bgColor}
            customclass={item.customclass}
            key={key}
          />
        ))}
      </div>
    </>
  )
}

dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
