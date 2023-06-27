import { create } from "zustand"
import { persist, devtools } from 'zustand/middleware'

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => set((store) =>
        ({ tasks: [...store.tasks, { title: title, state: state }] })),
    removeTask: (title) => set((store) => ({ tasks: store.tasks.filter(t => t.title !== title) })),
    setDraggetTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) => set((store) => ({ tasks: store.tasks.map(task => task.title === title ? { title, state } : task) }))

})



export const useStore = create(persist(devtools(store), {
    name: 'store',
}))