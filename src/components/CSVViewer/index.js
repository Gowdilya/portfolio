import React, { useEffect, useState, useRef } from "react";
import DataViewer from './DataViewer';

// It's not clear to me how to trigger updates to the UI
const useForceUpdate = () => useState()[1];



export default function CSVViewer() {

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
      

        //var headers = allTextLines[0].split(',');

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
 
        </div>
        <p>
           Download the example template.csv if you wish to use it:&nbsp; 
  
            <a href='./template.csv' download> Click to Download Template</a>
        </p>
        <div>
           Upload a csv to View:
        </div>
        <div>
            <input type="file" accept=".csv" onChange={onFileChange} />
        </div>
        <div>
            {csvParsed?
            <div>
                <p>
                    Type in the coordinates in the format [charecter][number] to highlight the corresponing table cells.
                </p>
                <p>
                    (By default all cells are selected)
                </p>
            <DataViewer data={csvParsed}>

            </DataViewer></div>:null}
        </div>
    </div>)
}