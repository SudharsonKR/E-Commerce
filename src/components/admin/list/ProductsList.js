import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { productsDelete } from '../../../slices/ProductSlice';
import EditProduct from '../../admin/EditProduct'

export default function ProductsList() {

    const {items} = useSelector((state)=>state.products)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rows = items && items.map((item)=>{
    return{
id: item._id,
pName: item.name,
pDesc: item.desc,
pPrice: item.price,
imageUrl: item.image.url,
    }})

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'pName', headerName: 'Product_Name', width: 130 },
        { field: 'pPrice', headerName: 'Product_Price', width: 80 },
        { field: 'pDesc', headerName: 'Description', width: 130 },
        { field: 'imageUrl', headerName: 'Image', width: 80,
    renderCell: (params) => {
        return(
            <ImageContainer>
                <img src={params.row.imageUrl} alt="" />
            </ImageContainer>
        )
    } },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 170,
          renderCell: (params) => {
            return(
                <Actions>
                    <Delete onClick={()=>handleDelete(params.row.id)}>Delete</Delete>
                    <EditProduct prodId={params.row.id}/>            
                    <View onClick={()=>navigate(`/product/${params.row.id}`)}>View</View>
                </Actions>
            )
        }
        },
      ];

      const handleDelete = (id)=>{
        dispatch(productsDelete(id))
      };
      
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

//styles components

const ImageContainer = styled.div`
img{
    height: 40px;
}
`;

const Actions = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
/* button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
} */
`;

const Delete = styled.div`
background-color: rgb(255, 77, 73);
padding: 5px;
border-radius: 5px;
color: white;
cursor: pointer;
`;

const View = styled.div`
background-color: rgb(114, 225, 40);
padding: 5px;
border-radius: 5px;
color: white;
cursor: pointer;
`;