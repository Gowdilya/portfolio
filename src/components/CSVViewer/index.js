import React, { useEffect, useState, useRef } from "react";
// It's not clear to me how to trigger updates to the UI
const useForceUpdate = () => useState()[1];



export default function CSVViewer() {

    const [file, setFile] = useState(null);

    useEffect(()=>{
        console.log(file);
        if(file){
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            //csv content
            console.log(reader.result);
          };

        reader.onerror = function() {
            console.log(reader.error);
          };
        }

    }, [file])
    const onFileChange = event =>{
        setFile(event.target.files[0]);
    }

    return(<div>
        <div>
    <input type="file" accept=".csv" onChange={onFileChange} /></div>
    </div>)
}