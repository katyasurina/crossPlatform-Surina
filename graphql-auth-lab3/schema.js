export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }
  
  type Car {
    id: ID!
    brand: String!
    model: String!
    year: Int!
    price: Float!
    owner: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    cars: [Car!]!
    car(id: ID!): Car
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createCar(brand: String!, model: String!, year: Int!, price: Float!): Car!
    deleteCar(id: ID!): Boolean!
  }
`;