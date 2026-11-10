import {
  CloudOutlined,
  LineChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { Card, Row, Col, Statistic, Typography } from 'antd'

export default function Overview({ lastReading }) {
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
              title={<><CloudOutlined /> Última Chuva</>}
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
