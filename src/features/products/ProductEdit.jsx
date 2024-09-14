import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetProductByIdQuery, useUpdateProductMutation } from './productsApi';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const { Option } = Select;

const ProductEdit = () => {
  const { id } = useParams();
  const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const [categoriesData, setCategoriesData] = useState([]);
  const navigate = useNavigate(); 

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        setCategoriesData(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        ...productData,
        reviews: productData.reviews || [], 
      });
    }
  }, [productData, form]);

  const onFinish = async (values) => {
    console.log('Updated Product Data:', values);
    await updateProduct({ id, data: values });
    form.resetFields();
  };

  if (isProductLoading) {
    return <div>Loading product data...</div>;
  }

  return (
    <Form
      form={form}
      initialValues={productData}
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '20px auto' }}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
        <Select>
          {categoriesData.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.List name="reviews">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'review']}
                  fieldKey={[fieldKey, 'review']}
                  rules={[{ message: 'Please input a review!' }]}
                >
                  <Input placeholder="Enter review" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Review
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <div className="button-container">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={() => navigate('/')}> 
            Go to Home
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ProductEdit;
