import React from 'react'
import { Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import routes from '../../routes/'

function getRouterName(routes, url) {
  let name = ''
  for (let i = 0 ; i< routes.length ; i++) {
    if (routes[i].path === url) {
      name = routes[i].name
      break
    } else if (Reflect.has(routes[i],'children') && routes[i].children.length > 0) {
      console.log('item1', routes[i])
      name = getRouterName(routes[i].children, url)
    }
  }
  return name
}

@withRouter
class AppBreadcrumb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {location} = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      const name = getRouterName(routes, url)
      if (name === 'home') {
        return ''
      }
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            { name }
          </Link>
        </Breadcrumb.Item>
      )
    })
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems)

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        { breadcrumbItems }
      </Breadcrumb>
    )
  }
  
}

export default AppBreadcrumb