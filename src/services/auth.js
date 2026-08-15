export const login = async (credentials) => {
  console.log("Dummy login:", credentials)

  return {
    success: true,
    user: {
      username: credentials.username,
      role: "Administrator",
    },
  }
}

export const logout = () => {
  console.log("Dummy logout")
}