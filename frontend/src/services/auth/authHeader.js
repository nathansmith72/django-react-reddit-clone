import jwt from 'jsonwebtoken'
import AuthService from './authService'

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.access_token) {
    // Refresh token if about to expire
    let expiration = jwt.decode(user.access_token).exp;
    const now = new Date();
    if (now.getTime() > expiration * 1000) {
        AuthService.refresh_token(user.refresh_token)
    }
    user = JSON.parse(localStorage.getItem('user'))
    return {Authorization: 'Bearer ' + user.access_token}
  } else {
    return {};
  }
}