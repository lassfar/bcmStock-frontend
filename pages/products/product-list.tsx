import React from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";

const productList = () => {
  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        
      </AdminLayout>
    </>
  )
};

export default productList;