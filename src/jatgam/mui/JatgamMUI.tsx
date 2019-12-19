import {createMuiTheme, MuiThemeProvider, CssBaseline} from '@material-ui/core';
import { create } from 'jss';
import React, { Component } from 'react';
import {JssProvider} from 'react-jss';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import jssPreset from '@material-ui/styles/jssPreset';
import black from './colors/black';
import blue from './colors/blue';
import green from './colors/green';
import grey from './colors/grey';
import orange from './colors/orange';
import purple from './colors/purple';
import red from './colors/red';
import white from './colors/white';
import yellow from './colors/yellow';


const theme = createMuiTheme({
    typography: {
        fontFamily: 'Gotham_Book, Robot, sans-serif, serif',
        // useNextVariants: true,
      },
      palette: {
        // common: {
        //   black: black[500],
        //   white: white[500],
        // },
        // background: {
        //   default: white[500],
        // },
        // primary: {
        //   main: black[500],
        // //   hover: black[700],
        //   light: black[200],
        //   contrastText: white[500],
        // },
        // secondary: {
        //   main: grey[100],
        // //   hover: grey[700],
        //   contrastText: black[500],
        // },
        // // accent: {
        // //   contrastText: black[500],
        // // },
        // error: {
        //   main: red[500],
        // //   hover: red[700],
        //   contrastText: white[500],
        // },
        // warm: {
        //   main: orange[500],
        //   hover: orange[700],
        //   contrastText: black[500],
        // },
        // warning: {
        //   main: '#f8e71c',
        //   hover: yellow[700],
        //   contrastText: black[500],
        // },
        // success: {
        //   main: '#7ae900',
        //   hover: green[700],
        //   contrastText: black[500],
        // },
        // info: {
        //   main: blue[500],
        //   hover: blue[700],
        //   contrastText: black[500],
        // },
        // grape: {
        //   main: purple[500],
        //   hover: purple[700],
        //   contrastText: white[500],
        // },
      },
    //   overrides: {
    //     MuiRadio: {
    //       colorSecondary: {
    //         '&$checked': {
    //           color: black[500],
    //         },
    //       },
    //     },
    //     MuiCheckbox: {
    //       colorSecondary: {
    //         '&$checked': {
    //           color: black[500],
    //         },
    //       },
    //     },
    //     MuiSwitch: {
    //       colorSecondary: {
    //         '&$checked': {
    //           color: black[500],
    //         },
    //       },
    //       iconChecked: {
    //         backgroundColor: black[400],
    //       },
    //     },
    //     MuiListItem: {
    //       container: {
    //         borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    //         paddingBottom: '.75em',
    //         marginBottom: '.75em',
    //       },
    //     },
    //     MuiTablePagination: {
    //       caption: {
    //         color: '#000000',
    //       },
    //       select: {
    //         fontSize: '12px',
    //       },
    //       selectIcon: {
    //         top: 'auto',
    //         verticalAlign: 'middle',
    //         fontSize: '14px',
    //         color: '#000000',
    //       },
    //       actions: {
    //         fontSize: '14px',
    //       },
    //       toolbar: {
    //         minHeight: '45px',
    //         height: '45px',
    //         padding: '0px',
    //       },
    //     },
    //     // MuiPickersModal: {
    //     //   dialogRoot: {
    //     //     minWidth: '350px',
    //     //   },
    //     //   dialog: {
    //     //     minWidth: '350px',
    //     //   },
    //     // },
    //     MuiTableRow: {
    //       head: {
    //         height: '35px',
    //       },
    //     },
    //     MuiTableCell: {
    //       root: {
    //         padding: '10px',
    //       },
    //       head: {
    //         padding: '0px',
    //         verticalAlign: 'middle',
    //       },
    //       body: {
    //         paddingTop: '15px',
    //         verticalAlign: 'top',
    //         fontSize: '12px',
    //       },
    //       paddingCheckbox: {
    //         padding: '0px',
    //         paddingTop: '15px',
    //         paddingLeft: '15px',
    //       },
    //     },
    //     MuiTableSortLabel: {
    //       root: {
    //         color: '#FFFFFF',
    //       },
    //       icon: {
    //         color: '#FFFFFF',
    //       },
    //       active: {
    //         color: '#FFFFFF',
    //         backgroundColor: '#464646',
    //         width: '100%',
    //         height: '100%',
    //       },
    //     },
    //     MuiSvgIcon: {
    //       root: {
    //         fontSize: '18px',
    //       },
    //     },
    //   },
    //   props: {
    //     MuiTableSortLabel: {
    //       color: '#FFFFFF',
    //     },
    //   },
});

const jss = create(jssPreset());

const JatgamMUI = (Component:any ) => {
    const jatgamMUI = (props:any ) => {
        return (
            <JssProvider jss={jss} classNamePrefix='jatgam'>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...props} />
                </MuiThemeProvider>
            </JssProvider>
        );
    };
    return jatgamMUI;
};

export default JatgamMUI;
