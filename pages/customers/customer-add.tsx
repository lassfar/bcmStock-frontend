import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import CustomerAdd from '@/components/views/customers/CustomerAdd';
import PageLayout from '@/components/widgets/layouts/PageLayout';


export default function CustomerAddPage() {
  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Ajouter Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <PageLayout>
        <CustomerAdd />
      </PageLayout>

    </>
  )
};

CustomerAddPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}