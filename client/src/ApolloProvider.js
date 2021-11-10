import React from 'react'
import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink} from '@apollo/client'
import {setContext} from 'apollo-link-context'

import App from './App'

const httpLink = createHttpLink({
    uri: "http://localhost:5000/"
})
const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken")
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient ({
    cache: new InMemoryCache({}),
    link: authLink.concat(httpLink)
})

const ApolloProviderWrapper = () =>    (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)

export default ApolloProviderWrapper