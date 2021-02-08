import React, { useEffect, useState, useRef } from "react";
import './dataViewer.scss';
import TextField from '@material-ui/core/TextField';



export default function DataViewer(props) {
    const [rows, setRows] = useState({ isStartingRow: true, rowIndexes: [0, props.data.lines.length-1] });


    useEffect(() => {
        console.log("start: " + rows.rowIndexes[0]);
        console.log("end: " + rows.rowIndexes[1]);
        console.log("IS:"+ rows.isStartingRow);
    }, [rows])

    const handleRowClick = (rowIndex) => {
        if (rows.isStartingRow) {
            setRows({ isStartingRow: false, rowIndexes: [rowIndex, rows.rowIndexes[1]] })
        } else {
            setRows({ isStartingRow: true, rowIndexes: [rows.rowIndexes[0], rowIndex] })
        }
    }

    const handleStartChange = (e) =>{
        if(0<=e.target.value<=props.data.lines.length-1){
            setRows({ isStartingRow: rows.isStartingRow, rowIndexes: [e.target.value, rows.rowIndexes[1]] })
        }
    }
    const handleEndChange = (e) =>{
  
        if(0<=e.target.value<=props.data.lines.length-1){
            setRows({ isStartingRow: rows.isStartingRow, rowIndexes: [rows.rowIndexes[0], e.target.value] })
        }
    }


    return (<div className="dataViewer">
         <TextField
          onClick={ ()=> setRows({ isStartingRow: true, rowIndexes: [rows.rowIndexes[0], rows.rowIndexes[1]] })}
          inputRef={input => input && rows.isStartingRow==true &&input.focus()}
          id="standard-number"
          label="Starting Index"
          type="number"
          value={rows.rowIndexes[0]}
          onChange={(e)=>handleStartChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />
         <TextField
          onClick={ ()=>  setRows({ isStartingRow: false, rowIndexes: [rows.rowIndexes[0], rows.rowIndexes[1]] }) }
          inputRef={input => input && rows.isStartingRow==false &&input.focus()}
          id="standard-number"
          label="Ending Index"
          type="number"
          value={rows.rowIndexes[1]}
          onChange={(e)=>handleEndChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <table >
            <thead >
                <tr>
                    <th> Row #</th>
                    {props.data.headers.map((h, i) => {
                        return (<th key={i}>{h}</th>)
                    })}
                </tr>
            </thead>
            <tbody>

                {props.data.lines.map((l, rowIndex) => {
                    return (
                        <tr key={rowIndex} onClick={() => handleRowClick(rowIndex)} className={rows.rowIndexes[0] <= rowIndex && rowIndex <= rows.rowIndexes[1] ? "highlight" : ""}>
                            <td>{rowIndex}</td>
                            {l.map((col, j) => {
                                return (
                                    <td key={j} >{col}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
}