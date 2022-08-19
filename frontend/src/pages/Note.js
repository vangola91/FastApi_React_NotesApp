import React, {useState, useEffect} from 'react'
import {useParams, Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'


//let dummyData = [{"id":"1", "body":"Get milk"}, {"id":"2", "body":"Wash car" }, {"id":"3", "body": "Start coding"}]

const Note = ({match}) => {
  let params = useParams()
  let navigate = useNavigate()
  let noteId = params.id

  //let foundNote = dummyData.find((note) => note.id === noteId)

  let [note, setNote] = useState(null)

  useEffect(() => {
      if (noteId !== 'add') getNote()
  }, [noteId])


  let getNote = async () => {
      let response = await fetch(`/notes/${noteId}`)
      let data = await response.json()
      setNote(data)
  }

let submitData = async (e) => {
      e.preventDefault()

    let url = '/notes'
    let method = 'POST'

    if(noteId !== 'add'){
      url = `/notes/${noteId}`
      method = 'PUT'
    }

    await fetch(url, {
          method:method,
          headers:{
              'Content-Type':'application/json',
          },
           body:JSON.stringify({"body":note.body})
      })

     navigate('/')
  }
    let deleteNote = async (e) => {
      e.preventDefault()
        await fetch(`/notes/${noteId}`,{
        method:'DELETE'
    })

        navigate('/')
}

return (
    <div className="note">
      <div className='note-header'>
        <h3>
            <Link to="/">
                <ArrowLeft />
            </Link>
        </h3>

        {noteId !== 'add' && <button onClick={deleteNote}>Delete</button>}
      </div>

      <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value}) }} placeholder="Edit note" value={note?.body} required></textarea>

      <div onClick={submitData} className="floating-button">
            <SaveIcon  />
        </div>
    </div>
  )
}
export default Note