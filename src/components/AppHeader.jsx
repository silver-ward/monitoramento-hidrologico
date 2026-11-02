import { useState } from 'react'
import {
  DashboardOutlined,
  LineChartOutlined,
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

  const handleHomeClick = (event) => {
    event.preventDefault()
    onNavigate('overview')
    setDrawerOpen(false)
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href="/" onClick={handleHomeClick} aria-label="Cogmo Technology - página inicial">
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
            icon={<LineChartOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </div>
      <Drawer
        className="mobile-drawer"
        rootClassName="mobile-drawer-root"
        title={
          <a className="brand" href="/" onClick={handleHomeClick} aria-label="Cogmo Technology - página inicial">
            <span className="brand-name">cogmo</span>
            <span className="brand-subtitle">technology</span>
          </a>
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        size="small"
      >
        <Menu
          className="drawer-nav"
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
