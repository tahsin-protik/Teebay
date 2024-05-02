import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const graphql_uri = process.env.REACT_APP_GRAPHQL_URI;
const getToken = () => {
    return localStorage.getItem('auth_token');
};

const authLink = setContext((_, { headers }) => {

    const token = getToken();

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});


const httpLink = createHttpLink({
    uri: graphql_uri,
});

const link = ApolloLink.from([authLink, httpLink]);


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;