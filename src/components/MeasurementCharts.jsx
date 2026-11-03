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

const chartTimeZone = 'America/Sao_Paulo'
const axisDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: chartTimeZone,
})
const tooltipDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: chartTimeZone,
})

function formatAxisDate(timestamp) {
  return axisDateFormatter.format(timestamp)
}

function formatTooltipDate(timestamp) {
  return tooltipDateFormatter.format(timestamp)
}

export default function MeasurementCharts({ station, readings, timeRange }) {
  if (readings.length === 0) {
    return (
      <Card className="empty-card">
        <Empty
          image={<AlertOutlined className="empty-icon" />}
          description={
            <div>
              <Typography.Title level={5}>Ausência de Leituras Históricas</Typography.Title>
              <Typography.Text>
                A estação selecionada ({station.name}) não enviou pacotes de telemetria nas últimas {timeRange}.
              </Typography.Text>
            </div>
          }
        />
      </Card>
    )
  }

  const chartReadings = readings.map((reading) => ({
    ...reading,
    timestampMs: new Date(reading.timestamp).getTime(),
  }))

  return (
    <div className="page-stack">
      <Card
        title={<span className="card-title"><LineChartOutlined /> Série Histórica do Nível do Rio (metros)</span>}
        extra={<Typography.Text type="secondary">Fuso Horário: BRT (UTC-3)</Typography.Text>}
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartReadings} margin={{ top: 8, right: 12, bottom: 24, left: 8 }}>
            <defs>
              <linearGradient id="levelFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6029a5" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#b999dc" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#eee8f5" />
            <XAxis
              dataKey="timestampMs"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickCount={8}
              tickFormatter={formatAxisDate}
              minTickGap={24}
              angle={-30}
              textAnchor="end"
              height={48}
              tick={{ fill: '#706783', fontSize: 11 }}
              axisLine={{ stroke: '#d9d2e3' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value} m`}
              tick={{ fill: '#706783', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={56}
              domain={['auto', 'auto']}
            />
            <Tooltip
              labelFormatter={formatTooltipDate}
              formatter={(value) => [`${Number(value).toFixed(2)} m`, 'Nível']}
              contentStyle={{ borderColor: '#e8e1f0', borderRadius: 8 }}
            />
            <Area
              type="monotone"
              dataKey="level"
              name="Nível"
              stroke="#6029a5"
              strokeWidth={2.5}
              fill="url(#levelFill)"
              activeDot={{ r: 5, strokeWidth: 0 }}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card
        title={<span className="card-title"><CloudOutlined /> Série Histórica de Precipitação (mm/h)</span>}
        extra={<Typography.Text type="secondary">Série independente de precipitação</Typography.Text>}
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartReadings} margin={{ top: 8, right: 12, bottom: 24, left: 8 }}>
            <CartesianGrid vertical={false} stroke="#eee8f5" />
            <XAxis
              dataKey="timestampMs"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickCount={8}
              tickFormatter={formatAxisDate}
              minTickGap={24}
              angle={-30}
              textAnchor="end"
              height={48}
              tick={{ fill: '#706783', fontSize: 11 }}
              axisLine={{ stroke: '#d9d2e3' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value} mm`}
              tick={{ fill: '#706783', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={56}
              domain={[0, 'auto']}
            />
            <Tooltip
              labelFormatter={formatTooltipDate}
              formatter={(value) => [`${Number(value).toFixed(1)} mm/h`, 'Precipitação']}
              contentStyle={{ borderColor: '#e8e1f0', borderRadius: 8 }}
            />
            <Bar
              dataKey="rainfall"
              name="Precipitação"
              fill="#fa4165"
              radius={[4, 4, 0, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
