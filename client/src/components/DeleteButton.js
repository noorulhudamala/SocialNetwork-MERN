import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../utils/graphql'


export default function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
    const [deletePostOrComment] = useMutation(mutation, {
        variables: {
            postId,
            commentId
        },
        update(proxy, result) {
            console.log(result)
            setConfirmOpen(false)
            if (!commentId) {
                let data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
                data = { ...data, getPosts: data.getPosts.filter(post => post.id !== postId) }
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            }
            if (callback) callback();
        },
        onError: (err)=> {
            console.log(err)
        }
    })

    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrComment} ></Confirm>
        </>
    )
}
const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id body createdAt userName
            likes{
                id
                userName createdAt
            }
            comments{
                id body userName createdAt
            }
        }
    }
`
