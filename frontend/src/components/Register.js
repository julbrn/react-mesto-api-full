import { useState } from 'react';
function Register({ onRegister, isLoading, loadingText, buttonText }) {
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
        onRegister({
            email,
            password,
        });
    }
    return (
        <div className="auth">
            <h2 className="auth__heading">
                Регистрация
            </h2>
            <form className="auth__form" name="auth-form" onSubmit={handleSubmit}>
                <input className="auth__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleEmailChange}
                />
                <p className="auth__error" id="email-error" />
                <input className="auth__input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    minLength={3}
                    required
                    onChange={handlePasswordChange}
                />
                <p className="auth__error" id="email-error" />
                <button type="submit" className="auth__button">
                    {isLoading ? loadingText : buttonText}
                </button>
                <p className="auth__question">
                    <a className="auth__link" href="/signin">Уже зарегистрированы? Войти</a>
                </p>
            </form>
        </div>
    );
}
export default Register;