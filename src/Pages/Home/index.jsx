import { useEffect, useRef, useState } from 'react'
import './index.scss'
import axios from 'axios';
import { baseUrl } from './../../Components/BaseUrl';
const Home = () => {
  const taskInput = useRef()
  const [tasks, setTaskes] = useState([]);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  const getdata = () => {
    axios.get(`${baseUrl}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.data.err) {
        setTaskes(res.data.data)
      }
    })
  }
  const addTask = (e) => {
    e.preventDefault();
    let data = {
      task_name: taskInput.current.value
    }
    axios.post(`${baseUrl}/tasks/store`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.data.err) {
        getdata()
        alert('Task Done')

      }
    })
  }

  const changeStatus = (e, task_id) => {
    let data = {
      is_done: e.target.checked,
      task_id
    }
    axios.post(`${baseUrl}/tasks/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.data.err) {
        alert('Task updated')
      }
    })
  }

  const deleteTask = (task_id) => {
    let data = {
      task_id: task_id
    }
    axios.post(`${baseUrl}/tasks/delete`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.data.err) {
        getdata()
        alert('Task Deleted')

      }
    })
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className='home col-12 py-5'>
      <div className="container">
        <form onSubmit={addTask}>
          <input
            ref={taskInput}
            className='form-control mb-3'
            type="text"
            placeholder='Enter new task name'
          />
        </form>
        <table className='table table-dark table-borderd'>
          <thead>
            <tr>
              <th>task name</th>
              <th>is done</th>
              <th>created at</th>
              <th>updated at</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map((task, index) => {
                return (
                  <tr key={task.task_id}>
                    <td>{index + 1}</td>
                    <td>{task.task_name}</td>
                    <td><input onChange={() => changeStatus((task.task_id))} type='checkbox' defaultChecked={task.is_done} /></td>
                    <td>{task.created_at}</td>
                    <td>{task.last_update}</td>
                    <td><button onClick={() => deleteTask(task.task_id)}>Delet</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home