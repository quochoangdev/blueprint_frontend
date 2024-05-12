import jwt_decode from 'jwt-decode';

const jwtDecode = (token) => {
    return jwt_decode(token)
}

export default jwtDecode