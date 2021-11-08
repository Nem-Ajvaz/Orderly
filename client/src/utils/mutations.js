import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const MUTATION_CHANGE_PRIORITY_STATUS = gql`
  mutation changePriorityStatus($id: String!, $newStatus: String!) {
    changePriorityStatus(data: { id: $id, newStatus: $newStatus })
  }
`;

export const UPDATE_PRIORITY = gql`
  mutation editPriority(
    $id: ID!
    $zendesk: String
    $title: String
    $description: String
    $jira: String
    $dateCreated: String
    $customer: String
    $currentStatus: String
    $sdm: String
    $comment: String
  ) {
    editPriority(
      data: {
        id: _id
        zendesk: $zendesk
        title: $title
        description: $description
        jira: $jira
        dateCreated: $dateCreated
        customer: $customer
        currentStatus: $currentStatus
        sdm: $sdm
        comment: $comment
      }
    ) {
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

export const CREATE_PRIORITY = gql`
  mutation createPriority(
    $zendesk: String
    $title: String
    $description: String
    $jira: String
    $dateCreated: String
    $customer: String
    $currentStatus: String
    $sdm: String
    $comment: String
  ) {
    createPriority(
      data: {
        zendesk: $zendesk
        title: $title
        description: $description
        jira: $jira
        dateCreated: $dateCreated
        customer: $customer
        currentStatus: $currentStatus
        sdm: $sdm
        comment: $comment
      }
    ) {
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
