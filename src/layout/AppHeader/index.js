import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import './index.css'
import routes from '../../routes/'

const { Header } = Layout

@withRouter
class AppHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: []
    }
  }

  UNSAFE_componentWillMount() {
    const pathname = this.props.location.pathname
    this.setMenuSelect(pathname)
  }

  componentWillReceiveProps(nextProps) {
    //当点击面包屑导航时，侧边栏要同步响应
    const pathname = nextProps.location.pathname
    if (this.props.location.pathname !== pathname) {
      this.setMenuSelect(pathname)
    }
  }

  setMenuSelect(pathname) {
    const rank = pathname.split('/')
    if (rank.length === 2) {
      this.setState({
        selectedKeys: [pathname]
      })
    } else {
      this.setState({
        selectedKeys: [`/${rank[1]}`]
      })
    }
  }

  render() {
    const { selectedKeys } = this.state
    return (
      <Header className="header">
        <div className="logo" />
        <Menu 
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          onClick={({key}) => this.setState({selectedKeys: [key]})}
        >
          {
            routes.map(item => {
              return (
                <Menu.Item key={item.path}>
                  <Link to={item.redirect || item.path}>
                    {item.name}
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Header>
    )
  }
  
}

export default AppHeader