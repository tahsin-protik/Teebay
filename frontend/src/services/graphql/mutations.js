import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
 mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        first_name
      }
    }
 }
`;

const SIGNUP_MUTATION = gql`
 mutation SignUp($firstName: String!, $lastName: String!, $address: String!, $email: String!, $phone: String!, $password: String!) {
    signup(first_name: $firstName, last_name: $lastName, address: $address, email: $email, phone: $phone, password: $password) {
      token
      user {
        id
        email
        first_name
    }
 }
}
`;

export { LOGIN_MUTATION, SIGNUP_MUTATION };