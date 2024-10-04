import { useState } from "react";
import "./App.css"

function Todo(){
    const [editing,setEditing]=useState({
        id:"",isEditing:true
    })
    const [list,setList]=useState([])
    const [messagae,setMessage]=useState({
        text:"",
        id:""
    })
    const addItems=(args)=>{
        args.preventDefault()
        let newTodo={
            text:messagae.text,
            id:new Date().getTime().toString()
        }
        setList([...list,newTodo])
        setMessage({
            text:"",id:""
        })
    }
    const changeData=(args)=>{
        setMessage({...messagae,text:args.target.value})
        

    }
    const deletaData=(uniqueid)=>{
        const filterData=list.filter((eachitem)=>{
            return eachitem.id!==uniqueid
        })
        setList(filterData)
    }
    const changeEdit=(id)=>{
        
        setEditing({
            ...editing,id:id,isEditing:false
        })
        let editableItem=list.find((eachitem)=>{
            return eachitem.id===id
        })

        setMessage({...messagae,text:editableItem.text,id:editableItem.id})

    }
    const editItems=(e)=>{
        e.preventDefault()
        let newTodo=list.map((eachitem)=>{
            if (eachitem.id===editing.id){
                return{
                    text:messagae.text,
                    id:messagae.id
                }


            }
            else{
                return eachitem
            }
        })
        setList(newTodo)
        setMessage({
            ...messagae,text:"",id:""
        })
        setEditing({...editing,isEditing:true})



    }
    
    return (
        <div>
            <form>
                <input type="text"
                name="message"
                id="messagae"
                placeholder="Enter Some Text"
                value={messagae.text}
                onChange={changeData}

                />
                {
                    editing.isEditing ? <button onClick={addItems}>ADD</button> :<button onClick={editItems}>Edit</button>

                }
                
                    
                    <hr/>
                    </form>
                
                
                {list.length===0 && <h4>There is no to-dos </h4>}
                <ul>
                {
                                list.map((eachitem)=>{
                                    const {text,id}=eachitem
                                    return (
                                    <li key={id}>
                                        <span>{text}</span>
                                        <button onClick={()=>changeEdit(id)}>edit</button>
                                        <button onClick={()=>deletaData(id)}>Delete</button>

                                    </li>
                                    )
                                })
                            }

                </ul>
                            
                        
                    
                
            
        </div>
    )
}






export default Todo