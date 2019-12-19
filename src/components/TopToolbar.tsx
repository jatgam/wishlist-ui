import React, {PureComponent} from 'react';
import { TextField, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {Check, Clear, AccountCircle} from '@material-ui/icons';
import JatgamMUI from '../jatgam/mui/JatgamMUI';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            fontFamily: theme.typography.fontFamily,
            flexGrow: 1
        },
        title: {
            flexGrow: 1,
        },
        leftIcon: {
            marginRight: theme.spacing(),
        },
        loginBtn: {
            // background: '#f8e71c', //theme.palette.warning.main,
            // '&:hover': {background: '#f5cc00'} //theme.palette.warning.hover
        },
        errorMsg: {
            color: '#d70902' //theme.palette.error.main
        }
    }),
);

function TopToolbar({barTitle, loggedIn, logout}: {barTitle: string, loggedIn: boolean, logout: () => void}): JSX.Element {
    const classes = useStyles({});
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleClose();
        logout();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {barTitle}
                    </Typography>
                    {!loggedIn && (
                        <div>
                            <Button size="small" type="button" href='/login' className={classes.loginBtn} variant="contained">
                                <AccountCircle className={classes.leftIcon} />
                                Login
                            </Button>
                        </div>
                    )}
                    {loggedIn && (
                        <div>
                            <IconButton aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopToolbar;
