import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { login, getMe } from '../../WebAPI';
import { AuthContext } from '../../contexts';

const Root = styled.div`
  margin-top: 64px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ErrorMessage = styled.div`
  color: red;
`

function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = (e) => {
    setErrorMessage(null)
    e.preventDefault()
    login(username, password).then(data => {
      if(data.ok === 0) {
        setErrorMessage(data.message)
        console.log('logining error')
        return 
      }
      const token = data.token
      localStorage.setItem('token', token)

      getMe().then(response => {
        if(response.ok !== 1) {
          console.log('response not ok', response.message)
          localStorage.setItem('token', null)
          console.log('token error')
          return setErrorMessage(response.toString())
        }
        
        setUser(response.data)
        if(location.pathname !== '/') {
          history.push('/');
        }
      })
      
    })
  }
  return (  
    <Root>
      <form onSubmit={handleSubmit}>
        <div>
          username: <input value={username} onChange={ e => setUsername(e.target.value)}/>
        </div>
        <div>
          password: <input type='password' value={password} onChange={ e => setPassword(e.target.value)}/>
        </div>
        <button> 登入 </button>
        {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
      </form>
    </Root>
  );
}
export default LoginPage;

// 登入後導ㄌㄌ回首頁