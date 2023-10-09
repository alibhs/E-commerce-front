import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext.";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect,useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import CustomInput from "@/components/CustomInput";

const ColumnsWrapper = styled.div`
display:grid;
grid-template-columns: 1.3fr .7fr;
gap:40px;
margin-top:40px;
`;

const Box = styled.div`
background-color:#E9E9E9;
border-radius:10px;
padding:30px;
`;

const ProductInfoCell = styled.td`
padding: 10px 0;
`;

const ProductImageBox = styled.div`
max-width:100px;
max-height:100px;
padding:10px;
background-color: #f0f0f0;
border: 1px solid #E10514;
align-items:center;
justify-content:center;
border-radius:10px;
img{
    max-width:100px;
    max-height:100px;
    
 }
`;

const QuantityLabel = styled.span`
padding 0 3px;
`;

const CityHolder = styled.div`
display:flex;
gap:5px;
`;

export default function CartPage(){
    const {cartProducts,addProduct,removeProduct} = useContext(CartContext);
    const [product,setProduct] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');

    useEffect(() => {
      const fetchProducts = async () => {
        const uniqueProductIds = Array.from(new Set(cartProducts.map((product) => product.productId))); // Tekrarlanan ürünleri kaldır  
        const productsData = [];
  
        for (const productId of uniqueProductIds) {
          try {
            const response = await axios.get(`https://localhost:44374/api/Products/getById?productId=${productId}`);
            productsData.push(response.data);
          } catch (error) {
            console.error(`Error fetching product with id ${productId}:`, error);
          }
        }
        setProduct(productsData);
      };  
      fetchProducts();
    }, [cartProducts]);
  
    function moreOfThisProduct(productId){
    addProduct(productId);

    }

    function lessOfThisProduct(productId){
        removeProduct(productId);
    }
    
    let total = 0;
    for(const cartProduct of cartProducts){
        
        const currentProd = product.find(p=> p.productId === cartProduct.productId);

        total += currentProd?.price * cartProduct?.quantity;
    }


    function goToPayment(e){
      e.preventDefault();
      console.log(cartProducts)
       axios.post("https://localhost:44374/api/Order/add",{
        orderedProducts:  cartProducts,
        address: {
          street: streetAddress,
          city: city,
          email: email,
          postalCode: postalCode,
          country: country,
          phoneNumber: phoneNumber,
          fullName: name
        },
        orderDate: new Date()
      });
      }

    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h2>Sepet</h2>

              {!cartProducts?.length && <div>Sepetiniz Boş</div>}
              {cartProducts?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Ürün</th>
                      <th>Miktar</th>
                      <th>Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((p) => (
                      <tr key={p.productId}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.find(x => x.productId === p.productId)?.imageURL} alt="" />
                          </ProductImageBox>
                          {p.productName}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(p.productId)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                         {p.quantity}
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(p.productId)}
                          >
                            +
                          </Button>
                        </td>
                        <td>{product.find(x => x.productId === p.productId)?.price} TL</td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Toplam: {total} TL</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
            {!!cartProducts?.length && (
              <Box>
                <h2>Sipariş Bilgisi</h2>
                <form method="post" action="">
                  <CustomInput
                    type="text"
                    placeholder="Ad Soyad"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CustomInput
                    type="text"
                    placeholder="Telefon Numarası"
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <CityHolder>
                    <CustomInput
                      type="text"
                      placeholder="Şehir"
                      value={city}
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <CustomInput
                      type="text"
                      placeholder="Posta Kodu"
                      value={postalCode}
                      name="postalCode"
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </CityHolder>

                  <CustomInput
                    type="text"
                    placeholder="Sokak Adı"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                  <CustomInput
                    type="text"
                    placeholder="İlçe"
                    value={country}
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <Button block primary onClick={goToPayment} type="submit">
                    Siparişi Oluştur
                  </Button>
                </form>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </>
    );
}