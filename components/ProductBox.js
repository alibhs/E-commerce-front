import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { primary } from "./lib/colors";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext.";

const ProductWrapper = styled.div`

`;

const WhiteBox=styled(Link)`
background-color:#fff;
padding: 10px;
height:110px;
text-align:center;
display:flex;
align-items:center;
justify-content:center;
border-radius:10px;
img{
    max-width:100%;
    max-height:110px;

}
`;

const ProductName = styled(Link)`
font-weight:normal;
font-size: 0.9rem;
color:inherit;
text-decoration:none;
margin:0;
`;

const ProductInfoBox = styled.div`
margin-top:5px;
`;
const PriceRow = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin-top:2px;
`;

const Price = styled.div`
font-size: 1.3rem;
font-weight: 700;
`;
export default function ProductBox({productId,productName,price,imageURL,unitInStock}){
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+productId;  
  return (
      <ProductWrapper>
        <WhiteBox href={url}>
          <div>
            <img src={imageURL} alt="" />
          </div>
        </WhiteBox>
        <ProductInfoBox>
          <ProductName href={url}>{productName}</ProductName>
          <PriceRow>
            <Price> {price} TL</Price>
              <Button onClick={() => addProduct(productId)} primary outline>Sepete Ekle
              </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    );
}