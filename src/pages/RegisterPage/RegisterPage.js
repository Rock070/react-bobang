import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../WebAPI';
import { AuthContext } from '../../contexts';


const Root = styled.div`
  margin-top: 64px;

`

const Form = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ErrorMessage = styled.div`
  color: red;
`
const Loading = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 10;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function RegisterPage() {
  const { setUser } = useContext(AuthContext)
  const [nickname, setNickname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    
    e.preventDefault()
    setErrorMessage(null)
    if(isLoadingPostMessage) {
      return
    }
    setIsLoadingPostMessage(true)

    if(!nickname || !username || !password) {
      alert('請填寫完整！')
      setIsLoadingPostMessage(false)
      return
    }


    registerUser(nickname, username, password).then(res => {
      if(!res.ok) {
        setErrorMessage(res.message)
        setIsLoadingPostMessage(false)
        return
      }

      setUser({nickname, username, password})
      localStorage.setItem('token', res.token)
      setIsLoadingPostMessage(false)
      alert('註冊成功')
      history.push('/')
    }).catch(err => {
      setErrorMessage(err)
      return
    })
    setNickname("")
    setUsername("")
    setPassword("") 
  }
  return (  
    
    <Root>
      {isLoadingPostMessage && <Loading> Loading...... </Loading>}  
      <Form onSubmit={handleSubmit}>
        <div>
          nickname: <input value={nickname} onChange={ e => setNickname(e.target.value)}/>
        </div>
        <div>
          username: <input value={username} onChange={ e => setUsername(e.target.value)}/>
        </div>
        <div>
          password: <input type='password' value={password} onChange={ e => setPassword(e.target.value)}/>
        </div>
        <button> 提交註冊 </button>
        {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
      </Form>
    </Root>
  );
}
export default RegisterPage;

// 登入後導ㄌㄌ回首頁