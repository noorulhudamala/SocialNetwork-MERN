import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard';


const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    const posts = data?.getPosts;
 
 console.log(posts)
    return (
        <Grid columns={3}>
            <Grid.Row className={"page-title"}>
                <h1>Recents Posts</h1>
                </Grid.Row>

            <Grid.Row>
                {loading ? <h1>Loading Posts</h1> :
                    posts && posts.map(post =>
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            
                            <PostCard post={post} />
                    
                        </Grid.Column>
                    )}
            </Grid.Row>
            </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts{
    id
    body
    createdAt
    userName
    likes {
        userName
    }
    comments {
        id
        userName
        createdAt
        body
    }
    }
}
`
export default Home;
