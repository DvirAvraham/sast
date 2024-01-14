import {authService} from './services/reportService'
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";



function App() {

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
  const toolbar = "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"

  const [limit, setLimit] = useState('')
  const [summary, setSummary] = useState('')
  const [custom, setCustom] = useState('')
  const [project, setProject] = useState('')
  const [company, setCompany] = useState('')
  const [date, setDate] = useState(Date.now())

  const setEditorData = (ev, type) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = ev
      const content = tempDiv.innerText 
      switch (type) {
        case 'limit':
          setLimit(content)
          break;
        case 'summary': 
          setSummary(content)
          break;
        case 'custom':
          setCustom(content)          
          break;
      
        default:
          break;
      }
      };

      useEffect(()=>{
      },[])
  const create = async () =>{
    const data = {
      limit,
summary,
custom,
project,
company,
date,
    }
    const res = await authService.createReport(data)
    console.log(res,'res');
  }

  return (
    <>
    <div className='flex'>

    <h3>Project Name</h3>
    <input type="text" onInput={(ev)=>{setProject(ev.target.value)}} />
    <h3>Company</h3>
    <input type="text" onInput={(ev)=>{setCompany(ev.target.value)}}/>
    <h3>Date</h3>
    <input type="date" onInput={(ev)=>{setDate(ev.target.value)}}/>
    <h3>Limitations</h3>
 <Editor
        apiKey="your-api-key"
        onEditorChange = {(ev)=>setEditorData(ev, 'limit')}
        // onEditorChange = {(ev)=>setLimit(ev)}
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
          <h3>Summary</h3>
 <Editor
        apiKey="your-api-key"
        onEditorChange = {(ev)=>setEditorData(ev, 'summary')}
        // onEditorChange = {(ev)=>setSummary(ev)}
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
                <h3>Custom</h3>

 <Editor
        apiKey="your-api-key"
        onEditorChange = {(ev)=>setEditorData(ev, 'custom')}
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
</div>
<button onClick={()=>create()}> Create Project</button>
    </>
  )
}

export default App
