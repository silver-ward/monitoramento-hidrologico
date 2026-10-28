import { useMemo, useState } from 'react'
import { App as AntdApp, Alert, Layout } from 'antd'
import AppHeader from './components/AppHeader.jsx'
import MeasurementCharts from './components/MeasurementCharts.jsx'
import MeasurementsTable from './components/MeasurementsTable.jsx'
import Overview from './components/Overview.jsx'
import StationControls from './components/StationControls.jsx'
import { stations } from './data/stations.js'
import './App.css'

const pageItems = [
  { key: 'overview', label: 'Visão Geral' },
  { key: 'charts', label: 'Histórico de Medições' },
  { key: 'table', label: 'Consulta de Medições' },
]

function AppContent() {
  const { modal } = AntdApp.useApp()
  const [currentPage, setCurrentPage] = useState('overview')
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id)
  const [timeRange, setTimeRange] = useState('24h')
  const [filterRain, setFilterRain] = useState('all')
  const [sortOrder, setSortOrder] = useState('desc')
  const [refreshing, setRefreshing] = useState(false)

  const currentStation = stations.find((station) => station.id === selectedStationId) ?? stations[0]
  const filteredData = useMemo(() => {
    if (currentStation.readings.length === 0) return []

    const hours = Number.parseInt(timeRange, 10)
    return currentStation.readings.slice(-hours).map((reading) => {
      const date = new Date(reading.timestamp)
      const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

      return {
        ...reading,
        labelHora: time,
        labelData: day,
        labelCompleto: `${day} ${time}`,
      }
    })
  }, [currentStation, timeRange])

  const lastReading = filteredData.at(-1) ?? null
  const tableData = useMemo(() => {
    const data = filteredData.filter((reading) => {
      if (filterRain === 'rain') return reading.rainfall > 0
      if (filterRain === 'dry') return reading.rainfall === 0
      return true
    })

    return data.toSorted((a, b) => {
      const difference = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      return sortOrder === 'desc' ? -difference : difference
    })
  }, [filteredData, filterRain, sortOrder])

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRefresh = () => {
    setRefreshing(true)
    window.setTimeout(() => setRefreshing(false), 500)
  }

  const handleContact = () => {
    modal.info({
      title: 'Vamos conversar?',
      content: 'Canal institucional Cogmo: contato@cogmo.com.br',
      okText: 'Fechar',
    })
  }

  return (
    <Layout className="app-layout">
      <AppHeader
        items={pageItems}
        currentPage={currentPage}
        onNavigate={navigateTo}
        onContact={handleContact}
      />
      <StationControls
        stations={stations}
        station={currentStation}
        selectedStationId={selectedStationId}
        onStationChange={setSelectedStationId}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <Layout.Content className="content-area">
        <Alert
          className="disclaimer"
          showIcon
          type="info"
          title="Aviso"
          description="Todas as estações e medições utilizadas são fictícias, sem finalidade operacional. Não devem fundamentar alertas ou decisões de segurança."
        />

        {currentPage === 'overview' && (
          <Overview
            station={currentStation}
            readings={filteredData}
            lastReading={lastReading}
            timeRange={timeRange}
            onShowCharts={() => navigateTo('charts')}
          />
        )}
        {currentPage === 'charts' && (
          <MeasurementCharts station={currentStation} readings={filteredData} timeRange={timeRange} />
        )}
        {currentPage === 'table' && (
          <MeasurementsTable
            key={`${currentStation.id}-${timeRange}`}
            readings={tableData}
            filterRain={filterRain}
            onFilterChange={setFilterRain}
            sortOrder={sortOrder}
            onSortChange={() => setSortOrder((order) => (order === 'desc' ? 'asc' : 'desc'))}
          />
        )}
      </Layout.Content>

      <Layout.Footer className="app-footer">
        <strong>Cogmo Technology</strong> · Projeto Técnico
        <div>Todas as estações e medições utilizadas são fictícias, sem finalidade operacional. Não devem fundamentar alertas ou decisões de segurança.</div>
      </Layout.Footer>
    </Layout>
  )
}

export default function App() {
  return <AppContent />
}
