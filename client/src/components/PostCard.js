import React, { useContext } from 'react'
import { Card, Icon, Label, Button, Popup } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


const PostCard = ({ post: { body, createdAt, id, userName, likes, comments } }) => {
    const { user } = useContext(AuthContext)
    return (
        <div className="ui cards">
            <Card fluid>
                <Card.Content>
                    <img className="right floated mini ui image" src="https://semantic-ui.com/images/avatar2/large/molly.png" />
                    <Card.Header>
                        {userName}
                    </Card.Header>
                    <Card.Meta as={Link} to={`/posts/${id}`}>
                        {moment(createdAt).fromNow()}
                    </Card.Meta>
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <LikeButton user={user} post={{ id, likes }} />
                    <Popup inverted content='Comment' trigger={
                        <Button labelPosition="right" as={Link} to={`/post/${id}`}>
                            <Button color="teal" basic>
                                <Icon name="comments" />
                            </Button>
                            <Label basic color="teal" pointing="left">
                                {comments.length}
                            </Label>
                        </Button>
                    }/>
                    {user && user.userName === userName && (
                        <DeleteButton postId = {id}/>
                    )}
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
