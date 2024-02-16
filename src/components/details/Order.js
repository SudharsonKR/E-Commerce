import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { setHeaders, url } from '../../slices/api';
import axios from 'axios';
import styled from 'styled-components';

const Order = () => {

  const  params = useParams();

  const [order, setOrder]= useState({});
  const [loading, setLoading] = useState(false);

  

    useEffect(()=>{
      const fetchOrder = async()=>{
        try{
          setLoading(true);
          const res = await axios.get(`${url}/orders/findOne/${params.id}`, setHeaders());
          setOrder(res.data);
                 
        }catch (err){
          console.log("Vies Order Status", err)
        }
        setLoading(false);
      };
      fetchOrder();
      
    },[params.id]);
  return (
    <StyledOrder>{
      loading ? (
        <p>Loading...Please wait</p>
      ) : (        
        <>
        <OrdersContainer>
          <h2>Order Details</h2>
          <p>
            Delivery Status :
            {order.delivery_status === "pending" ? (
              <Pending>Pending</Pending>
            ) : order.delivery_status === "dispatched" ? (
            <Dispatched>Dispatched</Dispatched>
            ) : order.delivery_status === "delivered" ? (
              <Delivered>Delivered</Delivered>
              ) : ("Error")}              
          </p>
          <h3>Ordered Products</h3>
          <Items>
            {order.products?.map((product, index)=>(
              <Item key = {index}>
                <span>{product.description}</span>
                <span>{product.quantity}</span>
                <span>{"₹" + (product.amount_total)/100}</span>
              </Item>
            ))}
          </Items>
        <div>
          <h3>Total Price</h3>
          <p>{"₹" + (order.total)}</p>
        </div>
        <div>
          <h3>Shipping Details</h3>
          <p>Customer: {order.shipping?.name}</p>
          <p>City: {order.shipping?.address.city}</p>
          <p>Email: {order.shipping?.email}</p>
        </div>
        </OrdersContainer>
        </>        
      )
      }</StyledOrder>
  )}
export default Order

const StyledOrder = styled.div`
margin: 3rem;
display: flex;
justify-content: center;
h3{
  margin: 1.5rem 0 0.5rem 0;
}`;

const OrdersContainer = styled.div`
max-width: 500px;
width: 100;
height: auto;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
border-radius: 5px;
padding: 2rem;
`;

const Items = styled.div`
span{
  margin-right: 1.5rem;
  &:first-child{
    font-weight: bold;
  }
}`;

const Item= styled.li`
margin-left: 0.5rem;
margin-bottom: 0.5rem;
`;

const Pending = styled.div`
color: rgb(253, 181, 40);
background-color: rgba(253, 181, 40, 0.12);
padding: 3px 5px;
border-radius: 5px;
font-size: 14px;
width: fit-content;
`;

const Dispatched = styled.div`
color: rgb(38, 198, 349);
background-color: rgba(38, 198, 249, 0.12);
padding: 5px;
border-radius: 5px;
width: fit-content;
`;

const Delivered = styled.div`
color: rgb(102, 108, 255);
background-color: rgba(102, 108, 255, 0.12);
padding: 5px;
border-radius: 5px;
width: fit-content;
`;