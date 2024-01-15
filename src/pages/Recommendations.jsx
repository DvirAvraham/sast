import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import {reportService} from '../services/reportService'


const Recommendations = () => {

    const [rec,setRec] = useState('')
    const [recs,setRecs] = useState('[]')

    useEffect(()=>{
        fetchRecs()
    },[])

    const fetchRecs = async()=>{
       const res = await reportService.getRecs({filter:'test'})
       setRecs(res)
    }

    const add = async()=>{
    const newRec = await reportService.addRec({desc:rec})
    setRecs([...recs,newRec])
    }

    const update = async()=>{
    const updatedRec = await reportService.updateRec({id:recs[0].id,desc:rec})
    const index = database.findIndex(obj => obj.id === updatedRec.id);

    if (index !== -1) {
      recs[index] = updatedRec;    
    }
    }
    const remove = async()=>{
    const id = recs[recs.length-1].id
    const stat = await reportService.deleteRec({id:recs[recs.length-1].id})
    const updtaedRecs = recs.filter(obj => obj.id !== id);
    stat && setRecs(updtaedRecs)
    }

    return (
        <center>
        <h3>Recommendations</h3>
        <input onInput={(ev)=>setRec(ev.target.value)} value={rec}></input>
          <div>
          <button onClick={add}> Create </button>
          </div><div>
          <button onClick={update}> Update first </button>
          </div>
          <div>
          <button onClick={remove}> remove last </button>
          </div>
     </center>
    );
};

export default Recommendations;