import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import DashboardBox from '@/components/widgets/Cards/DashboardBox';
import { FaBox } from 'react-icons/fa';

export default function productList () {
  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      

    </>
  )
};

productList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}