import styled from "styled-components";
import Center from "./Center";

const ProductGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
`;


export default function NewProducts({products}){
    return (
      <Center>
        {" "}
        <ProductGrid>
          {products.map((p) => (
            <div key={p.productId}>{p.productName}</div>
          ))}
        </ProductGrid>
      </Center>
    );
}