import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from './productsApi';
import { Card, Image, List, Button } from 'antd';
import '../products/ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const navigate = useNavigate(); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product details</div>;

  return (
    <Card 
      title={data.title} 
      className="card"
      cover={<Image src={data.thumbnail} alt={data.title} width={200} />}
    >
      <p><strong>Price:</strong> ${data.price}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Category:</strong> {data.category}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Stock:</strong> {data.stock}</p>
      <p><strong>Warranty Information:</strong> {data.warrantyInformation}</p>
      <p><strong>Shipping Information:</strong> {data.shippingInformation}</p>
      <p><strong>Availability Status:</strong> {data.availabilityStatus}</p>
      <p><strong>Tags:</strong> {data.tags.join(', ')}</p>
      <p><strong>Barcode:</strong> {data.meta?.barcode}</p>
      <Image src={data.meta?.qrCode} alt="QR Code" width={100} />
      <List
        header={<strong>Customer Reviews</strong>}
        dataSource={data.reviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta
              title={`${review.reviewerName} (Rating: ${review.rating}/5)`}
              description={review.comment}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: '20px' }}>
        <Button 
          type="primary" 
          onClick={() => navigate('/')} 
          style={{ marginRight: '10px' }}
        >
          Back To Home
        </Button>
        <Button 
          type="default" 
          onClick={() => navigate(`/products/edit/${id}`)} 
        >
          Edit Product
        </Button>
      </div>
    </Card>
  );
};

export default ProductDetail;
