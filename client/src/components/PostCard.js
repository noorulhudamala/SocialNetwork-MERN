import React, { useContext } from 'react'
import { Card, Icon, Label, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

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
                    <LikeButton post={{id, likes}}/>
                    <Button labelPosition="right" as={Link} to={`/post/${id}`}>
                        <Button>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="teal" pointing="left">
                            {comments.length}
                        </Label>
                    </Button>
                    {user && user.userName === userName && (
                        <Button as="div" color="red" floated="right" onClick={() => console.log("Delete Post")}>
                            <Icon name="trash" style={{margin:0}}/>
                        </Button>
                    )}
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
