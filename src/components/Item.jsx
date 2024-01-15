import React, { useEffect, useRef, useState } from "react";

function Item({props}) {


    const [rec,setRec] = useState(props.rec.desc)


    return (
        <>
    <h2>{props.rec.desc}</h2>
    <input onInput={(ev)=>setRec(ev.target.value)} value={rec}></input>
    <div>
    <button onClick={()=>props.update(rec,props.rec.id)} >update</button>
    </div>
    <div>
    <button onClick={()=>props.remove(props.rec.id)} >Remove</button>
    </div>
    </>
    )}
  
  export default Item;