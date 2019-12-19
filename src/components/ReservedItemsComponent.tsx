import React from 'react';
import {ReservedItems} from '../actions/itemAction';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import CircularProgress from '@material-ui/core/CircularProgress'
import FilterListIcon from '@material-ui/icons/FilterList';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            // width: '100%',
            marginBottom: theme.spacing(2),
            padding: theme.spacing(2),
        },
        tableTitle: {
            margin: '1em 0'
        },
        table: {
            // minWidth: 750,
        },
          tableWrapper: {
            overflowX: 'auto',
        },
    }),
);

function ReservedItemsComponent({loading, loggedIn, items, unReserveItem}: {loading: boolean, loggedIn: boolean, items: ReservedItems[], unReserveItem: (itemid: string) => void}): JSX.Element {
    const classes = useStyles({});

    return (
        <Grid item xs={12} lg={6} spacing={1}>
            {loading ? (<CircularProgress/>) : (
                <Paper className={classes.paper}>
                    <Typography variant='h6' className={classes.tableTitle}>Your Reserved Items</Typography>
                    <div className={classes.tableWrapper}>
                        <Table size='small' className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {loggedIn && (<TableCell>UnReserve?</TableCell>)}
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(item => (
                                    <TableRow key={item.name}>
                                        {loggedIn && (
                                        <TableCell>
                                            <Tooltip title="Un-Reserve">
                                                <IconButton aria-label="unreserve" onClick={() => {unReserveItem(item.id.toString())}}>
                                                    <RemoveShoppingCartIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        )}
                                        <TableCell component="th" scope="row">
                                            <Link target="wishlisttab" rel="noreferrer" href={item.url}>{item.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            )}
        </Grid>

    );
}

export default ReservedItemsComponent;
