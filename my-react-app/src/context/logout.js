
function logout() {
    const token = localStorage.getItem("token")
    if (token) localStorage.removeItem("token")
}

export default logout;