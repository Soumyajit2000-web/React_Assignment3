import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function EmployeeTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [employeeData, setEmployeeData] = React.useState([
    {name: "Katherine	Langdon", age: 21 , notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    {name: "Harry	Henderson", age: 27 , notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    {name: "Sarah	Parr", age: 28 , notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
    {name: "Dominic	Parr", age: 29 , notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
    {name: "Harry	Avery", age: 30 , notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    {name: "Elizabeth	Hudson", age: 43 , notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
  ])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function handleSubmit(emp:any){
    console.log(emp)
    setEmployeeData((prevEmpData)=>{
      return [
        ...prevEmpData,
        emp
      ]
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Employee List" {...a11yProps(0)} />
          <Tab label="Add New Employee" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EmployeeList employeeData={employeeData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeForm handleSubmit={handleSubmit}/>
      </TabPanel>
    </div>
  );
}