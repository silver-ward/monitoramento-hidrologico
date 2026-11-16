import {
  CloudOutlined,
  LineChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { Card, Row, Col, Statistic, Typography } from 'antd'

function ObservationStatistic({ observation, title, icon, precision, suffix, timePresentation }) {
  const hasValue = observation?.value !== null && observation?.value !== undefined

  return (
    <Card className={`stat-card ${title === 'Último Nível' ? 'stat-level' : 'stat-rain'}`}>
      <Statistic
        title={<>{icon} {title}</>}
        value={hasValue ? observation.value : '--'}
        precision={hasValue ? precision : undefined}
        suffix={suffix}
      />
      <Typography.Text type="secondary">
        {hasValue ? (
          <><CalendarOutlined /> {timePresentation.formatReading(observation.observedAt).labelCompleto}</>
        ) : 'Sem leituras'}
      </Typography.Text>
    </Card>
  )
}

export default function Overview({ latest, timePresentation }) {
  return (
    <div className="page-stack">
      <Row gutter={[16, 16]} className="stats-grid">
        <Col xs={24} md={12}>
          <ObservationStatistic
            observation={latest?.level}
            title="Último Nível"
            icon={<LineChartOutlined />}
            precision={2}
            suffix="m"
            timePresentation={timePresentation}
          />
        </Col>
        <Col xs={24} md={12}>
          <ObservationStatistic
            observation={latest?.rain}
            title="Última Chuva"
            icon={<CloudOutlined />}
            precision={1}
            suffix="mm/h"
            timePresentation={timePresentation}
          />
        </Col>
      </Row>
    </div>
  )
}
