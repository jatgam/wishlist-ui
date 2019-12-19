import React, { PureComponent } from 'react';
import logo from '../logo.svg';
import { RouteProps } from 'react-router';
import JatgamMUI from '../jatgam/mui/JatgamMUI';
import { Grid, createStyles, withStyles } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import {push} from 'connected-react-router';
import { checkAuthenticated, logoutAction } from '../actions/authAction';
import { AnyAction } from 'redux';
import TopToolbar from '../components/TopToolbar';
import WantedItemsContainer from '../components/WantedItemsContainer';
import ReservedItemsContainer from '../components/ReservedItemsContainer';


const styles = (theme: any) => createStyles({
    root: {
        // backgroundColor: '#1e1e1e',
        height: '100vh',
    },
});

interface MainRouteProps {
    user: any,
    classes: any,
    checkAuthenticated: (passwordReset: boolean) => void,
    logout: () => void,
};

class Main extends PureComponent<MainRouteProps & RouteProps> {
    componentDidMount(): void {
        let passwordreset = false;
        if (this.props.user && this.props.user.passwordreset) {
            passwordreset = true;
        }
        this.props.checkAuthenticated(passwordreset);
    }

    render() {
        const {user, classes, logout} = this.props;
        return (
            <Grid container justify='center' className={classes.root}>
                <Grid container>
                    <TopToolbar barTitle="Shawn Silva's Wishlist" loggedIn={user ? true : false} logout={logout} />
                </Grid>
                <Grid container justify='center' alignContent='center' spacing={1}>
                    <WantedItemsContainer loggedIn={user ? true : false}></WantedItemsContainer>
                    {user && (
                        <ReservedItemsContainer loggedIn={user ? true : false}></ReservedItemsContainer>
                    )}
                </Grid>
            </Grid>
        );
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>, ownProps: RouteProps) => ({
    checkAuthenticated: (passwordReset: boolean) => checkAuthenticated()
        .then(() => {
            if (passwordReset) {
                dispatch(push('/password_forgot'));
            }
        })
        .catch((err: Error) => {
            console.info('Authenticated Status Check Failed:', err);
            dispatch(logoutAction());
    }),
    logout: () => dispatch(logoutAction()),
});

const mapStateToProps = (state: any) => ({
    user: state.auth.user,
});
export default JatgamMUI(withStyles(styles, {withTheme:true})(connect(mapStateToProps, mapDispatchToProps)(Main)));
