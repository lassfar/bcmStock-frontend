
import { gql } from '@apollo/client';

// PROJECT LIST
export const READ_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
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

export const GET_PROJECT = gql`
  query GetProject($code_project: String!) {
    getProject(code_project: $code_project) {
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
