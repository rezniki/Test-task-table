import { Layout } from 'antd';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: '20px' }}>📊 Таблица данных</Header>
      <Content style={{ padding: '24px' }}>
        {/* Таблица будет тут */}
      </Content>
    </Layout>
  );
}

export default App;
