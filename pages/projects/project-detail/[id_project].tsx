import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import ProjectDetail from '@/components/views/projects/ProjectDetail';
import PageLayout from '@/components/widgets/layouts/PageLayout';

export default function ProjectDetailPage() {
  return (
    <>
      <Head>
        <title>Detail Client</title>
        <meta name="description" content="Detail Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <ProjectDetail />
      </PageLayout>

    </>
  )
};

ProjectDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}