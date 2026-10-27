import { useState } from 'react'
import {
  DashboardOutlined,
  LineChartOutlined,
  MenuOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Menu } from 'antd'

const pageIcons = {
  overview: <DashboardOutlined />,
  charts: <LineChartOutlined />,
  table: <TableOutlined />,
}

export default function AppHeader({ items, currentPage, onNavigate, onContact }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuItems = items.map(({ key, label }) => ({
    key,
    label,
    icon: pageIcons[key],
  }))

  const handleNavigate = ({ key }) => {
    onNavigate(key)
    setDrawerOpen(false)
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href="#" onClick={(event) => event.preventDefault()} aria-label="Cogmo Technology">
          <span className="brand-name">cogmo</span>
          <span className="brand-subtitle">technology</span>
        </a>
        <Menu
          className="desktop-nav"
          mode="horizontal"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={handleNavigate}
        />
        <div className="header-actions">
          <Button className="contact-button" type="primary" onClick={onContact}>
            Vamos Conversar?
          </Button>
          <Button
            className="mobile-menu-button"
            type="text"
            aria-label="Abrir menu"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </div>
      <Drawer
        title={
          <div className="brand">
            <span className="brand-name">cogmo</span>
            <span className="brand-subtitle">technology</span>
          </div>
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        size="small"
      >
        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={handleNavigate}
        />
        <Button className="drawer-contact" type="primary" block onClick={onContact}>
          Vamos Conversar?
        </Button>
      </Drawer>
    </header>
  )
}
