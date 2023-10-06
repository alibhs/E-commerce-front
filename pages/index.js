import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { useDebugValue, useState,useEffect } from "react";
import axios from "axios";
import NewProducts from "@/components/NewProduct";
import HeaderCategories from "@/components/HeaderCategories";


export default  function HomePage(){
  const featuredProductId = 19;
  const [products,setProducts] = useState([]);
  const [product,setProduct] = useState([]);
  useEffect(()=>{
      axios.get("https://localhost:44374/api/Products/getAll").then(response =>{
      setProducts(response.data);
  });
  },[]);

  useEffect(()=>{
    products.forEach((p)=>{
      if(p.productId === featuredProductId){
        setProduct(p);
        
      }
    })
  })


  return (
    <div>
      <Header />
      <HeaderCategories />
      <Featured product={product} />
      <NewProducts products={products}  />
    </div>
  );
}
