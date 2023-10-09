import HeaderCategories from "@/components/HeaderCategories";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useEffect,useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import styled from "styled-components";
import ProductBox from "@/components/ProductBox";


const StyledProductsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 20px;
padding-top:30px;
`;


export default function Categories(){
    const router = useRouter();
    const [product,setProduct] = useState([]);
    const {categoryId} = router.query;
    useEffect(()=>{
        axios.get(
            "https://localhost:44374/api/Products/getlistbycategory?categoryId="+categoryId
        ).then((response) =>{
            setProduct(response.data);}
            )
        },[]);
    
  return (
    <>
        <Header />
        <Center>
          <Title>
            {product.length}  Adet ürün bulundu
          </Title>
          <StyledProductsGrid>
        {product.map((p) => (
          <ProductBox key={p.productId} {...p} />
        ))}
      </StyledProductsGrid>
        </Center>
      </>
  );
}