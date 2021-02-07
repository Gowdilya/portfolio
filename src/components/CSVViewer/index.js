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
        var headers = allTextLines[0].split(',');
        var csvJSON={}
        var lines = [];
    
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
    
                var tarr = [];
                for (var j=0; j<headers.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        // alert(lines);
        csvJSON.headers = headers;
        csvJSON.lines = lines;
        setcsvParsed(csvJSON);
    }
    const onFileChange = event =>{
        setFile(event.target.files[0]);
    }

    return(<div>
        <div>
            Please select a csv such that the first row is the column headers:
        </div>
        <div>
           Download the example template to see the format:
        </div>
        <div>
            <a href='./template.csv' download>Click to Download Template</a>
        </div>
        <div>
           Upload Template to View:
        </div>
        <div>
            <input type="file" accept=".csv" onChange={onFileChange} />
        </div>
        <div>
            {csvParsed?
            <DataViewer data={csvParsed}>

            </DataViewer>:null}
        </div>
    </div>)
}