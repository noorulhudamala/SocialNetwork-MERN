const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require("../../models/Post")
const checkAuth = require("../../utils/checkAuth")

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({createdAt: 1});
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        console.log(post)
        if (post) {
          return post;
        }
        else {
          throw new Error("Post not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      const newPost = new Post({ body, user: user.id, userName: user.userName, createdAt: new Date().toISOString()})
      const post = await newPost.save()
      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      if (user)
        try {
          const post = await Post.findById(postId)
          if (user.userName === post.userName) {
            await post.delete();
            return 'Post deleted successfully';
          } else {
            throw new AuthenticationError("Action not allowed")
          }
        } catch (error) {
          throw new Error(error)
        }
    },
    likePost: async (_, { postId }, context) => {
      const { userName } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.userName === userName)) {
          //post already liked, unlike it
          post.likes = post.likes.filter(like=> like.userName !== userName)
        } else {
          post.likes.push({
            userName,
            createdAt: new Date().toISOString()
          })
          
        }
      await post.save();
        return post
      } else {
        throw new UserInputError("Post not found")
      }
    }
  }
}
