import React from 'react'
import styled from 'styled-components'

const Widget = ({data}) => {
  
    
  return (
    <StyleWidget>
        <Icon color={data.color}>
            {data.icon}
        </Icon>
        <Text>
<h3>
    {
        data.isMoney ? "Rs." +parseInt(data.digits).toLocaleString('INR') : data.digits
        
    }
</h3>
<p>{data.title}</p>
        </Text>
        <Percentage>{Math.floor(data.percentage)+"%"}</Percentage>
        
    </StyleWidget>
  )
}

export default Widget

const StyleWidget = styled.div`
display: flex;
align-items: center;
`;

const Icon = styled.div`
margin-right: 0.5rem;
padding: 0.5rem;
color: ${({color})=>color};
background-color: #808080;
border-radius: 3px;
font-size: 20px;
`;

const Text = styled.div`
h3{
    font-weight: 900;
}
p{
    font-size: 14px;
    color: whitesmoke;
}

`;

const Percentage = styled.div`
margin-left: 0.5rem;
font-size:15px;

`;