import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import NewHeader from './Header';
import axios from 'axios';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
];

function Product() {
    const [newData, setNewData] = useState([]);
    const [productData, setProductData] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    function setProductDataFunction() {
        axios.get('http://localhost:8000/products').then((response) => {
            setProductData(response.data);
            console.log(response.data);
        });
    }

    async function handleDelete(id) {
        await axios.delete(`http://localhost:8000/products/${id}`).then((response) => {
            console.log('Item deleted:', response.data);
        });

        setProductDataFunction();

    }

    const productColumns = [
        ...columns, 
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

    useEffect(() => {
        setProductDataFunction();
    }, []);

    function getData() {
        const postData = {
            name: name,
            price: price,
            quantity: quantity,
        };
        axios.post('http://localhost:8000/products', postData).then((response) => {
            setNewData(response.data);
        });

        setProductDataFunction();
        setPrice(null);
        setName(null);
        setQuantity(null);
    }



    return (
        <>
            <NewHeader subtitle="Product" />
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
            <Space wrap>
                <Button type="primary" onClick={getData}>
                    Add Product
                </Button>
            </Space>

            <div>
                <Table columns={productColumns} dataSource={productData} />
            </div>
        </>
    );
}

export default Product;
