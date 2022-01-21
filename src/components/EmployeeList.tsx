import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

type EmpType = {
    name: string,
    age: string,
    notes?: string,
    id: number,
}

interface props {
    employeeData: EmpType[],
    handleDelete: any,
    handleEditOpen?: any,
}

const EmployeeList: React.FC<props> = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [rowId, setRowId] = React.useState(0);
    const [alert, setAlert] = React.useState(false);

    const handleClickOpen = (id: any) => {
        setOpen(true);
        setRowId(id);
    };

    const deleteRow = ()=>{
        props.handleDelete(rowId);
        setOpen(false);
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 5000)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Employee List
            </Typography>
            { alert ? <Alert severity="info">Row Deleted</Alert> : null }
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Age</StyledTableCell>
                            <StyledTableCell align="center">Notes</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.employeeData.map((row: any) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.age}</StyledTableCell>
                                <StyledTableCell align="center">{row.notes}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup>
                                        <Button color="secondary" onClick={() => handleClickOpen(row.id)}><DeleteIcon /></Button>
                                        <Button style={{ color: "green" }} onClick={() => props.handleEditOpen(row.id)}><EditIcon /></Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete the row?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete the row permanently!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteRow} color="secondary">
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EmployeeList
