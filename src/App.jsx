import { Layout } from 'antd';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

export default function App() {
  return (<Layout style={layoutStyle}>
    <Layout>
      <Layout.Sider width="25%" style={siderStyle}>
        Sider
      </Layout.Sider>
      <Layout.Content style={contentStyle}>Content</Layout.Content>
    </Layout>
  </Layout>)
}