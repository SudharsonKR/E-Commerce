import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import {FaChartBar, FaClipboard, FaUsers} from "react-icons/fa"
import Widget from './summary-comp/Widget'
import {setHeaders, url} from "../../slices/api"
import Chart from './summary-comp/Chart'
import Transactions from './summary-comp/Transactions'
import AllTimeData from './summary-comp/AllTimeData'


const Summary = () => {

  const [users, setUsers] = useState([])
  const [usersPercentage, setUsersPercentage] = useState(0)
  const [orders, setOrders] = useState([])
  const [ordersPercentage, setOrdersPercentage] = useState(0)
  const [income, setIncome] = useState([])
  const [incomePercentage, setIncomePercentage] = useState(0)

  function compare(a, b){
    if(a._id < b._id){
      return 1;
    }
    if(a._id > b._id){
      return -1;
    }
    return 0;
  }

  //users
  useEffect(()=>{
    async function fetchData(){
      try{
      const res = await axios.get(`${url}/users/stats`, setHeaders())

      res.data.sort(compare)
      setUsers(res.data)
      console.log("summary-usres",res.data)
      setUsersPercentage(((res.data[1].total - res.data[0].total)/res.data[1].total)*100)

      }catch(error){
        console.log("admin-summary part-users:", error)
      }
    }
    fetchData()
  },[]);

  //orders
  useEffect(()=>{
    async function fetchData(){
      try{
      const res = await axios.get(`${url}/orders/stats`, setHeaders())

      res.data.sort(compare)
      setOrders(res.data)
      console.log(res.data)
      setOrdersPercentage(((res.data[0].total - res.data[1].total)/res.data[1].total)*100)

      }catch(error){
        console.log("admin-summary part-orders:", error)
      }
    }
    fetchData()
  },[])


  //income
  useEffect(()=>{
    async function fetchData(){
      try{
      const res = await axios.get(`${url}/orders/income/stats`, setHeaders())

      res.data.sort(compare)
      setIncome(res.data)
      setIncomePercentage(((res.data[0].total - res.data[1].total)/res.data[1].total)*100)

      }catch(error){
        console.log("admin-summary part-income:", error)
      }
    }
    fetchData()
  },[]);

const data = [{
  icon: <FaUsers/>,
  digits: users[0]?.total,
  isMoney: false,
  title: "Users",
  color: "rgb(247, 250, 250)",
  bgColor: "rgb(18, 105, 110)",
  percentage: usersPercentage,
},
{
icon: <FaClipboard/>,
  digits: orders[0]?.total,
  isMoney: false,
  title: "Orders",
  color: "rgb(247, 250, 250)",
  bgColor: "rgb(18, 105, 110)",
  percentage: ordersPercentage,
},
{
  icon: <FaChartBar/>,
    digits: income[0]?.total,
    isMoney: true,
    title: "Earnings",
    color: "rgb(247, 250, 250)",
    bgColor: "rgb(18, 105, 110)",
    percentage: incomePercentage,
  },]

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>OverView</h2>
            <p>Performing compared with previous month</p>
          </Title>
          <WidgetWrapper>
              {data?.map((data, index)=> <Widget key={index} data={data}/>)}
          </WidgetWrapper>
        </Overview>
        <Chart/>
      </MainStats>
      <SideStats>
      <Transactions/>
      <AllTimeData/>
      </SideStats>
    </StyledSummary>
    
  )
}

export default Summary

const StyledSummary = styled.div`
width: 100%;
display: flex;

@media only screen and (max-width: 665px){
  
  flex-wrap: wrap;
}
`;

const MainStats = styled.div`
width: 100%;
flex: 2;
`;

const SideStats = styled.div`
flex: 1;
display: flex;
flex-direction:column;
margin-left: 2rem;
width: 100%;
`;

const Title = styled.div`
p{
  font-size: 14px;
  color: rgba(234, 234, 255, 0.87);
}`;

const Overview = styled.div`
background-color: rgb(48, 51, 78);
color: white;
width: 100%;
padding: 1.5rem;
height: 170px;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;

@media only screen and (max-width: 665px){  
  height: 300px;
  padding: 0.5rem;  
}
`;

const WidgetWrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;

@media only screen and (max-width: 665px){
  
  flex-direction: column;
}
`;

