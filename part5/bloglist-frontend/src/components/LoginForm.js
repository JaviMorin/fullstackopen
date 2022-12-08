import React from 'react'

const LoginForm = ({ handleLogin, username,handleUsernameChanged, password, handlePasswordChanged }) => (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <div>
      username
      <input
        id='username'
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChanged}
      />
    </div>
    <div>
      password
      <input
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChanged}
      />
    </div>
    <button  id="login-button" type="submit">login</button>
  </form>
)

export default LoginForm