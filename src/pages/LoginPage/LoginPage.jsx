import './LoginPage.css'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import authService from '../../services/auth.service'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/')
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-control w-full max-w-xs">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input
            type="email"
            name="email"
            onChange={handleEmail}
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input
            type="password"
            name="password"
            onChange={handlePassword}
            className="input input-bordered w-full max-w-xs"
          />

          <div className="pt-6">
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
          </div>
        </form>

        <div className="divider">or</div>

        <Link className="btn btn-outline btn-primary btn-block" to={'/signup'}>
          Sign Up
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

export default LoginPage
