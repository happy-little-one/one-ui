import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'

import Menu, { MenuProps } from './menu'

const { Header, Sider, Content } = Layout

const AppLayout: FunctionComponent<MenuProps> = ({ routes, children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout>
        <Sider theme="light">
          <Menu routes={routes} />
        </Sider>
        <Content style={{ overflow: 'auto' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
