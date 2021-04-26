import React, { useEffect, useState, useRef } from "react";
import DataViewer from './DataViewer';
import Button from '@material-ui/core/Button';

// It's not clear to me how to trigger updates to the UI
const useForceUpdate = () => useState()[1];



export default function CSVGrapher(props) {

    const [file, setFile] = useState(null);
    const [csvParsed, setcsvParsed] = useState(null);  

    useEffect(()=>{
        if(file){
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            //csv content

            processData(reader.result);
          };

        reader.onerror = function() {
            console.log(reader.error);
          };
        }

    }, [file])

    function processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);

        //Simple check if we have valid headers

        var firstLine = allTextLines[0].split(',');
        
        var csvJSON={}
        var lines = [];
        lines.push(firstLine);
    
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == lines[0].length) {
    
                var tarr = [];
                for (var j=0; j<lines[0].length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        // alert(lines);
        //csvJSON.headers = headers;
        csvJSON.lines = lines;
        setcsvParsed(csvJSON);
    }
    const onFileChange = event =>{
        setFile(event.target.files[0]);
    }

    return(<div>
        <div>
        <p>
           Download the example sample_data.csv if you wish to use it:&nbsp; 
  
            <a href='./sample_data.csv' download> Click to Download Template</a>
        </p>
        </div>

        <div>
           Upload a csv to View:
        </div>
        <div>
            <input type="file" accept=".csv" onChange={onFileChange} />
        </div>
        <div>
            {csvParsed?
            <DataViewer data={csvParsed}>

            </DataViewer>:null}
        </div>
            {/* <div className='bottom-button-row'>
                <Button onClick={props.handleBackButton} variant="contained"> Back </Button>
                <Button onClick={props.handleNextButton} variant="contained"> Next </Button>
          </div> */}
    </div>)
}