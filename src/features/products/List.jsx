import React, { useState } from 'react';
import { Table, Button, Image } from 'antd';
import { useGetProductsQuery } from './productsApi';
import { useNavigate } from 'react-router-dom';
import '../../features/products/List.css';

const List = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetProductsQuery({ limit: 10, skip: (page - 1) * 10 });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      className: 'with-margin',
      width: 120, // Set a fixed width for the image column
      render: (thumbnail) => (
        <Image 
          src={thumbnail}
          alt="Product Image"
          width={100}
          height={100}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
      className: 'with-margin',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      responsive: ['md'],
      className: 'with-margin',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      className: 'with-margin',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      className: 'with-padding',
      render: (price) => `$${price}`,
    },
    {
      title: 'Stock Status',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
      responsive: ['md'],
      className: 'with-margin',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'with-margin',
      render: (text, record) => (
        <Button onClick={() => navigate(`/products/${record.id}`)}>View Details</Button>
      ),
    },
  ];

  return (
    <Table 
      className='with-margin'
      columns={columns}
      dataSource={data.products}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: 10,
        total: data.total,
        onChange: (page) => setPage(page),
      }}
      tableLayout="fixed" // Ensure fixed table layout for consistent column width
    />
  );
};

export default List;
