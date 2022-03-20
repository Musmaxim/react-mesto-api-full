import React from "react";
import { Link, Switch, Route } from "react-router-dom";



function Header(props) {

    return (<>
        <header className="header">
            <div className="header__logo"></div>
            <Switch>
                <Route path="/sign-up">
                    <Link className="header__link" to="/sign-in">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__link" to="/sign-up">Регистрация</Link>
                </Route>
                <Route path="/">
                    <div className="header__logoff">
                    <p className="header__email">{props.email}</p>
                    <Link className="header__signout" to="/sign-in" onClick={props.handleSignOut}>Выйти</Link>
                    </div>
                </Route>
            </Switch>
        </header>
        </>)
}
        export default Header;