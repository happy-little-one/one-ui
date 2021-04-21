import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import { RouteItem } from '@/routes'

export interface MenuProps {
  routes: RouteItem[]
}

const { Item, SubMenu } = Menu

const renderRoutes = (routes: RouteItem[]) =>
  routes.map(({ name, path, icon: Icon, routes }) =>
    routes ? (
      <SubMenu
        key={path}
        title={
          <span>
            {Icon && <Icon style={{ fontSize: 16 }} />}
            <span>{name}</span>
          </span>
        }
      >
        {renderRoutes(routes)}
      </SubMenu>
    ) : (
      <Item key={path}>
        {Icon && <Icon style={{ fontSize: 16 }} />}
        {name}
      </Item>
    ),
  )

const AppMenu = ({ routes }: MenuProps) => {
  const history = useHistory()
  const { pathname } = useLocation()

  const paths = pathname
    .split('/')
    .filter(Boolean)
    .map((_, index, arr) => `/${arr.slice(0, index + 1).join('/')}`)

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultOpenKeys={paths}
      selectedKeys={paths}
      onClick={({ key }) => history.push(key as string)}
    >
      {renderRoutes(routes)}
    </Menu>
  )
}

export default AppMenu
