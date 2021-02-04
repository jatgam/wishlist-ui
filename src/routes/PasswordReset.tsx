import React, {PureComponent} from 'react';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Grid, Paper, CircularProgress, Typography, Divider, createStyles, withStyles} from '@material-ui/core';
import JatgamMUI from '../jatgam/mui/JatgamMUI';
import wishListLogoImg from '../jatgam/svg/gift.svg';
import {PasswordResetFormValues, EnhancedPasswordResetForm} from '../components/ResetPasswordForm';
import { RouteProps } from 'react-router';
import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { pwResetAction } from '../actions/authAction';

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
    pwResetPanel: {
        textAlign: 'center',
        padding: '3em',
    },
    pwResetPrompt: {
        margin: '1em 0'
    },
    errorMsg: {
        color: theme.palette.error.main
    }
});

interface PasswordResetRouteProps {
    classes: any,
    loading: boolean,
    error?: AxiosError,
    handlePasswordReset: (passwordResetData: PasswordResetFormValues, pwResetToken: string) => void,
}

type PasswordResetPathComponentProps = RouteComponentProps<{pwResetToken: string}>;

export class RegisterRoute extends PureComponent<PasswordResetRouteProps & PasswordResetPathComponentProps & RouteProps> {
    render() {
        const {classes, loading, error, match} = this.props;
        let errorReason = null;
        const pwResetToken = match.params.pwResetToken;
        if (error && error.response) {
            if (error.response.status === 422) {
                errorReason = (<div>Data Validation Error, please correct the form.</div>);
            } else if (error.response.status === 400) {
                const errRes = error.response.data.message;
                errorReason = (<div>{errRes}</div>);
            } else {
                errorReason = (<div>Password Reset Failed.</div>);
            }
        }
        return (
            <Grid container justify='center' alignItems='center' className={classes.root}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Paper className={classes.pwResetPanel}>
                        <div className={classes.wishlistLogo}/>
                        <p className={classes.appTitle}>Wishlist</p>
                        <Divider/>
                        <Typography variant='h6' gutterBottom className={classes.pwResetPrompt}>
                            Reset Password
                        </Typography>
                        {errorReason && (<p className={classes.errorMsg}>{errorReason}</p>)}
                        {loading ? (<CircularProgress/>) : (
                            <EnhancedPasswordResetForm handlePasswordReset={this.props.handlePasswordReset} pwResetToken={pwResetToken}/>
                        )}   
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>, ownProps: RouteProps) => ({
    handlePasswordReset: (passwordResetData: PasswordResetFormValues, pwResetToken: string) => dispatch(pwResetAction(passwordResetData, pwResetToken)),
});

const mapStateToProps = (state: any) => ({
    loading: Boolean(state.auth.loading),
    error: state.auth.error,
});

export default JatgamMUI(withStyles(styles, {withTheme:true})(connect(mapStateToProps, mapDispatchToProps)(RegisterRoute)));
