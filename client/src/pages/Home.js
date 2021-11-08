import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react'


const Home = () => {
    const { loading, data: {getPosts: posts} } = useQuery(FETCH_POSTS_QUERY)
    
    if (posts) {
    }
    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recents Posts</h1>
                </Grid.Row>

            <Grid.Row>
                {loading ? <h1>Loading Posts</h1> :
                    posts && posts.map(post =>
                        <Grid.Column>
                            
                    </Grid.Column>)}
                
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
