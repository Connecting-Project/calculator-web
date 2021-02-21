import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Standard from './component/Standard';
import Campaign from './component/Campaign';
import Salary from './component/Salary';
import Career from './component/Career';
import Pyeong from './component/Pyeong';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="표준 계산기" {...a11yProps(0)} />
          <Tab label="전역일 계산기" {...a11yProps(1)} />
          <Tab label="연봉 계산기" {...a11yProps(2)} />
          <Tab label="경력 계산기" {...a11yProps(3)} />
          <Tab label="평, ㎡ 계산기" {...a11yProps(4)} />

        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
          <Standard />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Campaign />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <Salary />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <Career />
      </TabPanel>
      <TabPanel value={value} index={4}>
          <Pyeong />
      </TabPanel>
    </div>
  );
}

export default App;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}