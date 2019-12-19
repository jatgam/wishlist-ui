import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Grid, Paper, CircularProgress, Typography, Divider, createStyles, withStyles} from '@material-ui/core';
import JatgamMUI from '../jatgam/mui/JatgamMUI';
import wishListLogoImg from '../jatgam/svg/gift.svg';
import {LoginFormValues, EnhancedLoginForm} from '../components/LoginForm';
import { RouteProps } from 'react-router';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { loginAction, checkAuthenticated } from '../actions/authAction';
import {push} from 'connected-react-router';

const styles = (theme: any) => createStyles({
    root: {
        // backgroundColor: '#1e1e1e',
        height: '100vh',
    },
    wishlistLogo: {
        display: 'inline-block',
        backgroundImage: `url(${wishListLogoImg})`,
        backgroundRepeat: 'no-repeat',
        height: '4em',
        width: '4em',
        [theme.breakpoints.down('sm')]: {
            hieght: '3em',
            width: '3em',
        },
        [theme.breakpoints.down('xs')]: {
            hieght: '2em',
            width: '2em',
        },
    },
    appTitle: {
        lineHeight: '2em',
        '& em': {
            fontStyle: 'unset',
            fontSize: '1.5em'
        }
    },
    loginPanel: {
        textAlign: 'center',
        padding: '3em',
    },
    loginPrompt: {
        margin: '1em 0'
    },
    errorMsg: {
        color: theme.palette.error.main
    }
});

interface LoginRouteProps {
    classes: any,
    listCommonContentStatus: any,
    loading: boolean,
    error?: AxiosError,
    handleLogin: (loginData: LoginFormValues) => void,
    checkAuthenticated: () =>  void
}

export class LoginRoute extends PureComponent<LoginRouteProps & RouteProps> {
    componentDidMount(): void {
        this.props.checkAuthenticated();
    }
    render() {
        const {classes, loading, error, listCommonContentStatus} = this.props;
        let errorReason = null;
        if (error && error.response) {
            if (error.response.status === 401) {
                errorReason = (<div>Incorrect Username or Password</div>)
            } else {
                errorReason = (<div>Login Failed</div>)
            }
        }
        return (
            <Grid container justify='center' alignItems='center' className={classes.root}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Paper className={classes.loginPanel}>
                        <div className={classes.wishlistLogo}/>
                        <p className={classes.appTitle}>Wishlist Login</p>
                        <Divider/>
                        <Typography variant='h6' gutterBottom className={classes.loginPrompt}>
                            Please Login
                        </Typography>
                        {errorReason && (<p className={classes.errorMsg}>{errorReason}</p>)}
                        {loading ? (<CircularProgress/>) : (
                            <EnhancedLoginForm listCommonContentStatus={listCommonContentStatus} handleLogin={this.props.handleLogin}/>
                        )}   
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>, ownProps: RouteProps) => ({
    handleLogin: (loginData: LoginFormValues) => dispatch(loginAction(loginData)),
    checkAuthenticated: () => checkAuthenticated().then(() => dispatch(push('/'))).catch((err: Error) => console.info('Authenticated Status Check Failed:', err))
});

const mapStateToProps = (state: any) => ({
    loading: Boolean(state.auth.loading),
    error: state.auth.error,
    listCommonContentStatus: state.listCommonContentStatus
});

export default JatgamMUI(withStyles(styles, {withTheme:true})(connect(mapStateToProps, mapDispatchToProps)(LoginRoute)));
