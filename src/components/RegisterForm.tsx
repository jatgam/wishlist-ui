// Render Prop
import React, {PureComponent} from 'react';
import * as Yup from 'yup';
import { ErrorMessage, FormikProps, withFormik, FormikBag } from 'formik';
import { TextField, Button, Grid, createStyles, withStyles } from '@material-ui/core';
import {Check, Clear} from '@material-ui/icons';
import JatgamMUI from '../jatgam/mui/JatgamMUI';

export interface RegisterFormValues {
    username: string,
    password: string,
    password_confirm: string,
    email: string,
    firstname: string,
    lastname: string,
};

export interface RegisterFormProps {
    handleRegister: (registerData: RegisterFormValues) => void
}

const styles = (theme: any) => createStyles({
    root: {
        fontFamily: theme.typography.fontFamily
    },
    leftIcon: {
        marginRight: theme.spacing(),
    },
    errorMsg: {
        color: '#d70902' //theme.palette.error.main
    }
});


class RegisterForm extends PureComponent<RegisterFormProps & FormikProps<RegisterFormValues> & {classes: any}> {
    render() {
        const {values, handleSubmit, handleReset, handleChange, classes} = this.props;
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
                        <TextField type="password" name="password_confirm" value={values.password_confirm} placeholder="Password Confirm" onChange={handleChange} fullWidth />
                        <ErrorMessage name="password_confirm" className={classes.errorMsg} component="p" />
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField type="text" name="firstname" value={values.firstname} placeholder="First Name" onChange={handleChange} fullWidth />
                            <ErrorMessage name="firstname" className={classes.errorMsg} component="p" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField type="text" name="lastname" value={values.lastname} placeholder="Last Name" onChange={handleChange} fullWidth />
                            <ErrorMessage name="lastname" className={classes.errorMsg} component="p" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" name="email" value={values.email} placeholder="E-Mail" onChange={handleChange} fullWidth />
                        <ErrorMessage name="email" className={classes.errorMsg} component="p" />
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
                </Grid>
            </form>
        );
    };
};

export default RegisterForm;

export const EnhancedRegisterForm = withFormik<RegisterFormProps, RegisterFormValues>({
    displayName: "EnhancedRegisterForm",
    handleSubmit: (values: RegisterFormValues, formikBag: FormikBag<RegisterFormProps, RegisterFormValues>) => {
        formikBag.props.handleRegister(values);
    },
    mapPropsToValues: () => ({username: '', password: '', password_confirm: '', email: '', firstname: '', lastname: ''}),
    validateOnChange: false,
    validationSchema: Yup.object().shape<RegisterFormValues>({
        username: Yup.string().required(),
        password: Yup.string().min(10).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]|[_])/, {excludeEmptyString:true, message:'The password must be at least 10 character long and contain at least one of each: lowercase letter, uppercase letter, number, and special character'}).required('Password is Required'),
        password_confirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required('Password Confirm is required'),
        firstname: Yup.string().required(),
        lastname: Yup.string().required(),
        email: Yup.string().email().required()
    })
})(JatgamMUI(withStyles(styles, {withTheme:true})(RegisterForm)));
