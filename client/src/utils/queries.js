import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      priorities {
        zendeskNumber
        jira
        description
        comments
        createdDate
        customer
        currentStatus
        sdm
        title
      }
    }
  }
`;

export const QUERY_PRIORITIES = gql`
  query {
    priorities {
      id
      zendesk
      title
      description
      jira
      dateCreated
      customer
      currentStatus
      sdm
      comment
    }
  }
`;
