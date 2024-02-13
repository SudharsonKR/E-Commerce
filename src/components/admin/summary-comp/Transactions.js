import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { setHeaders, url } from '../../../slices/api';
import axios from 'axios';
import moment from "moment"
import { BsCurrencyRupee } from "react-icons/bs";

const Transactions = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            setLoading(true)
            try{
            const res = await axios.get(`${url}/orders/?new=true`, setHeaders());
      
            setOrders(res.data)
            setLoading(false)
            }catch(error){
              console.log("summary-comp-Transactions", error)
              }
            setLoading(false)
          }
          fetchData()
    },[])

  return (
    <StyledTransactions>
        {loading ? (
            <p>Transactions loading...</p>
        ):(
            <>
            <h3>Latest Transactions</h3>

            {
                orders?.map((order, index)=><Transaction key={index}>
                    <p>{order.shipping.name}</p>
                    <p><BsCurrencyRupee style={{fontSize:"12px"}}/>{order.total}</p>
                    <p>{moment(order.createdAt).fromNow()}</p>
                </Transaction>)
            }
            </>
        )}
    </StyledTransactions>
  )
}

export default Transactions

const StyledTransactions = styled.div`
background: rgb(48, 51, 78);
color: rgba(234, 234, 255, 0.90);
padding: 1rem;
border-radius: 5px;
`;

const Transaction = styled.div`
display: flex;
font-size: 14px;
margin-top: 1rem;
padding: 0.5rem;
border-radius: 3px;
background:rgba(38, 198, 249, 0.12);
@media (max-width: 665px) {
    flex-direction: column;
    border-top: 5px;
}
p{
    flex: 1;
}&:nth-child(even){
    background: rgba(102, 108, 255, 0.12);
}
`;