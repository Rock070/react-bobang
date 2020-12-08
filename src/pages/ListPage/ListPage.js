import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPosts, getListPage } from '../../WebAPI'


/*
1. 拿全部 post 數量
2. 計算頁數
3. 設定每個頁數啟動 limit getPost
4. render
*/

function ListPage() {

    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState([])

    useEffect(() => {
      getPosts().then(posts => {
        setPageNum(Array(Math.ceil(posts.length/5)).fill('1'))  
      })
      getListPage(1).then(posts => {
        setPosts(posts)
      })
    }, [])

    const handleChangePage = useCallback((page) => {
      getListPage(page).then(res => {
        console.log(res)
        setPosts(res)
      }) 
    })


    const Root = styled.div `
    margin-top: 80px;
  `
    const PostContainer = styled.div `
    border-bottom: 1px solid rgba(0, 12, 34, 0.2);
    padding: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  `

    const PostTitle = styled(Link)
    `
    font-size: 24px;
    color: #333;
    text-decoration: none;
  `

    const PostDate = styled.div `
    color: rgba(0, 0, 0, 0.8)
  `

    const Paginate = styled.div `
    margin-top: 20px;
    display: flex;
    justify-content: center;
  `

    const Page = styled.div `
    padding: 5px 10px;
    cursor: pointer;
   
  `
  
    const handlePage = (e) => {
        const nowPage = e.target.innerText
        handleChangePage(nowPage)
    }


    return ( 
      <Root> {
            posts.map(post => ( 
            <PostContainer >
                <PostTitle to = { `/posts/${post.id}` } > { post.title } </PostTitle> 
                <PostDate > { new Date(post.createdAt).toLocaleString() } </PostDate> 
            </PostContainer>
            ))
        } 
        <Paginate > {
            pageNum.map((page, id) => { 
              return (
              <Page onClick = { handlePage } >
                  {id + 1}
              </Page>
            )})
        } 
        </Paginate>

      </Root>
    );
}
export default ListPage;