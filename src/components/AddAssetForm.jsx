import { useState } from "react"
import { Select, Space, Typography, Flex, Divider, Form, Input, Checkbox, Button, InputNumber } from "antd"
import { useCrypto } from "../context/crypto-context"

export default function AddAssetForm() {
  const [coin, setCoin] = useState(null)
  const { crypto } = useCrypto()

  if (!coin) {
    return <Select
      style={{
        width: '100%',
      }}
      placeholder={'Select coin'}
      options={crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon
      }))}
      optionRender={(option) => (
        <Space>
          <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          {option.data.desc}
        </Space>
      )}
      onSelect={v => setCoin(crypto.find(c => c.id === v))}
    />
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{}}
      onFinish={onFinish}
    >
      <Flex align='center' gap='1rem'>
        <img src={coin.icon} alt={coin.name} style={{ width: '40px' }} />
        <Typography.Title level={2} style={{ marginBottom: 0 }} >{coin.name}</Typography.Title>
      </Flex>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            message: 'Please input your username!',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}