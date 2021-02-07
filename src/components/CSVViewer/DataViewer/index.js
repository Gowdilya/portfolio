import React, { useEffect, useState, useRef } from "react";
import './dataViewer.scss';



export default function DataViewer(props) {
    console.log(props.data)
 return(<div className="dataViewer">
     <table >
         <thead >
     <tr>
         <th> Row #</th>
    {props.data.headers.map((h, i)=>{
        return(<th key={i}>{h}</th>)
    })}
  </tr>
  </thead>
  <tbody>
      
  {props.data.lines.map((l, i)=>{
      return(
        <tr key={i}>
            <td>{i}</td>
            {l.map((col, i)=>{
                return(
                    <td key={i}>{col}</td>
                )
            })}
        </tr>
        )
    })}
  </tbody>
</table>
 </div>)
}