import styled from 'styled-components';
import { Link, useLocation, useHistory} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../contexts';

const HeaderContainer = styled.div`
  height: 64px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0px 32px;
`
const Brand = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;  
  margin: auto;

  &:hover {
    color: yellow;
  }
`


const NavbarList = styled.div`
  display: flex;
  align-item: center;
`

const Nav = styled(Link)`
  display: flex;
  justify-center: center;
  align-items: center;
  height: 64px;
  padding: 0px 15px;
  cursor: pointer;
  color: black;
  text-decoration: none;


  ${props => props.$active && `
    background: rgba(0, 0, 0, 0.1)
  `}
`;

const LeftContainer = styled.div`
  display: flex;

  ${NavbarList}{
    margin-left: 10px;  
  }
`


  
function Header() {
  const { user, setUser } = useContext(AuthContext)
  const location = useLocation()
  const history = useHistory()

  const handleLogout = () => {
    localStorage.setItem('token', null)
    history.push('/')
    setUser(null)
  }

  return(
    <HeaderContainer >
        <LeftContainer>
          <Brand>這是我第一個部落格</Brand >
          <NavbarList>
            <Nav to='/' $active={location.pathname === '/'}>首頁</Nav>
            <Nav to='/about' $active={location.pathname === '/about'}>關於</Nav>
            <Nav to='list-post' $active={location.pathname === 'list-post'}> 文章列表 </Nav>
            { user && <Nav to='/new-post' $active={location.pathname === '/new-post'}>發布文章</Nav>}
            
          </NavbarList>
        </LeftContainer>
        <NavbarList>
          {!user && <Nav to='/login' $active={location.pathname === '/login'}>登入</Nav>}
          {user && <Nav onClick={handleLogout}> 登出 </Nav>}
          <Nav to='/register' $active={location.pathname === '/register'}>註冊</Nav>
        </NavbarList>
    </HeaderContainer>
)}

export default Header;