export const saveToken = (token) => {
  localStorage.setItem('jwtToken', token)
}

export const getToken = () => {
  return localStorage.getItem('jwtToken')
}
