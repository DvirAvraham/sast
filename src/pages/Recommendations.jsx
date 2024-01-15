import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import {reportService} from '../services/reportService'


const Recommendations = () => {

    const [rec,setRec] = useState('<p></p>')
    const [recs,setRecs] = useState('[]')

    const get = async()=>{
       const res = await reportService.getRecs({filter:'test'})
       setRecs(res)
    }

    const add = async()=>{
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rec
    const content = tempDiv.innerText
    await reportService.addRec({desc:content})
    }

    const update = async()=>{
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rec
    const content = tempDiv.innerText
    await reportService.updateRec({id:recs[0].id,desc:content})
    }
    const remove = async()=>{
        console.log(recs[recs.length-1].id);
    await reportService.deleteRec({id:recs[recs.length-1].id})
    }

    const editorRef = useRef(null);
    const plugins = [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
    ]
    const toolbar = "undo redo | bold italic | bullist numlist | removeformat | help"

    
    return (
        <center>
            <button onClick={get}>getRecs</button>
        <h3>Recommendations</h3>
        
        <Editor
        apiKey="your-api-key"
        initialValue={rec}
          onEditorChange={(ev) => setRec(ev)}
          // onEditorChange = {(ev)=>setCustom(ev)}
          onInit={(ev, editor) => (editorRef.current = editor)}
          init={{
            height: 200,
            menubar: false,
            plugins,
            toolbar,
            content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          /> 
          <button onClick={add}> Create </button>
          <div>
          <button onClick={update}> Update first </button>
          </div>
          <div>
          <button onClick={remove}> remove last </button>
          </div>
     </center>
    );
};

export default Recommendations;