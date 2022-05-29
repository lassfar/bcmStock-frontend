import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import CustomerDetail from '@/components/views/customers/CustomerDetail';
import PageLayout from '@/components/widgets/layouts/PageLayout';

export default function CustomerDetailPage() {
  return (
    <>
      <Head>
        <title>Detail Client</title>
        <meta name="description" content="Detail Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <CustomerDetail />
      </PageLayout>

    </>
  )
};

CustomerDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}