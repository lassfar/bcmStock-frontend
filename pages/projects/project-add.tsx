import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import ProjectAdd from '@/components/views/projects/ProjectAdd';
import PageLayout from '@/components/widgets/layouts/PageLayout';

export default function projectAdd() {
  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <ProjectAdd />
      </PageLayout>

    </>
  )
};

projectAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}