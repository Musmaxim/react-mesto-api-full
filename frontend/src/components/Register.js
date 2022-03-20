import React from "react";
import { Link } from 'react-router-dom';

function Register ({registrate}) {
    const [valueEmail, setValueEmail] = React.useState("");
    const [valuePassword, setValuePassword] = React.useState("");

    const handleChangeEmail = (e) => 
        setValueEmail(e.target.value);

    const handleChangePassword = (e) => 
        setValuePassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = valueEmail;
        const password = valuePassword;
        registrate({ email, password });
    }

    return (
        <section className="user">
        <h1 className="user__title">Регистрация</h1>
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
        <button className="user__button-submit">Зарегистрироваться</button>
        </form>
        <Link className="user__link" to="/sign-in">
        Уже зарегистрированы? Войти
        </Link>
    </section>
    )
};

export default Register;