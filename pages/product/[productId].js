import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext.";
import CartIcon from "@/components/icons/CartIcon";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const Box = styled.div`
background-color:#E9E9E9;
border-radius:10px;
padding:30px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;





export default function ProductPage({products}){
    const {addProduct} = useContext(CartContext);
    const router = useRouter();
    const [productInfo,setProductInfo] = useState([]);
    const {productId} = router.query;
    useEffect(() => {
          axios
            .get(
              "https://localhost:44374/api/Products/getById?productId=" +
                productId
            )
            .then((response) => {
              setProductInfo(response.data);
            });
      }, []);
      function goBack(){
        router.push('/products');
    }
    return (
      <>
        <Header />
        <Center>
          <ColWrapper>
            <Box>
              <img style={{ maxWidth: "100%" }} src={productInfo.imageURL} />
            </Box>
            <div>
              <Title>{productInfo.productName}</Title>
              <p>{productInfo.description}</p>
              <p>Stok Sayısı : {productInfo.unitInStock}</p>
              <PriceRow>
                <div>
                  <Price>{productInfo.price} TL</Price>
                </div>

                <div>
                  <Button
                    primary
                    onClick={() => addProduct(productInfo.productId)}
                  >
                    <CartIcon />
                    Sepete ekle
                  </Button>
                </div>
              </PriceRow>
            </div>
          </ColWrapper>
        </Center>
      </>
    );
}


