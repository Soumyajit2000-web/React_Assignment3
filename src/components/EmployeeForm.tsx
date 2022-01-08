import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

type EmpType = { 
    name: string , 
    age: string, 
    notes?: string 
}

interface props{
    handleSubmit(employee:EmpType): any,
}

const EmployeeForm : React.FC<props> = (props) => {
    const classes = useStyles();
    const [employee, setEmployee] = useState<EmpType | any>({name: "", age: "", notes: ""});
    const [err, setError] = useState<boolean>(false)

    const handleOnChange = (e:any) =>{
        setEmployee((prevEmployee:EmpType)=>{
            return {
                ...prevEmployee,
                [e.target.name]: e.target.value,
            }
        });
    }

    function handleForm(){
        if(employee.name !== "" && employee.age !== ""){
            props.handleSubmit(employee)
            setError(false);
        } else {
            setError(true);
        }
    }

    console.log(err)

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Add New Employee
            </Typography>
            <form className={classes.root}>

                <div>
                    <TextField
                        name="name"
                        error={err? true : false}
                        required
                        // id={error? "outlined-error-helper-text" : "outlined-required"}
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                        helperText={err? "Required" : ""}
                        onChange={handleOnChange}
                    />
                    <TextField
                        name="age"
                        error={err? true : false}
                        id="outlined-number"
                        label="Age"
                        type="number"
                        onChange={handleOnChange}
                        helperText={err? "Required" : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField 
                        name ="notes"
                        id="outlined-basic" 
                        label="Notes" 
                        variant="outlined" 
                        onChange={handleOnChange}

                    />

                </div>
            </form>
            <Button onClick={handleForm} variant="contained" color="secondary" >Submit</Button>

        </>
    )


}

export default EmployeeForm
