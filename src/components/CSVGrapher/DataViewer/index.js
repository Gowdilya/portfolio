import React, { useEffect, useState, useRef } from "react";
import './dataViewer.scss';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../Shared/ErrorMessage';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Graph from '../Graph';

export default function DataViewer(props) {
    const [coordinates, setCoordinates] = useState({ rowIndexes: [0, props.data.lines.length - 1], colIndexes: [0, 0] });
    const [coordinateText1, setCoordinateText1] = useState(getColName(coordinates.colIndexes[0] + 1) + (coordinates.rowIndexes[0] + 1));
    const [coordinateText2, setCoordinateText2] = useState(getColName(coordinates.colIndexes[1] + 1) + (coordinates.rowIndexes[1] + 1));
    const [error, setError] = useState({ show: false, message: "" });
    const [viewGraph, setViewGraph] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    // useEffect(()=>{
    //     setCoordinates({  rowIndexes: [0, props.data.lines.length-1] , colIndexes: [1, props.data.lines[0].length]});
    //     setCoordinateText1(getColName(coordinates.colIndexes[0])+(coordinates.rowIndexes[0]+1));
    //     setCoordinateText2(getColName(coordinates.colIndexes[1])+(coordinates.rowIndexes[1]+1));
    //     setError1({show: false, message:""});
    //     setError2({show: false, message:""});
    // }, [props.data]) // Reset Rows Selected on new Data Set


    useEffect(() => {
        setError({ show: false, message: "" })
        if (isValidCoordinate(coordinateText1)) {
            if (isValidCoordinate(coordinateText2)) {
                //valid 
                var [row1, col1] = extractRowAndCol(coordinateText1);
                var [row2, col2] = extractRowAndCol(coordinateText2);
                // Check that Either Row or Columns match... must select only one line of data(vertical/horizontal)
                if (row1 === row2 || col1 === col2) {
                    setCoordinates({ rowIndexes: [row1 - 1, row2 - 1], colIndexes: [col1, col2] });
                    //setCoordinates({rowIndexes:[ coordinates.rowIndexes[0],row2-1], colIndexes:[coordinates.colIndexes[0], ]});
                }
                else {
                    setError({ show: true, message: "ERROR: Please restrict your data to one row or column. Either Charecters or Numbers in the coordinates must be equal." })
                }
            } else {
                //invalid Pattern display error
                setError({ show: true, message: "ERROR: Coordinate 2 must be of valid format [Column Charecter][Row Number]" })
            }
        } else {
            //invalid Pattern display error
            setError({ show: true, message: "ERROR: Coordinate 1 must be of valid format [Column Charecter][Row Number]" })
        }

    }, [coordinateText1, coordinateText2])

    // useEffect(()=>{
    //     if(isValidCoordinate(coordinateText2)){
    //         setError({show: false, message:""})
    //         //valid 
    //         var [row, col] = extractRowAndCol(coordinateText2);
    //         if(row-1 === coordinates.rowIndexes[0]|| col === coordinates.colIndexes[0]){
    //             setCoordinates({rowIndexes:[ coordinates.rowIndexes[0],row-1,], colIndexes:[coordinates.colIndexes[0],col, ]});
    //         }
    //         else{
    //             setError({show: true, message:"ERROR: Please restrict your data to one row or column. Either Charecters or Numbers in the coordinates must be equal."})
    //         }
    //     }else{
    //         //invalid Pattern display error
    //         setError({show: true, message:"ERROR: Coordinate 2 must be of valid format [Column Charecter][Row Number]"})
    //     }
    // },[coordinateText2])

    const isValidCoordinate = (coordinate) => {
        var pattern = /^[a-zA-Z]*\d*$/;
        return !!pattern.test(coordinate);
    }
    const extractRowAndCol = (coordinate) => {
        var row = coordinate.replace(/\D/g, "");
        var char = coordinate;
        char = char.replace(/[0-9]/g, '');
        var col = convertColNametoNum(char);
        return [row, col]
    }

    const handleCoordinate1Change = (event) => {
        setCoordinateText1(event.target.value);
    }

    const handleCoordinate2Change = (event) => {
        setCoordinateText2(event.target.value);
    }

    const generateColumnNames = () => {
        var columns = []
        columns.push(<th key={"empty"}></th>)
        for (let i = 0; i < props.data.lines[0].length; i++) {
            columns.push(<th key={i}>{getColName(i + 1)}</th>)
        }
        return <tr>{columns}</tr>
    }

    function getColName(colNum) { // example: 16384 => "XFD"
        let mostSig = Math.max(0, Math.floor((colNum - 26 - 1) / 26 ** 2));
        let midSig = Math.max(0, Math.floor((colNum - mostSig * 26 ** 2 - 1) / 26));
        let leastSig = colNum - mostSig * 26 ** 2 - midSig * 26;
        return String.fromCharCode(...[mostSig, midSig, leastSig].filter(d => d).map(d => d + 64));
    }

    var convertColNametoNum = function (letter) {
        var val = letter.toUpperCase();
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
            result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }
        return result;
    };

    const graphMode = (bool) =>{
        if(bool){
            extractData();
        }
        setViewGraph(bool);
    }

    const extractData =()=>{
        var extractedData =[]
        if(coordinates.colIndexes[0] === coordinates.colIndexes[1]){
            //col  of data
            if(coordinates.rowIndexes[1] > coordinates.rowIndexes[0]){
                //normal order
                props.data.lines.forEach((line, i)=>{
           
                    if( coordinates.rowIndexes[0] <= i && i <= coordinates.rowIndexes[1]){
                        if(!isNaN(line[coordinates.colIndexes[0]- 1])){
                            extractedData.push(line[coordinates.colIndexes[0]-1]);
                        }else{
                            //handleError
                        }
                    }
                } )
                
            }else{
                //reversed Bounds Indexes
                props.data.lines.forEach((line, i)=>{
                    if( coordinates.rowIndexes[1] <= i && i <= coordinates.rowIndexes[0]){
                        if(!isNaN(line[coordinates.colIndexes[0]-1])){
                            extractedData.push(line[coordinates.colIndexes[0]-1]);
                        }else{
                            //handleError
                        }
                    }
                } )

            }
        }
        else if (coordinates.rowIndexes[0] === coordinates.rowIndexes[1]){
            //row of data
            if(coordinates.colIndexes[1] > coordinates.colIndexes[0]){
                //normal order

                props.data.lines[coordinates.rowIndexes[0]].forEach((entry, i)=>{
                    if( coordinates.colIndexes[0]  <= i + 1 && i + 1 <= coordinates.colIndexes[1]){
                        if(!isNaN(entry)){
                            extractedData.push(entry);
                        }else{
                            //handleError
                        }
                    }
                } )
            }else{
                //reverse order
                props.data.lines[coordinates.rowIndexes[0]].forEach((entry, i)=>{
                    if( coordinates.colIndexes[1] <= i + 1 && i + 1<= coordinates.colIndexes[0]){
                        if(!isNaN(entry)){
                            extractedData.push(entry);
                        }else{
                            //handleError
                        }
                    }
                } )
            } 
        }
        else{
            //one row or one column was not selected...

        }
        setSelectedData(extractedData);
    }

    const displayGraph = () => {
        //pass extracted Data to graph
        return(<><Graph data={selectedData}></Graph></>)
    }

    const displayTable = () =>{
        return(  <div className='table'>
        <TextField id="outlined-basic1" label="Coordinate 1" variant="outlined"
            value={coordinateText1}
            onChange={handleCoordinate1Change}
        />
        <TextField id="outlined-basic2" label="Coordinate 2" variant="outlined"
            value={coordinateText2}
            onChange={handleCoordinate2Change}
        />
        <ErrorMessage show={error.show} errorMessage={error.message} />

        <table >
            <thead >
                {generateColumnNames()}
            </thead>
            <tbody>
                {props.data.lines.map((l, rowIndex) => {
                    return (
                        <tr key={rowIndex} className={(coordinates.rowIndexes[0] <= rowIndex && rowIndex <= coordinates.rowIndexes[1]) || (coordinates.rowIndexes[0] >= rowIndex && rowIndex >= coordinates.rowIndexes[1]) ? "highlight" : ""}>
                            <td>{rowIndex + 1}</td>
                            {l.map((col, j) => {
                                return (
                                    <td key={j} className={(coordinates.colIndexes[0] <= j + 1  && j + 1 <= coordinates.colIndexes[1]) || (coordinates.colIndexes[0] >= j + 1  && j + 1  >= coordinates.colIndexes[1]) ? "highlightcol" : ""}>{col}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
    }

    return (
    <div className="dataViewer">
        <div className="button-row">
            <ButtonGroup disableElevation variant="contained" color="primary">
                <Button onClick={()=> graphMode(false)} variant="contained" disabled={!viewGraph}>
                    Table
                </Button>
                <Button onClick={()=>graphMode(true)} variant="contained" disabled={viewGraph}>
                    Graph
                </Button>
            </ButtonGroup>
        </div>
        <div>
            {viewGraph?displayGraph():displayTable()}
        </div>
      
    </div>)
}