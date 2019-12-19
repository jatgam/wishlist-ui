// Render Prop
import React, {PureComponent} from 'react';
import * as Yup from 'yup';
import { ErrorMessage, FormikProps, withFormik, FormikBag } from 'formik';
import { TextField, Button, Grid, createStyles, withStyles } from '@material-ui/core';
import {Check, Clear} from '@material-ui/icons';
import JatgamMUI from '../jatgam/mui/JatgamMUI';

export interface PasswordForgotFormValues {
    email: string
};

export interface PasswordForgotFormProps {
    handlePasswordForgot: (passwordForgotData: PasswordForgotFormValues) => void
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


class PasswordForgotForm extends PureComponent<PasswordForgotFormProps & FormikProps<PasswordForgotFormValues> & {classes: any}> {
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

export default PasswordForgotForm;

export const EnhancedPasswordForgotForm = withFormik<PasswordForgotFormProps, PasswordForgotFormValues>({
    displayName: "EnhancedPasswordForgotForm",
    handleSubmit: (values: PasswordForgotFormValues, formikBag: FormikBag<PasswordForgotFormProps, PasswordForgotFormValues>) => {
        formikBag.props.handlePasswordForgot(values);
    },
    mapPropsToValues: () => ({email: ''}),
    validateOnChange: false,
    validationSchema: Yup.object().shape<PasswordForgotFormValues>({
        email: Yup.string().email().required()
    })
})(JatgamMUI(withStyles(styles, {withTheme:true})(PasswordForgotForm)));
