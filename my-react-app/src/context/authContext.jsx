import { useContext, useState } from "react";
import * as jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { createContext } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    useState(() => {
        const loadStoredAuth = async () => {
            try {
                const storedToken = localStorage.getItem("token")

                if (storedToken) {
                    setToken(storedToken)
                    setIsAuthenticated(!isAuthenticated)
                }
            } catch (error) {
                console.error("Falha ao carregar dados da autenticação armazenada")
            }
        }
        loadStoredAuth()
    }, [token])

    const logout = () => {
        const token = localStorage.getItem("token")

        if (token) {
            localStorage.clear()
            setToken(null)
            setIsAuthenticated(false)
        } 
    }
    
    const protectedRoute = () => {

        console.log("protegida:", isAuthenticated)
        
        if (!isAuthenticated) {
            navigate("/")
            alert("Sessão encerrada")
        } else {
            return ""
        }
    }

    
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

    return (
        <AuthContext.Provider value={{isAuthenticated, logout, decodeToken, protectedRoute}}>
            {children}
        </AuthContext.Provider>
    )
}