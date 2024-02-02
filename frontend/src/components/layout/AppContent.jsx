import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context'
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem'
};

export default function AppContent() {
  const { assets, crypto } = useCrypto()
  const cryptoPriceMap = crypto.reduce((acc,val) => {
    acc[val.id]=val.price
    return acc
  },{})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title style={{ textAlign: 'left', color: 'white' }} level={3}>
        Portfolio: {
        assets
          .map(asset => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, val) => acc += val, 0)
          .toFixed(2)} 
        $
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Layout.Content>
  )
}