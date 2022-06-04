import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import ProjectEdit from '@/components/views/projects/ProjectEdit';
import PageLayout from '@/components/widgets/layouts/PageLayout';

export default function projectAdd() {
  return (
    <>
      <Head>
        <title>Modifier Projet</title>
        <meta name="description" content="Modifier projet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <ProjectEdit />
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