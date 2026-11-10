import { useEffect, useRef, useState } from 'react'
import { App as AntdApp, Layout } from 'antd'
import AppHeader from './components/AppHeader.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import MeasurementCharts from './components/MeasurementCharts.jsx'
import MeasurementsTable from './components/MeasurementsTable.jsx'
import Overview from './components/Overview.jsx'
import StationDetails from './components/StationDetails.jsx'
import StationControls from './components/StationControls.jsx'
import { stations } from './data/readings.js'
import { timePresentation } from './utils/timePresentation.js'
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
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const loadingTimeout = useRef(null)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setLoading(false))
    return () => {
      window.cancelAnimationFrame(frameId)
      if (loadingTimeout.current !== null) {
        window.clearTimeout(loadingTimeout.current)
      }
    }
  }, [])

  const currentStation = stations.find((station) => station.id === selectedStationId) ?? stations[0]
  const hours = Number.parseInt(timeRange, 10)
  const displayedReadings = currentStation.readings.slice(-hours).map((reading) => ({
    ...reading,
    ...timePresentation.formatReading(reading.timestamp),
  }))

  const lastReading = displayedReadings.at(-1) ?? null
  const tableData = displayedReadings
    .map((reading, index) => ({
      ...reading,
      tableKey: `${reading.timestamp ?? 'missing'}-${index}`,
    }))
    .toSorted((a, b) => {
      const aTimestamp = a.timestamp == null ? Number.NaN : Date.parse(String(a.timestamp))
      const bTimestamp = b.timestamp == null ? Number.NaN : Date.parse(String(b.timestamp))
      const aIsValid = Number.isFinite(aTimestamp)
      const bIsValid = Number.isFinite(bTimestamp)

      if (!aIsValid && !bIsValid) return 0
      if (!aIsValid) return 1
      if (!bIsValid) return -1
      return bTimestamp - aTimestamp
    })

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const beginLoading = (isRefresh = false) => {
    if (loadingTimeout.current !== null) {
      window.clearTimeout(loadingTimeout.current)
    }

    setLoading(true)
    setRefreshing(isRefresh)

    loadingTimeout.current = window.setTimeout(() => {
      setLoading(false)
      setRefreshing(false)
      loadingTimeout.current = null
    }, 300)
  }

  const handleStationChange = (stationId) => {
    setSelectedStationId(stationId)
    beginLoading()
  }

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
    beginLoading()
  }

  const handleRefresh = () => {
    beginLoading(true)
  }

  const handleContact = () => {
    modal.info({
      title: 'Suporte',
      content: 'Cogmo: contato@cogmo.com.br',
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
        selectedStationId={selectedStationId}
        onStationChange={handleStationChange}
        showTimeRange={currentPage === 'charts' || currentPage === 'table'}
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
      <div aria-busy={loading} className={`data-view-area${loading ? ' data-view-area-loading' : ''}`}>
        <StationDetails station={currentStation} timePresentation={timePresentation} />
        <Layout.Content className="content-area container">
          {currentPage === 'overview' && (
            <Overview
              station={currentStation}
              readings={displayedReadings}
              lastReading={lastReading}
              timePresentation={timePresentation}
              timeRange={timeRange}
              onShowCharts={() => navigateTo('charts')}
            />
          )}
          {currentPage === 'charts' && (
            <MeasurementCharts
              station={currentStation}
              readings={displayedReadings}
              timePresentation={timePresentation}
              timeRange={timeRange}
            />
          )}
          {currentPage === 'table' && (
            <MeasurementsTable
              key={`${currentStation.id}-${timeRange}`}
              readings={tableData}
            />
          )}
        </Layout.Content>
        {loading && <LoadingOverlay loading />}
      </div>

      <Layout.Footer className="app-footer">
        <strong>Cogmo Technology</strong> · Projeto Técnico
      </Layout.Footer>
    </Layout>
  )
}

export default function App() {
  return <AppContent />
}
