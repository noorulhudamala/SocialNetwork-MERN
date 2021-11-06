const postsResolvers = require("./post");
const userResolvers = require("./users");
const commentResolvers = require("./comment");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation
  },
};
