import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import {FETCH_POSTS_QUERY} from '../utils/graphql'


export default function DeleteButton({ postId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {
            postId
        },
        update(proxy, result) {
            console.log(result)
            setConfirmOpen(false)
            let data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
            data = { ...data, getPosts: data.getPosts.filter(post => post.id !== postId) }
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
            if (callback) callback();
        }
    })

    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} ></Confirm>
        </>
    )
}
const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`
