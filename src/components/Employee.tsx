import React from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../App.css';
import EditEmployee from './EditEmployee';

type EmpType = {
    name: string,
    age: string,
    notes?: string,
    id: number,
}

function Employee() {
    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [tempEmployee, setTempEmployee] = React.useState<EmpType>({ name: "", age: "", notes: "", id: 0 })
    const [employeeData, setEmployeeData] = React.useState<EmpType[]>([
        { name: "Katherine Langdon", age: "21", notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", id: 1 },
        { name: "Harry Henderson", age: "27", notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", id: 2 },
        { name: "Sarah Parr", age: "28", notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ", id: 3 },
        { name: "Dominic Parr", age: "29", notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ", id: 4 },
        { name: "Harry Avery", age: "30", notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", id: 5 },
        { name: "Elizabeth Hudson", age: "43", notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", id: 6 },
    ])

    function handleSubmit(emp: any) {
        console.log(emp)
        setEmployeeData((prevEmpData) => {
            return [
                ...prevEmpData,
                emp
            ]
        })
    }

    function handleDelete(id: any) {
        setEmployeeData(employeeData.filter((emp) => emp.id !== id))
    }

    const handleAddOpen = () => {
        setOpen(true);
    };

    const handleAddClose = () => {
        setOpen(false);
    };


    const handleEditClose = () => {
        setEditOpen(false);
        setTempEmployee({ name: "", age: "", notes: "", id: 0 })
    };

    const handleEditOpen = (id: any) => {
        setEditOpen(true);
        employeeData.filter((emp) => {
            if (emp.id === id) {
                setTempEmployee({ name: emp.name, age: emp.age, notes: emp.notes, id: emp.id })
            }
            // return employeeData
        })
    };

    const handleEdit = (emp: any) => {
        // console.log(emp)
        let temp = [...employeeData];
        let update = temp.filter((e)=>{
            if(e.id === emp.id){
                e.name = emp.name
                e.age = emp.age
                e.notes = emp.notes
            }
            return e
        })

        setEmployeeData(update)
        setEditOpen(false);
    }



    return (
        <div className="container">
            <EmployeeList handleEditOpen={handleEditOpen} handleDelete={handleDelete} employeeData={employeeData} />
            <Button variant="outlined" color="primary" onClick={handleAddOpen}>
                Add Employee
            </Button>

            {/* Add Dialog Box */}

            <Dialog open={open} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <DialogContent>
                    <EmployeeForm handleSubmit={handleSubmit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog Box */}

            <Dialog open={editOpen} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
                <DialogContent>
                    <EditEmployee tempEmployee={tempEmployee} handleEdit={handleEdit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Employee;
