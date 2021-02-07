import React, { Component } from "react";
import './GowResume.css';
var __html = require('./html.js');
var template = { __html: __html };


export default function Resume() {
    return(<div>
       <div className="screen-share">
        <span dangerouslySetInnerHTML={template} />
      </div>
    </div>)
}
