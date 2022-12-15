import axios from 'axios'

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005',
    })

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }

      return config
    })
  }

  // USER API
  updateUser = async (requestBody) => {
    return this.api.put(`/api/user`, requestBody)
  }

  getCurrentUser = async (userId) => {
    return this.api.get('/api/user', {
      params: { userId },
    })
  }

  // TASKS API
  addTask = async (requestBody) => {
    return this.api.post('/api/user/task', requestBody)
  }

  updateTask = async (requestBody) => {
    return this.api.put('/api/user/task', requestBody)
  }

  getTasks = async (userId) => {
    return this.api.get('/api/user/tasks', {
      params: { userId },
    })
  }

  getTaskById = async (taskId) => {
    return this.api.get('/api/user/task', {
      params: { taskId },
    })
  }

  deleteTask = async ({ taskId, user }) => {
    const userId = user._id
    return this.api.delete('/api/user/task', { data: { taskId, userId } })
  }
}

const apiService = new ApiService()

export default apiService
