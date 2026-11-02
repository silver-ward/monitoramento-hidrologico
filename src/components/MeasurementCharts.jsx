import { AlertOutlined, CloudOutlined, LineChartOutlined } from '@ant-design/icons'
import { Card, Empty, Typography } from 'antd'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import LevelAreaChart from './LevelAreaChart.jsx'

export default function MeasurementCharts({ station, readings, timeRange }) {
  if (readings.length === 0) {
    return (
      <Card className="empty-card">
        <Empty
          image={<AlertOutlined className="empty-icon" />}
          description={
            <div>
              <Typography.Title level={5}>Ausência de Leituras Históricas (RF09)</Typography.Title>
              <Typography.Text>
                A estação selecionada ({station.name}) não enviou pacotes de telemetria nas últimas {timeRange}.
              </Typography.Text>
            </div>
          }
        />
      </Card>
    )
  }

  return (
    <div className="page-stack">
      <Card
        title={<span className="card-title"><LineChartOutlined /> Série Histórica do Nível do Rio (metros) - RF06</span>}
        extra={<Typography.Text type="secondary">Fuso Horário: BRT (UTC-3)</Typography.Text>}
      >
        <LevelAreaChart readings={readings} />
      </Card>
      <Card
        title={<span className="card-title"><CloudOutlined /> Série Histórica de Precipitação (mm/h) - RF07</span>}
        extra={<Typography.Text type="secondary">Série independente de precipitação</Typography.Text>}
      >
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={readings} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="labelHora"
                tickLine={false}
                axisLine={false}
                minTickGap={24}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `${value} mm`}
                tickLine={false}
                axisLine={false}
                width={52}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                labelFormatter={(value, payload) => payload?.[0]?.payload?.labelCompleto ?? value}
                formatter={(value) => [`${Number(value).toFixed(1)} mm/h`, 'Precipitação']}
              />
              <Bar dataKey="rainfall" name="Precipitação" fill="#e91e63" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
