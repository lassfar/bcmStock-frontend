import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";

export default function productAdd() {
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

productAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}