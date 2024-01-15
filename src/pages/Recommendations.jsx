import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import {reportService} from '../services/reportService'
import Item from '../components/Item'


const Recommendations = () => {

    const [isCreate,SetIsCreate] = useState(false)
    const [newRecDesc,setNewRecDesc] = useState('')
    const [recs,setRecs] = useState([])

    useEffect(()=>{
        fetchRecs()
    },[])

    const fetchRecs = async()=>{
       const res = await reportService.getRecs({filter:'test'})
       setRecs(res)
    }

    const add = async()=>{
    const newRec = await reportService.addRec({desc:newRecDesc})
    setRecs([...recs,newRec])
    }

    const update = async(desc,id)=>{
    const updatedRec = await reportService.updateRec({id,desc})
    const index = recs.findIndex(obj => obj.id === updatedRec.id);

    if (index !== -1) {
      recs[index] = updatedRec;    
    }
    setRecs([...recs])
    }
    const remove = async(id)=>{
    const stat = await reportService.deleteRec({id})
    const updtaedRecs = recs.filter(obj => obj.id !== id);
    stat && setRecs(updtaedRecs)
    }

    return (
        <center>
        <h3>Recommendations</h3>
        {!!recs?.length && <div>
            {recs?.map(rec=>{
                return <Item props={{rec,update,remove}} key={rec.id}/>
            })}
            </div>}
<br/>
<br/>
<br/>
<br/>
            <div><button onClick={()=>SetIsCreate(!isCreate)}>Create Recommendation</button></div>
            {isCreate && <div><input type="text" onInput={(ev)=>setNewRecDesc(ev.target.value)} value={newRecDesc} /> <div><button onClick={add}>Create now</button></div></div>}
     </center>
    );
};

export default Recommendations;