import React, { useEffect, useState } from 'react'
import NewHeader from './Header';
import { Input, Table, Button, Space, Popconfirm} from 'antd';
import axios from 'axios';


const columns = [
    {
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Product ID',
        dataIndex: 'product_id',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Fee',
        dataIndex: 'fee',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Total',
        dataIndex: 'total',
    },

];


function Order() {

    const [id, setId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [newData, setNewData] = useState([])
    const [orderData, setOrderData] = useState([])

    const resetValues = () => {
        setId(null);
        setQuantity(null);
    };
    
    useEffect(() => {
        setOrderDataFunction();
        resetValues();
    }, [])


    function setOrderDataFunction(){
        axios.get('http://localhost:8001/orders/').then((response) => {
            setOrderData(response.data);
        }).catch((error)=> {
            console.log("Set Order Data Function Error : ",error);
        })
    }



    function handleDelete(id) {
        axios.delete(`http://localhost:8001/orders/${id}`).then((response) => {
            console.log('Item deleted with ID:', id);
        });

        setOrderDataFunction();
    }

    const productColumns = [
        ...columns, // Include existing columns
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this item?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    function getData() {
        var data = {
            "id": id,
            "quantity": quantity
        }
        axios.post('http://localhost:8001/orders/', data).then((response) => {
            setNewData(response.data);
        });

        setOrderDataFunction();
        resetValues();
    }


    return (

        <>
            <NewHeader subtitle="Order" />
            <Input placeholder="ID you want to order" onChange={(e) => setId(e.target.value)} />
            <Input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />

            <Space wrap>
                <Button type="primary" onClick={getData} >Place Order</Button>
            </Space>
            <Table pagination={false} columns={productColumns} dataSource={orderData} />

        </>
    )
}

export default Order