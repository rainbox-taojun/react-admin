import React from 'react'
import { Layout } from 'antd'
import './index.css'

import AppHeader from '../../layout/AppHeader'
import Sidebar from '../../layout/Sidebar'
import AppBreadcrumb from '../../layout/AppBreadcrumb'
import ContentMain from '../../layout/ContentMain'

const { Content } = Layout

function Index() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <AppBreadcrumb />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <ContentMain />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Index