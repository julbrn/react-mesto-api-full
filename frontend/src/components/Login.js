import {useState} from 'react';
function Login({handleLogin, tokenCheck, isLoading, loadingText, buttonText}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin({
            email,
            password,
        });
    }
    return (
        <div className="auth">
            <h2 className="auth__heading">
                Вход
            </h2>
            <form className="auth__form" name="sign-in-form" onSubmit={handleSubmit}>
                <input className="auth__input"
                       id="email"
                       name="email"
                       type="email"
                       placeholder="Email"
                       required
                       onChange={handleEmailChange}
                />
                <p className="auth__error" id="email-error"/>
                <input className="auth__input"
                       id="password"
                       name="password"
                       type="password"
                       placeholder="Пароль"
                       autoComplete="current-password"
                       required
                       onChange={handlePasswordChange}
                />
                <p className="auth__error" id="email-error"/>
                <button type="submit" className="auth__button">
                    {isLoading ? loadingText : buttonText}
                </button>
            </form>
        </div>
    );
}
export default Login;