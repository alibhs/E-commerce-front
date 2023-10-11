import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext.";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect,useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import CustomInput from "@/components/CustomInput";
import Link from "next/link";
import { useRouter } from 'next/router';
import ProductsGrid from "@/components/ProductsGrid";

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
const NavLink = styled(Link)`
color:#000000;
text-decoration:none;

`;

export default function CartPage(){
    const router = useRouter();
    const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);


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
        setProducts(productsData);
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
        
        const currentProd = products.find(p=> p.productId === cartProduct.productId);

        total += currentProd?.price * cartProduct?.quantity;
    }


    function goToPayment(e){
      e.preventDefault();
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
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    clearTimeout(router);
      clearCart();
      }

      if (isSuccess) {
        return (
          <>
            <Header />
            <Center>
              <ColumnsWrapper>
                <Box>
                  <h1>Siparişiniz Oluşturulmuştur!</h1>
                  <NavLink href={"/"}>Anasayfaya yönlendiriliyorsunuz</NavLink>
                </Box>
              </ColumnsWrapper>
            </Center>
          </>
        );
      }

    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h2>Sepet</h2>
              {!cartProducts?.length && <div>Sepetinizde ürün bulunmamaktadır</div>}
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
                            <img
                              src={
                                products.find(
                                  (x) => x.productId === p.productId
                                )?.imageURL
                              }
                              alt=""
                            />
                          </ProductImageBox>
                          {p.productName}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(p.productId)}
                          >
                            -
                          </Button>
                          <QuantityLabel>{p.quantity}</QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(p.productId)}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          {
                            products.find((x) => x.productId === p.productId)
                              ?.price
                          }{" "}
                          TL
                        </td>
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
                <form onSubmit={goToPayment}>
                  <CustomInput
                    type="text"
                    placeholder="Ad Soyad"
                    value={name}
                    required
                    pattern="/^[a-z ,.'-]+$/i"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CustomInput
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Telefon Numarası"
                    required
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <CityHolder>
                    <CustomInput
                      type="text"
                      placeholder="Şehir"
                      required
                      value={city}
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <CustomInput
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Posta Kodu"
                      required
                      value={postalCode}
                      name="postalCode"
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </CityHolder>

                  <CustomInput
                    type="text"
                    placeholder="Sokak Adı"
                    required
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                  <CustomInput
                    type="text"
                    placeholder="İlçe"
                    required
                    value={country}
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <Button block primary type="submit">
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