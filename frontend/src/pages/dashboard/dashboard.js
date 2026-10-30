import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip ,ResponsiveContainer, Bar, Rectangle, Sector, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Grid } from '@mui/material';
import axios from 'axios';
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
    </g>
  );
};
const Dashboard = () => {
  const [counterchantier,setcounterchantier] = useState()

  useEffect(()=>{
    axios.get('http://localhost:9090/chantier/counter')
    .then((res)=>{
      setcounterchantier([{name: 'Chantier Over', value: res.data.overt},{ name: 'Chantier Fermer', value: res.data.fermer },])
    })
  },[])
  // Sample data for the pie charts
  const data1 = [
    { name: 'Affecter', value: 400 },
    { name: 'Non Affecté', value: 300 },
    { name: 'Congé', value: 100 },
  ];

  const data2 = [
    { name: 'Chantier Over', value: 200 },
    { name: 'Chantier Fermer', value: 100 },
  ];
  const data = [
    {
      name: '2023-11-01',
      affecter: 4000,
      "Non affecter": 2400,
      amt: 2400,
    },
    {
      name: '2023-12-01',
      affecter: 3000,
      "Non affecter": 1398,
      amt: 2210,
    },
    {
      name: '2024-01-01',
      affecter: 2000,
      "Non affecter": 9800,
      amt: 2290,
    },
    {
      name: '2024-02-01',
      affecter: 2780,
      "Non affecter": 3908,
      amt: 2000,
    },
    {
      name: '2024-03-01',
      affecter: 1890,
      "Non affecter": 4800,
      amt: 2181,
    },
    {
      name: '2024-04-01',
      affecter: 2390,
      "Non affecter": 3800,
      amt: 2500,
    },
    {
      name: '2024-05-01',
      affecter: 3490,
      "Non affecter": 4300,
      amt: 2100,
    },
  ];
  // Custom colors for the pie slices
  const COLORS = ['#4b4dbf', '#914bbf', '#bf4bbb', '#00C49F', '#FF1493'];


  
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const onPieEnter2 = (_, index) => {
    setActiveIndex2(index);
  };
  return (
    <Grid sx={{display:"flex",justifyContent:"space-around",textAlign:"center",flexWrap:"wrap"}} >
      <Grid width="45%" sx={{background:"#fff",borderRadius:10}}>
      <h3>Etat de Colaborateur</h3>
      <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data1}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          onMouseEnter={onPieEnter}
        > 
        {data1.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}</Pie>
      </PieChart>
    </ResponsiveContainer>
      </Grid>
      <Grid width="45%" height="40%" sx={{background:"#fff",borderRadius:10,textAlign:"center"}}>
        <h3>Etat De Chantier</h3>
        <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          activeIndex={activeIndex2}
          activeShape={renderActiveShape}
          data={counterchantier}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          onMouseEnter={onPieEnter2}
        > 
        {data2.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}</Pie>
      </PieChart>
    </ResponsiveContainer>
      </Grid>
      <Grid width="95%" height="55%" sx={{background:"#fff",borderRadius:10,textAlign:"center",marginTop:5}}>
        <h3>Etat Colaborateur Par mois</h3>
        <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Non affecter" fill="#eb0004" activeBar={<Rectangle fill="#eb0004" stroke="#eb0004" />} />
          <Bar dataKey="affecter" fill="#5ebf4b" activeBar={<Rectangle fill="#5ebf4b" stroke="#5ebf4b" />} />
        </BarChart>
      </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
