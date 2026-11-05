import { useState } from 'react'
import {
  DashboardOutlined,
  LineChartOutlined,
  MenuOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Menu } from 'antd'
import cogmoLogo from '../../img/cogmo-logo.png'

const mobileMenuLabel = 'Mais medições'

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

  const handleLogoClick = (event) => {
    event.preventDefault()
    onNavigate('overview')
    setDrawerOpen(false)
  }

  return (
    <header className="app-header">
      <div className="header-inner container">
        <a className="brand" href="#" onClick={handleLogoClick} aria-label="Cogmo Technology - Visão Geral">
          <img className="brand-logo" src={cogmoLogo} alt="Cogmo Technology" />
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
            Suporte
          </Button>
          <Button
            className="mobile-menu-button"
            type="text"
            aria-label={`Abrir menu: ${mobileMenuLabel}`}
            onClick={() => setDrawerOpen(true)}
          >
            <span>{mobileMenuLabel}</span>
            <MenuOutlined />
          </Button>
        </div>
      </div>
      <Drawer
        rootClassName="mobile-drawer"
        classNames={{ mask: 'mobile-drawer-mask' }}
        title={
          <div className="brand">
            <img className="brand-logo" src={cogmoLogo} alt="Cogmo Technology" />
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
          Suporte
        </Button>
      </Drawer>
    </header>
  )
}
