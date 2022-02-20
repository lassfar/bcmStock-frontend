import React from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";

const dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        
      </AdminLayout>
    </>
  )
};

export default dashboard;