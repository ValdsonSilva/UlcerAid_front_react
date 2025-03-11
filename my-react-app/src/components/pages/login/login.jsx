import Enfermagem from "../../../assets/enfermagem.jpg";
import Login_form from "../../form/loginForm";

function Login() {

    return (
        <div className="flex justify-around items-center max-w-full h-full">
            <div className="h-3/6 w-2/4 flex justify-center items-center">
                <img src={Enfermagem} alt="imagem de um enfermeiro" className="w-full max-h-full"/>
            </div>

            <Login_form/>
        </div>
    )
}

export default Login;