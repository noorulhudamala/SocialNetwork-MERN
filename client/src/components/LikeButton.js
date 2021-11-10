import React, { useState, useEffect } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

export default function LikeButton({ user, post: { id, likes } }) {
    const [liked, setLiked] = useState(false)
    const [likePost] = useMutation(LIKE_POST_MUTAION, {
        variables: { postId: id },
        onError: () => { }
    })
    useEffect(() => {
        if (user && likes.find(like => like.userName === user.userName)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

    const likeButton = user ? (
        liked ? (
            <Button color="teal" >
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    )
    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeButton}
            <Label basic color="teal" pointing="left">
                {likes.length}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTAION = gql`
mutation likePost($postId: ID!){
    likePost(postId: $postId){
        id
        likes {
            id userName
        }
    }
}
`
