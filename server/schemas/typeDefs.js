const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Priority {
    id: String
    zendesk: String
    title: String
    description: String
    jira: String
    dateCreated: String
    customer: String
    currentStatus: String
    sdm: String
    comment: String
  }

  input CreatePriorityInput {
    zendesk: String
    title: String
    description: String
    jira: String
    dateCreated: String
    customer: String
    currentStatus: String
    sdm: String
    comment: String
  }

  input EditPriorityInput {
    id: ID!
    zendesk: String
    title: String
    description: String
    jira: String
    dateCreated: String
    customer: String
    sdm: String
    currentStatus: String
    comment: String
  }

  input ChangePriorityStatusInput {
    id: String!
    newStatus: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    priorities: [Priority]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPriority(data: CreatePriorityInput!): Priority
    editPriority(data: EditPriorityInput!): Priority!
    changePriorityStatus(data: ChangePriorityStatusInput!): Boolean
  }
`;

module.exports = typeDefs;
