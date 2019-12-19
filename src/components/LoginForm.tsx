// Render Prop
import React, {PureComponent} from 'react';
import * as Yup from 'yup';
import { ErrorMessage, FormikProps, withFormik, FormikBag } from 'formik';
import { TextField, Button, Grid, createStyles, withStyles } from '@material-ui/core';
import {Check, Clear, AccountCircle} from '@material-ui/icons';
import JatgamMUI from '../jatgam/mui/JatgamMUI';
export interface LoginFormValues {
    username: string,
    password: string,
};

export interface LoginFormProps {
    listCommonContentStatus: any,
    handleLogin: (loginData: LoginFormValues) => void
}

const styles = (theme: any) => createStyles({
    root: {
        fontFamily: theme.typography.fontFamily
    },
    leftIcon: {
        marginRight: theme.spacing(),
    },
    registerBtn: {
        background: '#f8e71c', //theme.palette.warning.main,
        '&:hover': {background: '#f5cc00'} //theme.palette.warning.hover
    },
    forgotBtn: {
        background: '#f8e71c', //theme.palette.warning.main,
        '&:hover': {background: '#f5cc00'} //theme.palette.warning.hover
    },
    errorMsg: {
        color: '#d70902' //theme.palette.error.main
    }
});


class LoginForm extends PureComponent<LoginFormProps & FormikProps<LoginFormValues> & {classes: any}> {
    render() {
        const {values, handleSubmit, handleReset, handleChange, classes, listCommonContentStatus} = this.props;
        return (
            <form onSubmit={handleSubmit} onReset={handleReset} className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField type="text" name="username" value={values.username} placeholder="Username" onChange={handleChange} fullWidth />
                        <ErrorMessage name="username" className={classes.errorMsg} component="p" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" name="password" value={values.password} placeholder="Password" onChange={handleChange} fullWidth />
                        <ErrorMessage name="password" className={classes.errorMsg} component="p" />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Button type="submit" fullWidth color="primary" variant="contained">
                                    <Check className={classes.leftIcon} />
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Button type="reset" fullWidth color="secondary" variant="contained">
                                    <Clear className={classes.leftIcon} />
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button href='/password_forgot' type="button" className={classes.forgotBtn} fullWidth variant="contained">
                            <AccountCircle className={classes.leftIcon} />
                            Forgot Password
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button href='/register' type="button" className={classes.registerBtn} fullWidth variant="contained">
                            <AccountCircle className={classes.leftIcon} />
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
};

export default LoginForm;

export const EnhancedLoginForm = withFormik<LoginFormProps, LoginFormValues>({
    displayName: "EnhancedLoginForm",
    handleSubmit: (values: LoginFormValues, formikBag: FormikBag<LoginFormProps, LoginFormValues>) => {
        formikBag.props.handleLogin(values);
    },
    mapPropsToValues: () => ({username: '', password: ''}),
    validateOnChange: false,
    validationSchema: Yup.object().shape<LoginFormValues>({
        username: Yup.string().required(),
        password: Yup.string().required()
    })
})(JatgamMUI(withStyles(styles, {withTheme:true})(LoginForm)));
