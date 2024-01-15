import { authService } from './services/reportService'
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
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    project: '',
    date: Date.now(),
    company: '',
    limitations: '',
    summary: '',
    selectedTools: {
      semgrep: false,
      bearer: false,
      snyk: { checked: false, authToken: '' },
    },
  });


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      // Handling checkboxes
      setFormData(prevState => ({
        ...prevState,
        selectedTools: {
          ...prevState.selectedTools,
          [name]: name === 'snyk' ? { ...prevState.selectedTools.snyk, checked: checked } : checked,
        },
      }));
    } else {
      // Handling text inputs and textareas
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAuthTokenChange = (event) => {
    const { value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      selectedTools: {
        ...prevState.selectedTools,
        snyk: { ...prevState.selectedTools.snyk, authToken: value },
      },
    }));
  };

  // const setEditorData = (ev, type) => {
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = ev
  //   const content = tempDiv.innerText
  //   switch (type) {
  //     case 'limit':
  //       setLimit(content)
  //       break;
  //     case 'summary':
  //       setSummary(content)
  //       break;
  //     case 'custom':
  //       setCustom(content)
  //       break;

  //     default:
  //       break;
  //   }
  // };


  // const create = async () => {
  //   const data = {
  //     limit,
  //     summary,
  //     custom,
  //     project,
  //     company,
  //     date,
  //   }

  //   console.log(data, 'data');
  //   const res = await authService.createReport(data)
  //   console.log(res, 'res');
  // }

  const create = async () => {
    // Assemble the data
    const reportData = {
      ...formData,
      tools: Object.entries(formData.selectedTools)
        .filter(([key, value]) =>
          typeof value === 'object' ? value.checked : value
        )
        .map(([key, value]) => {
          // If the tool has additional data (like auth token), include it
          if (typeof value === 'object') {
            return { tool: key, ...value };
          }
          return { tool: key };
        }),
    };

    console.log(reportData, 'data');

    try {
      const res = await authService.createReport(reportData);
      console.log(res, 'res');
      // Handle success - e.g., show a success message, clear the form, etc.
    } catch (error) {
      console.error('Error creating report:', error);
      // Handle error - e.g., show an error message
    }
  };


  return (
    <React.Fragment >
      <div className={darkMode ? 'dark' : ''}>
        <div className=' app bg-white dark:bg-slate-900 flex '>

          <div className="w-full max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <form className="w-full flex gap-6	" onSubmit={(e) => { e.preventDefault(); create(); }}>

              <div className='w-full form-left'>

                <div className="mb-5">
                  <label htmlFor="project" className="block mb-2 text-s font-medium text-gray-900 dark:text-white">Project Name</label>
                  <input type="text"
                    name="project"
                    value={formData.project}
                    onInput={handleInputChange}
                    required
                    id="project" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SAST Project" />
                </div>

                <div className="mb-5">
                  <label htmlFor="date" className="block mb-2 text-s font-medium text-gray-900 dark:text-white">Date</label>
                  <input type="date"
                    name="date"
                    value={formData.date}
                    onInput={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <div className="mb-5">
                  <label htmlFor="company" className="block mb-2 text-s font-medium text-gray-900 dark:text-white">Company Name</label>
                  <input
                    name="company"
                    value={formData.company}
                    onInput={handleInputChange}
                    type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Thomson Reuters" required />
                </div>

                <div className="mb-5">
                  <label htmlFor="limitations" className="block mb-2 text-s font-medium text-gray-900 dark:text-white">Limitations</label>
                  <textarea
                    name="limitations"
                    value={formData.limitations}
                    onInput={handleInputChange}
                    id="limitations" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Limitations..."></textarea>
                </div>

                <div className="mb-5">
                  <label htmlFor="summary" className="block mb-2 text-s font-medium text-gray-900 dark:text-white">Summary of Findings</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onInput={handleInputChange}
                    id="summary" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Summary of Findings..."></textarea>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-s w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

              </div>

              <div className='w-full form-right'>

                <div className="mb-5 w-full">
                  <label htmlFor="tools" class="block mb-2 text-s font-medium text-gray-900 dark:text-white">Select Tools For Scan</label>
                  <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                        <input id="semgrep"
                          name="semgrep"
                          checked={formData.selectedTools.semgrep}
                          onChange={handleInputChange}
                          type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="semgrep" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semgrep</label>
                      </div>
                    </li>
                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                        <input id="bearer" type="checkbox" 
                          name="bearer"
                          checked={formData.selectedTools.bearer}
                          onChange={handleInputChange}
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="bearer" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bearer</label>
                      </div>
                    </li>
                    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                        <input
                          name="snyk"
                          checked={formData.selectedTools.snyk.c}
                          onChange={handleInputChange}
                          id="snyk"
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="snyk" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Snyk</label>
                      </div>
                      {formData.selectedTools.snyk.checked && (<input type="text" value={formData.selectedTools.snyk.authToken}
                        onChange={handleAuthTokenChange}
                        required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Auth Token..." />)}
                    </li>
                  </ul>
                </div>

              </div>
            </form>
          </div>

          {/* <form classname="w-full max-w-lg">
        <div classname="flex flex-wrap -mx-3 mb-6">
        <div classname="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label classname="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
        </label>
        <input classname="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
        <p classname="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <h3>Project Name</h3>
        <input type="text" onInput={(ev) => { setProject(ev.target.value) }} />
        <h3>Company</h3>
        <input type="text" onInput={(ev) => { setCompany(ev.target.value) }} />
        <h3>Date</h3>
        <input type="date" onInput={(ev) => { setDate(ev.target.value) }} />
        <h3>Limitations</h3>
        <Editor
        apiKey="your-api-key"
        onEditorChange={(ev) => setEditorData(ev, 'limit')}
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
        onEditorChange={(ev) => setEditorData(ev, 'summary')}
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
          onEditorChange={(ev) => setEditorData(ev, 'custom')}
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
          <button onClick={() => create()}> Create Project</button>
          </div>
        </form > */}
        </div>

      </div>
    </React.Fragment>
  )
}

export default App
