import classNames from 'classnames'
import React from 'react'
import { useStore } from '../store'
import trash from '../assets/trash-2.svg'
import "./Task.css"
const Task = ({ title }) => {

    const task = useStore(store => store.tasks.find(task => task.title === title))
    const removeTask = useStore(store => store.removeTask)
    const setDraggetTask = useStore(store => store.setDraggetTask)
    return (
        <div className='task' draggable onDragStart={() => setDraggetTask(task.title)}>
            <div>{task.title}</div>
            <div className='botoomWrapper'>
                <div><img src={trash} alt="Trash" onClick={() => removeTask(task.title)} /></div>
                <div className={classNames('status', task.state)}>{task.state}</div>
            </div>
        </div>
    )
}

export default Task