import './SignupPage.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'

function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleName = (e) => setUsername(e.target.value)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { email, password, username }

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate('/login')
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=" form-control w-full max-w-xs">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit}>
          <label className="label">
            <span className="label-text">Username:</span>
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleName}
            className="input input-bordered w-full max-w-xs"
            required
          />

          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="input input-bordered w-full max-w-xs"
            required
          />

          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="input input-bordered w-full max-w-xs"
            required
          />

          <div className="pt-6">
            <button type="submit" className="btn btn-success btn-block">
              Sign Up
            </button>
          </div>
        </form>
        <div className="divider">or</div>

        <Link className="btn btn-outline btn-primary btn-block" to={'/login'}>
          Login
        </Link>

        {errorMessage && (
          <div className="py-4">
            <p className="alert shadow-lg">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignupPage
