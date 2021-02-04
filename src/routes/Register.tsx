import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Grid, Paper, CircularProgress, Typography, Divider, createStyles, withStyles} from '@material-ui/core';
import JatgamMUI from '../jatgam/mui/JatgamMUI';
import wishListLogoImg from '../jatgam/svg/gift.svg';
import {RegisterFormValues, EnhancedRegisterForm} from '../components/RegisterForm';
import { RouteProps } from 'react-router';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { checkAuthenticated } from '../actions/authAction';
import { registerAction } from '../actions/registerAction';
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
    registrationPanel: {
        textAlign: 'center',
        padding: '3em',
    },
    registrationPrompt: {
        margin: '1em 0'
    },
    errorMsg: {
        color: theme.palette.error.main
    }
});

interface RegisterRouteProps {
    classes: any,
    loading: boolean,
    error?: AxiosError,
    handleRegister: (registerData: RegisterFormValues) => void,
    checkAuthenticated: () =>  void
}

export class RegisterRoute extends PureComponent<RegisterRouteProps & RouteProps> {
    componentDidMount(): void {
        this.props.checkAuthenticated();
    }
    render() {
        const {classes, loading, error} = this.props;
        let errorReason = null;
        const errorReasons: JSX.Element[] = [];
        if (error && error.response) {
            if (error.response.status === 422) {
                errorReason = (<div>Data Validation Error, please correct the form.</div>)
                if (error.response.data && error.response.data.errors) {
                    error.response.data.errors.forEach((foundError: {'param': string, 'msg': string}) => {
                        errorReasons.push((<p className={classes.errorMsg}><div>{foundError.param}: {foundError.msg}</div></p>))
                    });
                }
            } else {
                errorReason = (<div>Register Failed.</div>)
            }
        }
        return (
            <Grid container justify='center' alignItems='center' className={classes.root}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Paper className={classes.registrationPanel}>
                        <div className={classes.wishlistLogo}/>
                        <p className={classes.appTitle}>Wishlist</p>
                        <Divider/>
                        <Typography variant='h6' gutterBottom className={classes.registrationPrompt}>
                            User Registration
                        </Typography>
                        {errorReason && (<p className={classes.errorMsg}>{errorReason}</p>)}
                        {errorReasons}
                        {loading ? (<CircularProgress/>) : (
                            <EnhancedRegisterForm handleRegister={this.props.handleRegister}/>
                        )}   
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>, ownProps: RouteProps) => ({
    handleRegister: (registerData: RegisterFormValues) => dispatch(registerAction(registerData)),
    checkAuthenticated: () => checkAuthenticated().then(() => dispatch(push('/'))).catch((err: Error) => console.info('Authenticated Status Check Failed:', err))
});

const mapStateToProps = (state: any) => ({
    loading: Boolean(state.register.loading),
    error: state.register.error,
});

export default JatgamMUI(withStyles(styles, {withTheme:true})(connect(mapStateToProps, mapDispatchToProps)(RegisterRoute)));
