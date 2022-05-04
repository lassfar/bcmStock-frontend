import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($code_project: String!, $designation: String!, $customer_code_societe: String!) {
    createProject(code_project: $code_project, designation: $designation, customer_code_societe: $customer_code_societe) {
      code_project
      designation
      customer {
        code_societe
        raison_social
      }
    }
  }
}`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($code_project: String!, $designation: String!, $customer_code_societe: String!) {
    updateProject(code_project: $code_project, designation: $designation, customer_code_societe: $customer_code_societe) {
      code_project
      designation
      customer {
        code_societe
        raison_social
      }
    }
  }
`;


// DELETE CUSTOMER MUTATION
export const DELETE_PROJECT = gql`
  mutation deleteCustomer($code_societe: String!) {
    deleteCustomer(code_societe: $code_societe) {
      raison_social
    }
  }
`;