import React, { useContext, useState, useRef } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, Grid, Icon, Label, Form } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import { useParams, useNavigate } from 'react-router';


export default function SinglePost(props) {
    const [comment, setComment] = useState('')
    const commentInputRef= useRef(null)
    const params = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const postId = params.postId;
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        variables: {
            postId,
            body: comment
        },
        update(_, result) {
            setComment('')
            commentInputRef.current.blur()
        }
    })
    const deletePostCallback = () => {
        navigate("/")
    }

    const getPost = data?.getPost;
    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, userName, body, createdAt, likes, comments } = getPost;
        console.log(getPost)
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <img className="right floated small ui image" src="https://semantic-ui.com/images/avatar2/large/molly.png" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{userName}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes }} />
                                <Button as="div" labelPosition="right" onClick={() => console.log("Comment Clicked")}>
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {comments.length}
                                    </Label>
                                </Button>
                                {user && user.userName === userName && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user ? (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input ref={commentInputRef}type="text" placeholder="Comment..." name="comment" value={comment} onChange={(event) => setComment(event.target.value)} />
                                            <button type="submit" className=" ui button teal" disabled={!comment.trim().length} onClick={submitComment}>Submit</button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        ) : null}
                        {comments.length ? comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.userName === comment.userName && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.userName}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>
                                        {comment.body}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )) : null}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
 mutation ($postId: ID!, $body:String!){
     createComment(postId: $postId, body:$body){
         id
         comments{
             id userName createdAt body
         }
     }
 }
 `
const FETCH_POST_QUERY = gql`
query($postId: ID!){
    getPost(postId: $postId){
        id userName createdAt body
        likes{
            userName
        }
        comments {
            id userName createdAt body
        }
    }
}
`
