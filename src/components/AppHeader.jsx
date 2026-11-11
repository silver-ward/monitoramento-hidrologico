import { useLayoutEffect, useRef, useState } from 'react'
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
  const [visibleItemCount, setVisibleItemCount] = useState(0)
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const actionsRef = useRef(null)
  const measureRef = useRef(null)
  const menuItems = items.map(({ key, label }) => ({
    key,
    label,
    icon: pageIcons[key],
  }))
  const visibleItems = menuItems.slice(0, visibleItemCount)
  const hasHiddenItems = visibleItemCount < menuItems.length

  useLayoutEffect(() => {
    const updateVisibleItems = () => {
      const nav = navRef.current
      const measurements = measureRef.current?.children
      if (!nav || !measurements) return

      const gap = Number.parseFloat(getComputedStyle(measureRef.current).columnGap) || 0
      let usedWidth = 0
      let count = 0

      for (const item of measurements) {
        const itemWidth = item.getBoundingClientRect().width
        const requiredWidth = usedWidth + (count > 0 ? gap : 0) + itemWidth
        if (requiredWidth > nav.clientWidth) break
        usedWidth = requiredWidth
        count += 1
      }

      setVisibleItemCount((currentCount) => (currentCount === count ? currentCount : count))
    }

    updateVisibleItems()
    const observer = new ResizeObserver(updateVisibleItems)
    for (const element of [headerRef.current, navRef.current, actionsRef.current, measureRef.current]) {
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [items])

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
      <div className="header-inner container" ref={headerRef}>
        <a className="brand" href="#" onClick={handleLogoClick} aria-label="Cogmo Technology - Visão Geral">
          <img className="brand-logo" src={cogmoLogo} alt="Cogmo Technology" />
        </a>
        <nav className="header-nav" ref={navRef} aria-label="Navegação principal">
          {visibleItems.map((item) => (
            <Button
              key={item.key}
              className={`header-nav-button${currentPage === item.key ? ' selected' : ''}`}
              type="text"
              aria-current={currentPage === item.key ? 'page' : undefined}
              onClick={() => handleNavigate({ key: item.key })}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
        <div className="header-nav-measure" ref={measureRef} aria-hidden="true">
          {menuItems.map((item) => (
            <Button key={item.key} className="header-nav-button" type="text" tabIndex={-1}>
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
        <div className="header-actions" ref={actionsRef}>
          <Button className="contact-button" type="primary" onClick={onContact}>
            Suporte
          </Button>
          {hasHiddenItems && (
            <Button
              className="mobile-menu-button"
              type="text"
              aria-label={`Abrir menu: ${mobileMenuLabel}`}
              onClick={() => setDrawerOpen(true)}
            >
              <span>{mobileMenuLabel}</span>
              <MenuOutlined />
            </Button>
          )}
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
