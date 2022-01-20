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
    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Employee List
            </Typography>
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
                                        <Button color="secondary" onClick={()=>props.handleDelete(row.id)}><DeleteIcon /></Button>
                                        <Button style={{ color: "green" }} onClick={()=>props.handleEditOpen(row.id)}><EditIcon /></Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default EmployeeList
