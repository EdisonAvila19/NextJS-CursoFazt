'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NewPage({ params }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  useEffect(() => {
    if (!params.id) return
    fetch(`/api/tasks/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title)
        setDescription(data.description)
      })
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      })
      const data = await res.json()
      console.log(data)

    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      })
      const data = await res.json()
      console.log(data)

    }

    router.refresh()
    router.push('/')
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/tasks/${params.id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    router.refresh()
    router.push('/')
  }
  
  return (
    <div className='flex items-center justify-center h-screen'>
      <form className='p-10 lg:w-1/4 md:w-1/2 bg-slate-800' onSubmit={handleSubmit}>
      
        <label htmlFor="title" className='text-sm font-bold'>Título</label>
        <input 
          type="text" 
          id='title' 
          placeholder='Título' 
          onChange={(e) => setTitle(e.target.value)}
          value={title} 
          className='w-full p-2 mb-4 text-black border border-gray-400'/>

        <label htmlFor="description" className='text-sm font-bold'>Descripción de la tarea</label>
        <textarea 
          rows = "3" 
          id = 'description' 
          placeholder = 'Describe tu tarea'
          onChange = {(e) => setDescription(e.target.value)}
          value = {description}
          className = 'w-full p-2 mb-4 text-black border border-gray-400'></textarea>
        
        <div className='flex justify-between'>
          <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
            { params.id ? 'Update' : 'Create' }
          </button>
          {
            params.id && (
              <button 
                className='px-4 py-2 ml-4 font-bold text-white bg-red-500 rounded hover:bg-red-700'
                type='button'
                onClick={handleDelete}
              >Delete</button>
            )
          }
        </div>
      </form>
    </div>
  )
}
