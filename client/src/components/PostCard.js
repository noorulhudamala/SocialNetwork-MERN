import React from 'react'
import { Card, Icon, Label, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const likePost = () => {
    console.log("post liked")
}

const commentPOst = () => {
    console.log("post liked")
}

const PostCard = ({ post: { body, createdAt, id, userName, likes, comments } }) => {
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
                    <Button as="div" labelPosition="right" onClick = {likePost}>
                        <Button>
                            <Icon name="heart" />
                        </Button>
                        <Label basic color="teal" pointing="left">
                           {likes.length}
                        </Label>
                    </Button>
                    <Button as="div" labelPosition="right" onClick = {commentPOst}>
                        <Button>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="teal" pointing="left">
                           {comments.length}
                        </Label>
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard
