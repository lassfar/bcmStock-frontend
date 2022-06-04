import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput) {
    createProject(input: $input) {
      statusCode
      title
      message
      data {
        id_project
        designation
        _id_societe
      }
    }
  }`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id_project: String!, $input: ProjectInput) {
    updateProject(id_project: $id_project, input: $input) {
      statusCode
      title
      message
      data {
        id_project
        designation
        _id_societe
      }
    }
  }
`;


// DELETE CUSTOMER MUTATION
export const DELETE_PROJECT = gql`
  mutation DeleteCustomer($id_societe: String!) {
    deleteCustomer(id_societe: $id_societe) {
      statusCode
      title
      message
      data {
        id_project
        designation
        _id_societe
      }
    }
  }
`;