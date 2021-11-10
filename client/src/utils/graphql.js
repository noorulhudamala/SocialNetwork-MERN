import gql from 'graphql-tag'


export const FETCH_POSTS_QUERY = gql`
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