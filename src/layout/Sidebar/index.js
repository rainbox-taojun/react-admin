import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import routes from '../../routes/'

const { SubMenu } = Menu
const { Sider } = Layout

@withRouter
class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: true,
      openKeys: [],
      selectedKeys: []
    }
  }

  UNSAFE_componentWillMount() {
    const pathname = this.props.location.pathname
    this.setMenuSelect(pathname)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
        openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))],
        selectedKeys: [pathname]
      })
    }
  }
  
  onOpenChange = (openKeys) => {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      return
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1]
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }

  render() {
    const pathname = this.props.location.pathname
    const rank = pathname.split('/')
    const currentRouter = routes.find(item => item.name === rank[1])
    console.log(currentRouter)
    const { openKeys, selectedKeys, sidebarVisible } = this.state
    if (!(sidebarVisible && Reflect.has(currentRouter, 'children') && currentRouter.children.length > 0)) {
      return ''
    }
    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          style={{ height: '100%', borderRight: 0 }}
          onOpenChange={this.onOpenChange}
          onClick={({key}) => this.setState({selectedKeys: [key]})}
        >
          {
            currentRouter.children.map(item => {
              return SidebarItem(item)
            })
          }
        </Menu>
      </Sider>
    )
  }
}


function SidebarItem(routes) {
  if (Reflect.has(routes, 'children') && routes.children.length > 0) {
    return (
      <SubMenu key={routes.path}  title={routes.name}>
        {
          routes.children.map(item => {
            return SidebarItem(item)
          })
        }
      </SubMenu>
    )
  } else {
    return (
      <Menu.Item key={routes.path}>
        <Link to={routes.path}>
          {routes.name}
        </Link>
      </Menu.Item>
    )
  }
}

export default Sidebar