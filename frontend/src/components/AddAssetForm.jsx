import { useRef, useState } from "react"
import { Select, Space, Divider, Form, Button, InputNumber, DatePicker, Result } from "antd"
import { useCrypto } from "../context/crypto-context"
import CoinInfo from "./CoinInfo"

const validateMessages = {
  required: '${label} is required',
  types: {
    number: '${label} is not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

export default function AddAssetForm({ onClose }) {
  const [coin, setCoin] = useState(null)
  const { crypto, addAsset } = useCrypto()
  const [form] = Form.useForm()
  const [success, setSuccess] = useState(false)
  const assetRef = useRef()

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
    setSuccess(true)
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    addAsset(newAsset)
  };

  const handleAmountChange = (value) => {
    if (value >= 0) {
      const price = form.getFieldValue('price')
      form.setFieldValue('total', +(value * price).toFixed(2))
    }
  }

  const handlePriceChange = (value) => {
    if (value >= 0) {
      const amount = form.getFieldValue('amount')
      form.setFieldValue('total', +(amount * value).toFixed(2))
    }
  }

  if (success) {
    return (
      <Result
        status='success'
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }
  else{
    return (
      <Form
      form={form}
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
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} onChange={handlePriceChange} />
      </Form.Item>


      <Form.Item
        label="Data & time"
        name="date"
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
      >
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>


    </Form>
    )
  }
}