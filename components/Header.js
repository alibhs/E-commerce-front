import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext.";

const StyledHeader = styled.header`
background-color: #e10514;

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
export default function Header(){
  const {totalQuantity} = useContext(CartContext);
  
    return (
      <StyledHeader>
        <Center>
         <Wrapper>
         <Logo href={"/"}>ZT-SEPET</Logo>
          <StyledNav>
            <NavLink href={"/"}>Anasayfa</NavLink>
            <NavLink href={"/products"}>Ürünler</NavLink>
            {/* <NavLink href={"/account"}>Hesap</NavLink> */}
            <NavLink href={"/cart"}>Sepet ({totalQuantity})</NavLink>
          </StyledNav>
         </Wrapper>
        </Center>
      </StyledHeader>
    );
}