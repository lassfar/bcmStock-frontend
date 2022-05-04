import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import ProductAdd from '@/components/views/products/ProductAdd';

export default function productAdd() {
  return (
    <>
      <Head>
        <title>Product Add</title>
        <meta name="description" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductAdd />

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