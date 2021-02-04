import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Grid, Paper, CircularProgress, Typography, Divider, createStyles, withStyles} from '@material-ui/core';
import JatgamMUI from '../jatgam/mui/JatgamMUI';
import wishListLogoImg from '../jatgam/svg/gift.svg';
import {PasswordForgotFormValues, EnhancedPasswordForgotForm} from '../components/PasswordForgotForm';
import { RouteProps } from 'react-router';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { pwForgotAction } from '../actions/authAction';

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
    pwForgotPanel: {
        textAlign: 'center',
        padding: '3em',
    },
    pwForgotPrompt: {
        margin: '1em 0'
    },
    errorMsg: {
        color: theme.palette.error.main
    }
});

interface PasswordForgotRouteProps {
    classes: any,
    loading: boolean,
    error?: AxiosError,
    handlePasswordForgot: (passwordForgot: PasswordForgotFormValues) => void,
}

export class PasswordForgotRoute extends PureComponent<PasswordForgotRouteProps & RouteProps> {
    render() {
        const {classes, loading, error} = this.props;
        let errorReason = null;
        if (error && error.response) {
            if (error.response.status === 422) {
                errorReason = (<div>Data Validation Error, please correct the form.</div>)
            } else {
                errorReason = (<div>Forgot Password Failed.</div>)
            }
        }
        return (
            <Grid container justify='center' alignItems='center' className={classes.root}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Paper className={classes.pwForgotPanel}>
                        <div className={classes.wishlistLogo}/>
                        <p className={classes.appTitle}>Wishlist</p>
                        <Divider/>
                        <Typography variant='h6' gutterBottom className={classes.pwForgotPrompt}>
                            Forgot/Reset Password
                        </Typography>
                        {errorReason && (<p className={classes.errorMsg}>{errorReason}</p>)}
                        {loading ? (<CircularProgress/>) : (
                            <EnhancedPasswordForgotForm handlePasswordForgot={this.props.handlePasswordForgot}/>
                        )}   
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>, ownProps: RouteProps) => ({
    handlePasswordForgot: (passwordForgotData: PasswordForgotFormValues) => dispatch(pwForgotAction(passwordForgotData)),
});

const mapStateToProps = (state: any) => ({
    loading: Boolean(state.auth.loading),
    error: state.auth.error,
});

export default JatgamMUI(withStyles(styles, {withTheme:true})(connect(mapStateToProps, mapDispatchToProps)(PasswordForgotRoute)));
