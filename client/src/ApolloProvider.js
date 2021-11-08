import React from 'react'
import { InMemoryCache, ApolloProvider, ApolloClient} from '@apollo/client'

import App from './App'


const client = new ApolloClient ({

    
    cache: new InMemoryCache({}),
    uri: "http://localhost:5000/graphql"
})

const ApolloProviderWrapper = () =>    (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)

export default ApolloProviderWrapper