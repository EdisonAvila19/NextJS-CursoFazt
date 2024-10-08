import TaskCard from '@/components/TaskCard'

async function LoadTasks() {
  const resp = await fetch('http://localhost:3000/api/tasks')
  const data = await resp.json()
  return data.tasks
}

async function HomePage() {

  const tasks = await LoadTasks()

  return (
    <section className='container mx-auto'>
      <div className='grid grid-cols-3 gap-3 mt-10'>
        {
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        }
      </div>
    </section>
  )
}

export default HomePage
