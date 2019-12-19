import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import './App.css';

import Main from './routes/Main';
import Login from './routes/Login';
import Register from './routes/Register';
import PWReset from './routes/PasswordReset';
import PWForgot from './routes/PasswordForgot';

const App: React.FC = () => {
    return (
        <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path='/password_reset/:pwResetToken' component={PWReset} />
            <Route exact path='/password_forgot' component={PWForgot} />
        </div>
    );
}

export default withRouter(App);
