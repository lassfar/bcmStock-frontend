import React, { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from "@/components/widgets/layouts/AdminLayout";
import CustomerList from '@/components/views/customers/CustomerList';
import PageLayout from '@/components/widgets/layouts/PageLayout';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next';
import { DELETE_CUSTOMER } from '@/app/graphql/mutations/customerMutations';
import { READ_CUSTOMERS } from '@/app/graphql/queries/customerQueries';
import client from '@/app/graphql/apollo-client';
import safeJsonStringify from 'safe-json-stringify'

// export interface ICustomerListProps {
//   customers?: any,
//   loading?: boolean,
//   error?: any,
//   deleteCustomer?: any,
// }

export default function CustomerListPage() {
  return (
    <>
      <Head>
        <title>Liste des clients</title>
        <meta name="description" content="Client | Liste" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <CustomerList />
      </PageLayout>

    </>
  )
};

CustomerListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}


// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data, loading, error } = await client.query({ query: READ_CUSTOMERS }); // list customers
//   const deleteCustomer = async () => { await client.mutate({ mutation: DELETE_CUSTOMER }) }; // delete customer
//   const customers = await JSON.parse(safeJsonStringify(data.getAllCustomers));
  
//   console.log("getServerSideProps data", customers);
//   return {
//     props: {
//       customers: customers,
//       loading: loading,
//       error: null,
//       deleteCustomer: deleteCustomer,
//     }
//   }
// }
