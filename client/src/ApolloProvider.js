import React from 'react'
import { InMemoryCache, createHttpLink, ApolloProvider, ApolloClient} from '@apollo/client'

import App from './App'

const httpLink = createHttpLink({
    uri: "http://localhost:5000"
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const ApolloProviderWrapper = () =>    (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)

export default ApolloProviderWrapper