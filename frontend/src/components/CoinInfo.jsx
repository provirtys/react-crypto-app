import { Typography, Flex } from "antd"

export default ({coin, withSymbol}) => {
  return (
    <Flex align='center' gap='1rem'>
    <img src={coin.icon} alt={coin.name} style={{ width: '40px' }} />
    <Typography.Title level={2} style={{ marginBottom: 0 }}>
      {withSymbol && `(${coin.symbol})`} {coin.name}
      </Typography.Title>
  </Flex>
  )
}