import jwtDecode from 'jwt-decode'

export function decryptToken(accessToken: string | undefined) {
  if (!accessToken) return

  const decode = jwtDecode(accessToken)
  return decode
}
