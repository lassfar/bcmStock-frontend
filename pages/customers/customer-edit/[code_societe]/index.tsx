import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import CustomerEdit from '@/components/views/customers/CustomerEdit';
import PageLayout from '@/components/widgets/layouts/PageLayout';

export default function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>Modifier Client</title>
        <meta name="description" content="Ajouter Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <CustomerEdit />
      </PageLayout>

    </>
  )
};

CustomerEditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}