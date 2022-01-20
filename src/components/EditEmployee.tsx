import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

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
    notes?: string,
    id: number, 
}

interface props{
    handleEdit(employee:EmpType): any,
    tempEmployee: EmpType,
}

function EditEmployee(props: props) {
    const classes = useStyles();
    const [employee, setEmployee] = useState<EmpType | any>({name: "", age: "", notes: "", id: 0});
    const [err, setError] = useState<boolean>(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false)

    useEffect(()=>{
        setEmployee(props.tempEmployee)
    }, [])

    const handleOnChange = (e:any) =>{
        setEmployee((prevEmployee:EmpType)=>{
            return {
                ...prevEmployee,
                [e.target.name]: e.target.value,
            }
        });
    }

    function handleForm(){
        setEmployee((prevEmployee:EmpType)=>{
            return {
                ...prevEmployee,
                id: Math.random()*1000,
            }
        });
        if(employee.name !== "" && employee.age !== ""){
            props.handleEdit(employee)
            setError(false);
            setIsSubmitSuccess(true)
            setTimeout(()=>{
                setIsSubmitSuccess(false)
            }, 5000)
        } else {
            setError(true);
        }
    }

    console.log(err)

    return (
        <>
            { isSubmitSuccess? <Alert severity="success">Form Updated</Alert>: null }
            { err? <Alert severity="error">Please fill the required data! </Alert>: null }
            <form className={classes.root}>

                <div>
                    <TextField
                        name="name"
                        error={err? true : false}
                        required
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                        value={employee.name}
                        helperText={err? "Required" : ""}
                        onChange={handleOnChange}
                    />
                    <TextField
                        name="age"
                        error={err? true : false}
                        id="outlined-number"
                        label="Age"
                        type="number"
                        value={employee.age}
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
                        value={employee.notes}
                        onChange={handleOnChange}
                    />

                </div>
            </form>
            <Button onClick={handleForm} variant="contained" color="secondary" >Submit</Button>
        </>
    )
}

export default EditEmployee;
