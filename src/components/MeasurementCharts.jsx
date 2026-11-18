import { AlertOutlined, CloudOutlined, LineChartOutlined } from '@ant-design/icons'
import { Card, Empty, Typography } from 'antd'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function toChartData(observations, intervalMinutes) {
  const points = observations
    .map((observation) => ({
      timestampMs: Date.parse(observation.observedAt),
      value: observation.value,
    }))
    .filter((point) => Number.isFinite(point.timestampMs))
  const intervalMs = intervalMinutes * 60 * 1000

  return points.flatMap((point, index) => {
    if (index === 0 || !Number.isFinite(intervalMs) || intervalMs <= 0) {
      return [point]
    }

    const previousPoint = points[index - 1]
    const gap = point.timestampMs - previousPoint.timestampMs
    if (gap <= intervalMs * 1.5) {
      return [point]
    }

    return [
      { timestampMs: previousPoint.timestampMs + intervalMs, value: null },
      point,
    ]
  })
}

function EmptyMetric({ label, station, timeRange }) {
  return (
    <Empty
      image={<AlertOutlined className="empty-icon" />}
      description={
        <div>
          <Typography.Title level={5}>Sem dados</Typography.Title>
          <Typography.Text>
            Nenhuma leitura de {label + ' '}
            foi encontrada pela {station?.name ? `${station.name} ` : '-- '}
            nas últimas {timeRange}.
          </Typography.Text>
        </div>
      }
    />
  )
}

function TimeAxis({ timePresentation }) {
  return (
    <XAxis
      dataKey="timestampMs"
      type="number"
      scale="time"
      domain={['dataMin', 'dataMax']}
      tickCount={8}
      tickFormatter={timePresentation.formatChartAxis}
      minTickGap={24}
      angle={-30}
      textAnchor="end"
      tick={{ fill: '#706783', fontSize: '0.6875rem' }}
      axisLine={{ stroke: '#d9d2e3' }}
      tickLine={false}
    />
  )
}

export default function MeasurementCharts({
  station,
  levelObservations,
  rainObservations,
  levelIntervalMinutes,
  rainIntervalMinutes,
  timePresentation,
  timeRange,
}) {
  const levelData = toChartData(levelObservations, levelIntervalMinutes)
  const rainData = toChartData(rainObservations, rainIntervalMinutes)

  return (
    <div className="page-stack">
      <Card title={<span className="card-title"><LineChartOutlined />Histórico de Nível</span>}>
        {levelObservations.length === 0 ? (
          <EmptyMetric label="Nível" station={station} timeRange={timeRange} />
        ) : (
          <ResponsiveContainer width="100%" aspect={1.6}>
            <AreaChart data={levelData} margin={{ top: 8, right: 12, bottom: 24, left: 8 }}>
              <defs>
                <linearGradient id="levelFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6029a5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#b999dc" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eee8f5" />
              <TimeAxis timePresentation={timePresentation} />
              <YAxis
                tickFormatter={(value) => `${value} m`}
                tick={{ fill: '#706783', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width="auto"
                domain={['auto', 'auto']}
              />
              <Tooltip
                labelFormatter={timePresentation.formatChartTooltip}
                formatter={(value) => [`${Number(value).toFixed(2)} m`, 'Nível']}
                contentStyle={{ borderColor: '#e8e1f0', borderRadius: 8 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                name="Nível"
                stroke="#6029a5"
                strokeWidth={2.5}
                fill="url(#levelFill)"
                activeDot={{ r: 5, strokeWidth: 0 }}
                dot={false}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card>
      <Card title={<span className="card-title"><CloudOutlined />Histórico de Chuva</span>}>
        {rainObservations.length === 0 ? (
          <EmptyMetric label="Chuva" station={station} timeRange={timeRange} />
        ) : (
          <ResponsiveContainer width="100%" aspect={1.6}>
            <BarChart data={rainData} margin={{ top: 8, right: 12, bottom: 24, left: 8 }}>
              <CartesianGrid vertical={false} stroke="#eee8f5" />
              <TimeAxis timePresentation={timePresentation} />
              <YAxis
                tickFormatter={(value) => `${value} mm`}
                tick={{ fill: '#706783', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width="auto"
                domain={[0, 'auto']}
              />
              <Tooltip
                labelFormatter={timePresentation.formatChartTooltip}
                formatter={(value) => [`${Number(value).toFixed(1)} mm/h`, 'Chuva']}
                contentStyle={{ borderColor: '#e8e1f0', borderRadius: 8 }}
              />
              <Bar
                dataKey="value"
                name="Chuva"
                fill="#fa4165"
                radius={[4, 4, 0, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  )
}
