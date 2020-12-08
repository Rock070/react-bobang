import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getSinglePage } from '../../WebAPI'



function SinglePage() {
  const [post, setPost] = useState({})

  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    const post = getSinglePage(id)
    post.then( post => {
      console.log(post)
      setPost(post)
    })
  }, [])



const Root = styled.div`
  margin-top: 80px;
`
const PostContainer = styled.div`
  
  margin: auto;
  width: 60%;
`

const PostHead = styled.div`
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  
`

const PostTitle = styled.div`
  font-size: 24px;
`

const PostDate = styled.div``

const PostBody = styled.div` 
  margin-top: 20px;
  font-size: 16px;
  padding: 0px 20px;
`

  return (  
    <Root>
      <PostContainer>
        <PostHead>
          <PostTitle >{post.title}</PostTitle>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </PostHead>
        <PostBody>
          {post.body}
        </PostBody>
      </PostContainer>
    </Root>
  );
}
export default SinglePage;
