import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { newPost } from '../../WebAPI'

const Root = styled.div`
  margin-top: 64px;
`
const FormContainer = styled.div`
  width: 70%;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  text-align: center;
  padding: 50px 20px;
`


function PostPage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    newPost(title, body).then(res => {
      if(res.ok !== 0) {
        console.log(res)
        history.push('/')
      }
    })
  }

  return (  
    <Root>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            Title: <input value={title} onChange={ e => setTitle(e.target.value)}/>
          </div>
          <div>
            body: <input value={body} onChange={ e => setBody(e.target.value)}/>
          </div>
          <button type='submit'> 發布文章 </button>
          
        </form>    
      </FormContainer>
    </Root>
  )
}
export default PostPage;

// 文章新增完後，回到首頁並已有該文章