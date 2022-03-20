import React from "react";

function Login ({ authorize }) {
    const [valueEmail, setValueEmail] = React.useState("");
    const [valuePassword, setValuePassword] = React.useState("");

    const handleChangeEmail = (e) => {
        setValueEmail(e.target.value)
    } 
    const handleChangePassword = (e) => {
        setValuePassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = valueEmail;
        const password = valuePassword;
        authorize({ password, email });
    }

    return (
        <section className="user">
        <h1 className="user__title">Вход</h1>
        <form onSubmit={handleSubmit} className="user__form">
        <input
            value={valueEmail}
            onChange={handleChangeEmail}
            className="user__input"
            placeholder="Email"
        />
        <input
            type="password"
            value={valuePassword}
            onChange={handleChangePassword}
            className="user__input"
            placeholder="Пароль"
        />
        <button className="user__button-submit">Войти</button>
        </form>
        </section>
    );
}

export default Login;