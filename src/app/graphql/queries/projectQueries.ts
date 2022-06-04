
import { gql } from '@apollo/client';

// PROJECT LIST
export const READ_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      statusCode
      title
      message
      data {
        id_project
        designation
        _id_societe
        Customer {
          id_societe
          raison_social
        }
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id_project: String!) {
    getProject(id_project: $id_project) {
      statusCode
      title
      message
      data {
        id_project
        designation
        _id_societe
        Customer {
          id_societe
          raison_social
        }
      }
    }
  }
`;
