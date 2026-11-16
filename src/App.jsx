import { useEffect, useMemo, useState } from 'react'
import { Alert, App as AntdApp, Layout } from 'antd'
import AppHeader from './components/AppHeader.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import MeasurementCharts from './components/MeasurementCharts.jsx'
import MeasurementsTable from './components/MeasurementsTable.jsx'
import Overview from './components/Overview.jsx'
import StationDetails from './components/StationDetails.jsx'
import StationControls from './components/StationControls.jsx'
import StationDAO from './data/DAOs/StationDAO.js'
import ObservationDAO from './data/DAOs/ObservationDAO.js'
import useLevelRain from './hooks/useLevelRain.js'
import { timePresentation } from './utils/timePresentation.js'
import './App.css'

const pageItems = [
  { key: 'overview', label: 'Visão Geral' },
  { key: 'charts', label: 'Histórico de Medições' },
  { key: 'table', label: 'Consulta de Medições' },
]
const stationDAO = new StationDAO()
const observationDAO = new ObservationDAO()
const MAX_SERIES_HOURS = 72

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Ocorreu um erro inesperado ao carregar os dados.'
}

function AppContent() {
  const { modal } = AntdApp.useApp()
  const [currentPage, setCurrentPage] = useState('overview')
  const [stations, setStations] = useState([])
  const [dataMode, setDataMode] = useState(null)
  const [selectedStationId, setSelectedStationId] = useState(null)
  const [timeRange, setTimeRange] = useState('24h')
  const [stationData, setStationData] = useState(null)
  const [stationsLoading, setStationsLoading] = useState(true)
  const [stationDataLoading, setStationDataLoading] = useState(true)
  const [refreshVersion, setRefreshVersion] = useState(0)
  const [stationsError, setStationsError] = useState(null)
  const [stationDataError, setStationDataError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    let active = true

    stationDAO.listStations()
      .then((response) => {
        if (!active) return

        setStations(response.stations)
        setDataMode(response.dataMode)
        if (response.stations.length === 0) {
          setStationDataLoading(false)
          setRefreshing(false)
        }
        setSelectedStationId((currentId) => (
          response.stations.some((station) => station.id === currentId)
            ? currentId
            : response.stations[0]?.id ?? null
        ))
      })
      .catch((error) => {
        if (active) {
          setStationsError(getErrorMessage(error))
          setStationDataLoading(false)
          setRefreshing(false)
        }
      })
      .finally(() => {
        if (active) setStationsLoading(false)
      })

    return () => {
      active = false
    }
  }, [refreshVersion])

  useEffect(() => {
    let active = true
    if (!selectedStationId) {
      return () => {
        active = false
      }
    }

    Promise.all([
      stationDAO.getSummary(selectedStationId),
      observationDAO.listSeries(selectedStationId, 'level', MAX_SERIES_HOURS),
      observationDAO.listSeries(selectedStationId, 'rain', MAX_SERIES_HOURS),
    ])
      .then(([summary, levelSeries, rainSeries]) => {
        if (active) setStationData({ summary, levelSeries, rainSeries })
      })
      .catch((error) => {
        if (active) setStationDataError(getErrorMessage(error))
      })
      .finally(() => {
        if (active) {
          setStationDataLoading(false)
          setRefreshing(false)
        }
      })

    return () => {
      active = false
    }
  }, [selectedStationId, refreshVersion])

  const currentStation = stations.find((station) => station.id === selectedStationId) ?? null
  const hours = Number.parseInt(timeRange, 10)
  const visibleSeries = useMemo(() => {
    if (!stationData) {
      return { level: [], rain: [] }
    }

    const observations = [
      ...stationData.levelSeries.points,
      ...stationData.rainSeries.points,
      stationData.summary.latest.level,
      stationData.summary.latest.rain,
    ]
    const latestTimestamp = observations.reduce((latest, observation) => {
      const timestamp = Date.parse(observation.observedAt ?? '')
      return Number.isFinite(timestamp) ? Math.max(latest, timestamp) : latest
    }, Number.NEGATIVE_INFINITY)

    if (!Number.isFinite(latestTimestamp)) {
      return { level: [], rain: [] }
    }

    const windowStart = latestTimestamp - hours * 60 * 60 * 1000
    const filterWindow = (series) => series.points.filter((observation) => {
      const timestamp = Date.parse(observation.observedAt ?? '')
      return Number.isFinite(timestamp) &&
        timestamp >= windowStart &&
        timestamp <= latestTimestamp
    })

    return {
      level: filterWindow(stationData.levelSeries),
      rain: filterWindow(stationData.rainSeries),
    }
  }, [hours, stationData])
  const tableReadings = useLevelRain(
    visibleSeries.level,
    visibleSeries.rain,
    timePresentation,
  )

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStationChange = (stationId) => {
    setStationData(null)
    setStationDataLoading(true)
    setStationDataError(null)
    setSelectedStationId(stationId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setStationsLoading(true)
    setStationDataLoading(true)
    setStationsError(null)
    setStationDataError(null)
    setStationData(null)
    setRefreshVersion((version) => version + 1)
  }

  const handleContact = () => {
    modal.info({
      title: 'Suporte',
      content: 'Cogmo: contato@cogmo.com.br',
      okText: 'Fechar',
    })
  }

  const loading = stationsLoading || stationDataLoading

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
        {currentStation && (
          <StationDetails
            station={currentStation}
            dataMode={dataMode}
            timePresentation={timePresentation}
          />
        )}
        <Layout.Content className="content-area container">
          {stationsError && <Alert type="error" showIcon message="Falha ao carregar estações" description={stationsError} />}
          {!stationsError && !stationsLoading && stations.length === 0 && (
            <Alert type="warning" showIcon message="Nenhuma estação disponível." />
          )}
          {stationDataError && <Alert type="error" showIcon message="Falha ao carregar medições" description={stationDataError} />}
          {!stationsError && !stationDataError && currentPage === 'overview' && (
            <Overview
              latest={stationData?.summary.latest ?? null}
              timePresentation={timePresentation}
            />
          )}
          {!stationsError && !stationDataError && currentPage === 'charts' && (
            <MeasurementCharts
              station={currentStation}
              levelObservations={visibleSeries.level}
              rainObservations={visibleSeries.rain}
              levelIntervalMinutes={stationData?.levelSeries.intervalMinutes}
              rainIntervalMinutes={stationData?.rainSeries.intervalMinutes}
              timePresentation={timePresentation}
              timeRange={timeRange}
            />
          )}
          {!stationsError && !stationDataError && currentPage === 'table' && (
            <MeasurementsTable
              key={`${selectedStationId}-${timeRange}`}
              readings={tableReadings}
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
