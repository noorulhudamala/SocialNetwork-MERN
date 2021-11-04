const { gql } = require("apollo-server");

module.exports =  gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }

  type User{
    id: ID!,
    email: String!,
    userName: String!,
    token: String!,
    createdAt: String!
  }

  input RegisterInput{
    userName: String!,
    password: String!,
    confirmPassword: String,
    email: String!,
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation{
    register(registerInput: RegisterInput):User
  }
`;