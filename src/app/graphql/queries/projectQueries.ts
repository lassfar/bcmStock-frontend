
import { gql } from '@apollo/client';

// PROJECT LIST
export const READ_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      code_project
      designation
      customer {
        code_societe
        raison_social
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($code_project: String!) {
    getProject(code_project: $code_project) {
      code_project
      designation
      customer {
        code_societe
        raison_social
      }
    }
  }
`;
