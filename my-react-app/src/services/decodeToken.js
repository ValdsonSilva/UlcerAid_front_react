import * as jwt_decode from "jwt-decode"

const decodeToken = () => {
    const token = localStorage.getItem("token")

    if (!token) {
        return `Token inexistente`;

    } else {
            
        try {
            return jwt_decode.jwtDecode(token);

        } catch (error) {
            return error
        }
    }
}

export default decodeToken;