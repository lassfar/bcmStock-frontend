import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import ProjectList from '@/components/views/projects/ProjectList';
import PageLayout from '@/components/widgets/layouts/PageLayout';

export default function ProjectListPage() {
  return (
    <>
      <Head>
        <title>Liste des projets</title>
        <meta name="description" content="Projets | Liste" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <ProjectList />
      </PageLayout>

    </>
  )
};

ProjectListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

