import {
  AlertOutlined,
  CloudOutlined,
  LineChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { Area } from '@ant-design/plots'
import { Button, Card, Empty, Row, Col, Statistic, Tag, Typography } from 'antd'

function LevelChart({ readings, compact = false }) {
  const config = {
    data: readings,
    xField: 'labelCompleto',
    yField: 'level',
    shapeField: 'smooth',
    height: compact ? 200 : 240,
    axis: {
      x: { title: false, labelAutoHide: true, labelAutoRotate: false },
      y: { title: false, labelFormatter: (value) => `${value} m` },
    },
    scale: { y: { nice: true } },
    style: { fill: 'linear-gradient(-90deg, #6029a5 0%, #b999dc 100%)', fillOpacity: 0.3, stroke: '#6029a5', lineWidth: 2.5 },
    tooltip: { title: 'labelCompleto' },
  }

  return <Area {...config} />
}

function EmptyReadings({ description = 'Nenhum registro telemétrico disponível para esta estação.' }) {
  return (
    <Empty
      image={<AlertOutlined className="empty-icon" />}
      description={description}
    />
  )
}

export default function Overview({
  station,
  readings,
  lastReading,
  timePresentation,
  timeRange,
  onShowCharts,
}) {
  return (
    <div className="page-stack">
      <Row gutter={[16, 16]} className="stats-grid">
        <Col xs={24} md={12}>
          <Card className="stat-card stat-level">
            <Statistic
              title={<><LineChartOutlined /> Último Nível</>}
              value={lastReading ? lastReading.level : '--'}
              precision={lastReading ? 2 : undefined}
              suffix="m"
            />
            <Typography.Text type="secondary">
              {lastReading ? (
                <><CalendarOutlined /> {lastReading.labelCompleto}</>
              ) : 'Sem leituras'}
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="stat-card stat-rain">
            <Statistic
              title={<><CloudOutlined /> Última Precipitação</>}
              value={lastReading ? lastReading.rainfall : '--'}
              precision={lastReading ? 1 : undefined}
              suffix="mm/h"
            />
            <Typography.Text type="secondary">
              {lastReading ? (
                <><CalendarOutlined /> {lastReading.labelCompleto}</>
              ) : 'Sem leituras'}
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
