import Cookies from 'js-cookie'

export const getAuthToken = () => {
  return Cookies.get('accessToken') // Get the authentication token from the cookie
}

export const setAuthToken = (token: string) => {
  Cookies.set('accessToken', token, { expires: 7 }) // Set the authentication token in a cookie that expires in 7 days
}

export const clearAuthToken = () => {
  Cookies.remove('accessToken') // Clear the authentication token cookie
}
