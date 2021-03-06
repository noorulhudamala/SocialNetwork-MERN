const Post = require("../../models/Post")
const checkAuth = require("../../utils/checkAuth")
const { AuthenticationError, UserInputError} = require("apollo-server")

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { userName } = checkAuth(context)
            if (!body.trim()) {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: "Comment body must not be empty"
                    }
                })
            }

            const post = await Post.findById(postId)
            if (post) {
                post.comments.unshift({
                    body, 
                    userName,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            } else {
                throw new UserInputError("Post not created")
            }

        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { userName } = checkAuth(context)
            const post = await Post.findById(postId);
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId)
                if (commentIndex) {
                    if (post.comments[commentIndex].userName === userName) {
                        post.comments.splice(commentIndex, 1)
                        await post.save();
                        return post
                    }
                    else {
                        throw new AuthenticationError("Action not allowed")
                    }
                }
            } else {
                throw new UserInputError("Post not found")
            }
            

        }
    }
}