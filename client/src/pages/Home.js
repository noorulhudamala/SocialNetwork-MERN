import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../utils/graphql';

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext)
    const posts = data?.getPosts;

    return (
        <Grid columns={3}>
            <Grid.Row className={"page-title"}>
                <h1>Recents Posts</h1>
            </Grid.Row>

            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? <h1>Loading Posts</h1> : (
                    <Transition.Group>
                        {posts && posts.map(post =>
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>

                                <PostCard post={post} />

                            </Grid.Column>
                        )}
                    </Transition.Group>
                )
                }
            </Grid.Row>
        </Grid>
    )
}


export default Home;
