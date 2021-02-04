// Render Prop
import React, {PureComponent} from 'react';
import * as Yup from 'yup';
import { ErrorMessage, FormikProps, withFormik, FormikBag } from 'formik';
import { TextField, Button, Grid, createStyles, withStyles } from '@material-ui/core';
import {Check, Clear} from '@material-ui/icons';
import JatgamMUI from '../jatgam/mui/JatgamMUI';

export interface PasswordResetFormValues {
    password: string,
    password_confirm: string,
    email: string,
}

export interface PasswordResetFormProps {
    handlePasswordReset: (passwordResetData: PasswordResetFormValues, pwResetToken: string) => void,
    pwResetToken: string
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


class PasswordResetForm extends PureComponent<PasswordResetFormProps & FormikProps<PasswordResetFormValues> & {classes: any}> {
    render() {
        const {values, handleSubmit, handleReset, handleChange, classes} = this.props;
        return (
            <form onSubmit={handleSubmit} onReset={handleReset} className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField type="text" name="email" value={values.email} placeholder="E-Mail" onChange={handleChange} fullWidth />
                        <ErrorMessage name="email" className={classes.errorMsg} component="p" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" name="password" value={values.password} placeholder="Password" onChange={handleChange} fullWidth />
                        <ErrorMessage name="password" className={classes.errorMsg} component="p" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" name="password_confirm" value={values.password_confirm} placeholder="Password Confirm" onChange={handleChange} fullWidth />
                        <ErrorMessage name="password_confirm" className={classes.errorMsg} component="p" />
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
    }
}

export default PasswordResetForm;

export const EnhancedPasswordResetForm = withFormik<PasswordResetFormProps, PasswordResetFormValues>({
    displayName: "EnhancedPasswordResetForm",
    handleSubmit: (values: PasswordResetFormValues, formikBag: FormikBag<PasswordResetFormProps, PasswordResetFormValues>) => {
        formikBag.props.handlePasswordReset(values, formikBag.props.pwResetToken);
    },
    mapPropsToValues: () => ({password: '', password_confirm: '', email: ''}),
    validateOnChange: false,
    validationSchema: Yup.object({
        password: Yup.string().min(10).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]|[_])/, {excludeEmptyString:true, message:'The password must be at least 10 character long and contain at least one of each: lowercase letter, uppercase letter, number, and special character'}).required('Password is Required'),
        password_confirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required('Password Confirm is required'),
        email: Yup.string().email().required()
    })
})(JatgamMUI(withStyles(styles, {withTheme:true})(PasswordResetForm)));
