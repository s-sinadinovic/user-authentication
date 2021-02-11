// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_persist

let inMemoryToken;

function auth({ jwt_token, jwt_token_expiry }) {
  inMemoryToken = {
    token: jwt_token,
    expiry: jwt_token_expiry,
  };
}

export default auth;
