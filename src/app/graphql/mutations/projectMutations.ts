import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectAddInput) {
    createProject(input: $input) {
      statusCode
      title
      message
      data {
        code_project
        designation
        customer {
          id_societe
          raison_social
          form_jury
          ice
        }
      }
    }
  }
}`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($code_project: String!, $input: ProjectUpdateInput) {
    updateProject(code_project: $code_project, input: $input) {
      statusCode
      title
      message
      data {
        code_project
        designation
        customer {
          id_societe
          raison_social
          form_jury
          ice
        }
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
        code_project
        designation
        customer {
          id_societe
          raison_social,
          form_jury
        }
      }
    }
  }
`;