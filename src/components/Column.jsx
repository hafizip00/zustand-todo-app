import React, { useMemo, useState } from 'react'
import { useStore } from '../store'
import { shallow } from 'zustand/shallow'
import ClassNames from 'classnames'
import "./Column.css"
import Task from './Task'
const Column = ({ state }) => {

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)
    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state),
        shallow
    )
    const AddTask = useStore((store) => store.addTask)
    const setDraggetTask = useStore((store) => store.setDraggetTask)
    const draggedTask = useStore((store) => store.draggedTask)
    const moveTask = useStore((store) => store.moveTask)

    return (
        <div className={ClassNames('column', { drop: drop })} onDragOver={(e) => {
            setDrop(true)
            e.preventDefault()
        }}
            onDragLeave={(e) => {
                setDrop(false)
                e.preventDefault()
            }}
            onDrop={() => {
                setDrop(false)
                moveTask(draggedTask, state)
                setDraggetTask(null)
            }}
        >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => { setOpen(true) }}>Add</button>
            </div>
            {tasks.map(task => {
                return <Task title={task.title} key={task.title} />
            })}
            {open && <div className="Modal">
                <div className="modalContent">
                    <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
                    <button onClick={() => {
                        AddTask(text, state)
                        setText("")
                        setOpen(false)
                    }}>Submit</button>
                    <button onClick={() => {
                        setOpen(false)
                        setText("")
                    }}>Cancel</button>
                </div>
            </div>}
        </div>
    )
}

export default Column