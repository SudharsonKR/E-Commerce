import React from 'react'
import { BsCurrencyRupee } from 'react-icons/bs'
import styled from 'styled-components'
import {useSelector} from "react-redux"

const AllTimeData = () => {

    const {items} = useSelector((state)=>state.products)
    const {list} = useSelector((state)=>state.orders)
    const {userlist} = useSelector((state)=>state.users)
    
  return (
    <Main>
        <h3>All Data</h3>
        <Info>
            <Title>Total Users</Title>
            <Data>{userlist.length}</Data>
        </Info>
        <Info>
            <Title>Total Products</Title>
            <Data>{items.length}</Data>
        </Info>
        <Info>
            <Title>Total Orders</Title>
            <Data>{list.length}</Data>
        </Info>
        <Info>
            <Title>Total Earnings</Title>
            <Data><BsCurrencyRupee style={{fontSize:"12px"}}/>{(5000).toLocaleString('INR')}</Data>
        </Info>

    </Main>
  )
}

export default AllTimeData

const Main = styled.div`
background: rgb(48, 51, 78);
color: rgba(234, 234, 255, 0.90);
padding: 1rem;
border-radius: 5px;
margin-top: 1.5rem;
font-size: 14px;
`;

const Info = styled.div`
display: flex;
font-size: 14px;
margin-top: 1rem;
padding: 0.3rem;
border-radius: 3px;
background:rgba(38, 198, 249, 0.12);
margin-top: 1rem;
&:nth-child(even){
    background: rgba(102, 108, 255, 0.12);
}
`;

const Title = styled.div`
flex: 1;
`;

const Data = styled.div`
flex: 1;
font-weight: 700;
`;