import React, { useEffect, useState, useRef } from "react";
import './dataViewer.scss';
import TextField from '@material-ui/core/TextField';



export default function DataViewer(props) {
    const [coordinates, setCoordinates] = useState({  rowIndexes: [0, props.data.lines.length-1], colIndexes: [1, props.data.lines[0].length] });

    useEffect(()=>{
        setCoordinates({  rowIndexes: [0, props.data.lines.length-1] , colIndexes: [1, props.data.lines[0].length]});
    }, [props.data]) // Reset Rows Selected on new Data Set

    useEffect(() => {
        console.log("start: " + coordinates.rowIndexes[0] );
        console.log("end: " + coordinates.rowIndexes[1]);
        console.log("IS:"+ coordinates.isStartingRow);
    }, [coordinates])

    const handleRowClick = (rowIndex) => {
        // if (coordinates.isStartingRow) {
        //     setCoordinates({  rowIndexes: [rowIndex, coordinates.rowIndexes[1]] })
        // } else {
        //     setCoordinates({ rowIndexes: [coordinates.rowIndexes[0], rowIndex] })
        // }
    }

    // const handleStartChange = (e) =>{
    //     if(0<=e.target.value<=props.data.lines.length-1){
    //         setCoordinates({ isStartingRow: coordinates.isStartingRow, rowIndexes: [e.target.value, coordinates.rowIndexes[1]] })
    //     }
    // }
    // const handleEndChange = (e) =>{
  
    //     if(0<=e.target.value<=props.data.lines.length-1){
    //         setCoordinates({ isStartingRow: coordinates.isStartingRow, rowIndexes: [coordinates.rowIndexes[0], e.target.value] })
    //     }
    // }

    const generateColumnNames = ()=>{
        var columns = []
        columns.push(<th key={"empty"}></th>)
        for (let i = 0; i < props.data.lines[0].length; i ++){
            columns.push(<th key={i}>{getColName(i + 1 )}</th>)
        }
        return <tr>{ columns }</tr>
    }

    function getColName(colNum){ // example: 16384 => "XFD"
        let mostSig = Math.max(0, Math.floor((colNum - 26 - 1)/26**2));
        let midSig = Math.max(0, Math.floor((colNum - mostSig*26**2 - 1)/26));
        let leastSig = colNum - mostSig*26**2 - midSig*26;

        return String.fromCharCode(...[mostSig,midSig,leastSig].filter(d=>d).map(d=>d+64));
    }

    var convertColNametoNum = function(val) {
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
      
        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
          result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }
      
        return result;
    };
    

    return (<div className="dataViewer">
        <TextField id="outlined-basic" label="Coordinate 1" variant="outlined" 
        value={getColName(coordinates.colIndexes[0])+(coordinates.rowIndexes[0]+1)}
         />
        <TextField id="outlined-basic" label="Coordinate 2" variant="outlined" 
        value={getColName(coordinates.colIndexes[1])+(coordinates.rowIndexes[1]+1)}
         />
         {/* <TextField
          onClick={ ()=> setRows({ isStartingRow: true, rowIndexes: [rows.rowIndexes[0], rows.rowIndexes[1]] })}
          inputRef={input => input && rows.isStartingRow==true &&input.focus()}
          id="standard-number"
          label="Starting Index"
          type="number"
          value={rows.rowIndexes[0] + 2}
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
          value={rows.rowIndexes[1] + 2}
          onChange={(e)=>handleEndChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
        /> */}

        <table >
            <thead >
                {/* <tr>
                    <th> Row #</th>
                    {props.data.headers.map((h, i) => {
                        return (<th key={i}>{h}</th>)
                    })}
                </tr> */}
                
                    {generateColumnNames()}
           
            </thead>
            <tbody>
               
                {/* <tr>
                    <td></td>
                    {props.data.headers.map((h, i) => {
                            return (<td key={i}>{h}</td>)
                        })}
                </tr> */}

                {props.data.lines.map((l, rowIndex ) => {
                    return (
                        <tr key={rowIndex}  className={coordinates.rowIndexes[0] <= rowIndex && rowIndex <= coordinates.rowIndexes[1] ? "highlight" : ""}>
                            <td>{rowIndex + 1}</td>
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