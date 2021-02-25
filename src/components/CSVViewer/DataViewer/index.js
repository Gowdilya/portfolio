import React, { useEffect, useState, useRef } from "react";
import './dataViewer.scss';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from './../../Shared/ErrorMessage';




export default function DataViewer(props) {
    const [coordinates, setCoordinates] = useState({  rowIndexes: [0, props.data.lines.length-1], colIndexes: [1, props.data.lines[0].length] });
    const [coordinateText1, setCoordinateText1] = useState(getColName(coordinates.colIndexes[0])+(coordinates.rowIndexes[0]+1) );
    const [coordinateText2, setCoordinateText2] = useState(getColName(coordinates.colIndexes[1])+(coordinates.rowIndexes[1]+1) );
    const [error1, setError1] = useState({show: false, message:""});
    const [error2, setError2] = useState({show: false, message:""});
    useEffect(()=>{
        setCoordinates({  rowIndexes: [0, props.data.lines.length-1] , colIndexes: [1, props.data.lines[0].length]});
    }, [props.data]) // Reset Rows Selected on new Data Set



    useEffect(()=>{
        var pattern = /^[a-zA-Z]*\d*$/; 
        console.log(coordinateText1);
        if(!!pattern.test(coordinateText1)){
            setError1({show: false, message:""})
            //valid Text
            var numb = coordinateText1.replace(/\D/g, "");
            console.log(numb); // 667000

            var char = coordinateText1;
            char = char.replace(/[0-9]/g, '');
            console.log(char);
            var col = convertColNametoNum(char);
            console.log(col);

            setCoordinates({rowIndexes:[numb-1, coordinates.rowIndexes[1]], colIndexes:[col, coordinates.colIndexes[1]]});
        }else{
            //invalid Pattern display error
            setError1({show: true, message:"ERROR: Coordinate 1 must be of valid format [Column Charecter][Row Number]"})
        }

    },[coordinateText1])

    useEffect(()=>{
        var pattern = /^[a-zA-Z]*\d*$/; 
        console.log(coordinateText2);
        if(!!pattern.test(coordinateText2)){
            setError2({show: false, message:""})
            //valid Text
            var numb = coordinateText2.replace(/\D/g, "");
            console.log(numb); // 667000

            var char = coordinateText2;
            char = char.replace(/[0-9]/g, '');
            console.log(char);
            var col = convertColNametoNum(char);
            console.log(col);

            setCoordinates({rowIndexes:[ coordinates.rowIndexes[0],numb-1,], colIndexes:[coordinates.colIndexes[0],col, ]});
        }else{
            //invalid Pattern display error
            setError2({show: true, message:"ERROR: Coordinate 2 must be of valid format [Column Charecter][Row Number]"})
        }

    },[coordinateText2])




    const handleCoordinate1Change = (event) =>{
        console.log(event.target.value);
        setCoordinateText1(event.target.value);
    }

    const handleCoordinate2Change = (event) =>{
        console.log(event.target.value);
        setCoordinateText2(event.target.value);
    }



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

    var convertColNametoNum = function(letter) {
        var val = letter.toUpperCase();
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
          result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }
        return result;
    };
    

    return (<div className="dataViewer">
        <TextField id="outlined-basic1" label="Coordinate 1" variant="outlined" 
        value={coordinateText1}
        onChange={handleCoordinate1Change}
         />
        <TextField id="outlined-basic2" label="Coordinate 2" variant="outlined" 
        value={coordinateText2}
        onChange={handleCoordinate2Change}
         />
         <ErrorMessage show={error1.show} message={error1.message}/>
         <ErrorMessage show={error2.show} message={error2.message}/>
        <table >
            <thead >
                    {generateColumnNames()}
           
            </thead>
            <tbody>
                {props.data.lines.map((l, rowIndex ) => {
                    return (
                        <tr key={rowIndex}  className={(coordinates.rowIndexes[0] <= rowIndex && rowIndex <= coordinates.rowIndexes[1]) ||(coordinates.rowIndexes[0] >= rowIndex && rowIndex >= coordinates.rowIndexes[1])? "highlight" : ""}>
                            <td>{rowIndex + 1}</td>
                            {l.map((col, j) => {
                                return (
                                    <td key={j}  className={(coordinates.colIndexes[0] <= j + 1  && j + 1  <= coordinates.colIndexes[1])||(coordinates.colIndexes[0] >= j + 1  && j + 1  >= coordinates.colIndexes[1])? "highlightcol": ""}>{col}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
}