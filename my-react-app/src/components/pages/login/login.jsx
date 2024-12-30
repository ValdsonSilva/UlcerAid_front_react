import "./login.style.css"
import Enfermagem from "../../../assets/enfermagem.jpg";
import Login_form from "../../form/login_form";

function Login() {

    return (
        <div id="form-container">
            <div id="imagem-enfermeiro">
                <img src={Enfermagem} alt="imagem de um enfermeiro" id="img-enfermagem"/>
            </div>

            <Login_form/>
        </div>
    )
}

export default Login;