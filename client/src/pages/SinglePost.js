import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Button, Card, Grid, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import { useParams, useNavigate } from 'react-router';


export default function SinglePost(props) {
    const params = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const postId = params.postId;
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
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
                                <LikeButton user={user} post={{id, likes}} />
                                <Button as="div" labelPosition="right" onClick={() => console.log("Comment Clicked")}>
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {comments.length}
                                    </Label>
                                </Button>
                                {user && user.userName === userName && (
                                    <DeleteButton postId={id} callback={ deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup
}

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
