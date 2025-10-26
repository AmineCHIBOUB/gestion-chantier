import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


export default function TableDetail(props) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1',mt:5 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Plan" value="1" />
            <Tab label="DOCUMENT" value="2" />
            <Tab label="CERTIFICATION " value="3" />
            <Tab label="CR  " value="4" />
            <Tab label="PLANNING PREVISIONNEL  " value="5" />
          </TabList>
        </Box>
        {props.children}
      </TabContext>
    </Box>
  );
}