import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext.";
import AuthContext, { AuthProvider } from "@/context/AuthProvider";
import jwtDecode from 'jwt-decode';
import Button from "./Button";
import { useEffect } from "react";
import ButtonLink from "./ButtonLink";

const StyledHeader = styled.header`
background-color: #e10514;
position: sticky;
top: 0px;
z-index: 1;
`;

const Logo = styled(Link)`
color:#fff;
text-decoration:none;

`;

const Wrapper = styled.div`
display:flex;
justify-content: space-between;
padding: 20px 0;
`;
const StyledNav = styled.nav`
display: flex;
gap: 15px;
`;
const NavLink = styled(Link)`
color:#fff;
text-decoration:none;

`;

const ButtonStyle = css`
border:0;

border-radius: 5px;
cursor: pointer;
display: inline-flex;
text-decoration:none;
font-family:'Poppins',sans-serif;
font-weight:500;
color:#fff;
background-color:#E10514;
`;
const StyledButton = styled.button`
    ${ButtonStyle};
`;

export default function Header(){
  const {totalQuantity} = useContext(CartContext);
  const {auth, setAuth} = useContext(AuthContext);
 

   useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setAuth(prevAuth => ({ ...prevAuth, userName: storedUserName }));
    }
  }, [setAuth]);

 
  useEffect(() => {
    if (auth.accessToken) {
      const decoded = jwtDecode(auth.accessToken);
      const userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      setAuth(prevAuth => ({ ...prevAuth, userName }));
      localStorage.setItem('userName', userName);  
    }
  }, [auth.accessToken, setAuth]);

  const handleLogout = () => {
    localStorage.removeItem('userName'); 
    setAuth(prevAuth => ({ ...prevAuth, userName: null })); 
  };

  let authHeader;
  if (auth.userName) {
    authHeader = (
      <>
        <NavLink href={"/cart"}>Sepet ({totalQuantity})</NavLink>
        <NavLink href={""}>{auth.userName.toUpperCase()}</NavLink>
        <StyledButton onClick={handleLogout}>Çıkış Yap</StyledButton>
      </>
    );
  } else {
    authHeader = (
      <>
        <NavLink href={"/login"}>Giriş Yap</NavLink>
        <NavLink href={"/register"}>Kayıt Ol</NavLink>
        <NavLink href={"/cart"}>Sepet ({totalQuantity})</NavLink>
      </>
    );
  }
  
  
    return (
      <StyledHeader>
        <Center>
         <Wrapper>
         <Logo href={"/"}>ZT-SEPET</Logo>
          <StyledNav>
            <NavLink href={"/"}>Anasayfa</NavLink>
            <NavLink href={"/products"}>Ürünler</NavLink>
            <AuthProvider>
           {authHeader}
            </AuthProvider>
          </StyledNav>
         </Wrapper>
        </Center>
      </StyledHeader>
    );
}