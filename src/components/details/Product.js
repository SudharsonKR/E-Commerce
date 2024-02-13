import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { setHeaders, url } from '../../slices/api';
import { BsCurrencyRupee } from 'react-icons/bs';
import { useDispatch} from 'react-redux'
import { addToCart } from '../../slices/cartSlice';

const Product = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(product)

  useEffect(()=>{
    setLoading(true)
    async function fetchData(){
      try{
      const res = await axios.get(`${url}/products/find/${params.id}`, setHeaders());
      setProduct(res.data)
      }catch(error){
        console.log("admin-summary part-income:", error)
      }
      setLoading(false)
    }
    fetchData()
  },[]);

  const handleAddToCart = (product)=>{
    dispatch(addToCart(product));
    navigate("/cart")
  }

  return (
    <StyleProduct>
    <ProductContainer>
        {loading ? (<p>Loading...</p>) : 
        (<>
        <ImageContainer>
          <img src={product.image?.url} alt="product" />
        </ImageContainer>
        <ProductDetails>
          <h3>{product.name}</h3>
          <p><span>Brand:</span>{product.brand}</p>
          <p><span>Description:</span>{product.desc}</p>
          <Price><BsCurrencyRupee style={{height: "20px"}}/>{(parseInt(product.price)).toLocaleString('INR')}</Price>
          <button className='product-add-to-cart' onClick={()=>handleAddToCart (product)}>Add To Cart</button>
          </ProductDetails>
        </>
        )}
    </ProductContainer>
    </StyleProduct>
  )
}

export default Product

const StyleProduct = styled.div`
margin: 3rem;
display: flex;
justify-content: center;
`;

const ProductContainer = styled.div`
max-width: 500px;
width: 100%;
height: auto;
display: flex;
box-shadow: 0px 7px 29px rgba(100, 100, 111, 0.5);
border-radius: 10px;
padding: 2rem;
`;

const ImageContainer = styled.div`
flex: 1;
img{
    width: 100%
}
`;

const ProductDetails = styled.div`
flex: 2;
margin-left: 2rem;
h3{
    font-size: 35px;
}
p span {
    font-weight: bold;
}
`;

const Price = styled.div`
margin: 1rem 0;
font-weight: bold;
font-size: 25px;
`;