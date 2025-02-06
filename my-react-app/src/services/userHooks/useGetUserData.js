import api from "src/services/api.js"

const useGetUserData = async (token) => {

    const cachedUserData = localStorage.getItem("cachedUserData") || false

    if (!cachedUserData) {
        alert("requisição")

        if (token.id) {

            try {   
                const response = await api.get("/api/v1/user", {
                    params : {
                        id : token.id
                    }
                })
    
                if (!response) {
                    throw new Error(response.status)
                }

                const savedData = {
                    username: response.data.user.username,
                    cpf: response.data.user.cpf,
                    contact: response.data.user.contact,
                    address: response.data.user.adress,
                    coren: response.data.user.coren,
                    area: response.data.user.area,
                    institution: response.data.user.institution,
                    createdAt: response.data.user.createdAt
                }
                
                localStorage.setItem("cachedUserData", JSON.stringify(savedData))
    
                return response.data.user
    
            } catch (error) {
    
                console.log(error)
    
                if (error.status == 400) {
                    console.log("Erro:", error.response.data.details)
                    alert(`${error.response.data.message}`)
                }
                if (error.status == 401) {
                    console.log("Erro:", error.response.data.details)
                    alert(`${error.response.data.message}`)
                }
                if (error.status == 403) {
                    console.log("Erro:", error.response.data.details)
                    alert(`${error.response.data.message}`)
                }
                if (error.status == 500) {
                    console.log("Erro:", error.response.data.details)
                    alert(`${error.response.data.message}`)
                }
            }
        }
    } else {
        return JSON.parse(cachedUserData)
    }
}

export default useGetUserData;
