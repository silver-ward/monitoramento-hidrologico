import { useMemo, useState } from 'react'
import { App as AntdApp, Layout } from 'antd'
import AppHeader from './components/AppHeader.jsx'
import MeasurementCharts from './components/MeasurementCharts.jsx'
import MeasurementsTable from './components/MeasurementsTable.jsx'
import Overview from './components/Overview.jsx'
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
  const [refreshing, setRefreshing] = useState(false)

  const currentStation = stations.find((station) => station.id === selectedStationId) ?? stations[0]
  const displayedReadings = useMemo(() => {
    if (currentStation.readings.length === 0) return []

    const hours = Number.parseInt(timeRange, 10)
    return currentStation.readings.slice(-hours).map((reading) => ({
      ...reading,
      ...timePresentation.formatReading(reading.timestamp),
    }))
  }, [currentStation, timeRange])

  const lastReading = displayedReadings.at(-1) ?? null
  const tableData = useMemo(
    () => displayedReadings
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
      }),
    [displayedReadings],
  )

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
        station={currentStation}
        selectedStationId={selectedStationId}
        onStationChange={setSelectedStationId}
        showTimeRange={currentPage === 'charts' || currentPage === 'table'}
        timePresentation={timePresentation}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

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

      <Layout.Footer className="app-footer">
        <strong>Cogmo Technology</strong> · Projeto Técnico
      </Layout.Footer>
    </Layout>
  )
}

export default function App() {
  return <AppContent />
}
