import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { useState,useEffect } from "react";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage(){
  const [products,setProducts] = useState([]);
  useEffect(()=>{
      axios.get("https://localhost:44374/api/Products/getAll").then(response =>{
      setProducts(response.data);
  });
  },[]);
    return (
      <>
        <Header />
        <Center>
          <Title>Ürünler</Title>
          <ProductsGrid products = {products} />
        </Center>
      </>
    );
}

