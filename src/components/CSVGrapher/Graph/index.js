import React, { useEffect, useState, useRef } from "react";
import './graph.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';


export default function Graph(props) {
    console.log(props.data);
    const data = props.data.map((value,index)=>({index,value}))
    console.log(data);
    return(
<div className='graph-container'>
        <ResponsiveContainer>
<LineChart

  data={data}
  margin={{
  top: 5, right: 30, left: 20, bottom: 5,
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="index" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="value" stroke="#8884d8"  />
  
</LineChart>
</ResponsiveContainer>
</div>
  
    )
}

Graph.propTypes = {
  data: PropTypes.array
}