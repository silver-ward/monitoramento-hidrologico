import { AlertOutlined, LineChartOutlined } from '@ant-design/icons'
import { Area } from '@ant-design/plots'
import { Button, Card, Empty, Row, Col, Statistic, Tag, Typography } from 'antd'

function LevelChart({ readings, compact = false }) {
  const config = {
    data: readings,
    xField: 'labelHora',
    yField: 'level',
    shapeField: 'smooth',
    height: compact ? 200 : 240,
    axis: {
      x: { title: false, labelAutoHide: true, labelAutoRotate: false },
      y: { title: false, labelFormatter: (value) => `${value} m` },
    },
    scale: { y: { nice: true } },
    style: { fill: 'linear-gradient(-90deg, #2563eb 0%, #93c5fd 100%)', fillOpacity: 0.3, stroke: '#2563eb', lineWidth: 2.5 },
    tooltip: { title: 'labelCompleto' },
  }

  return <Area {...config} />
}

function EmptyReadings({ description = 'Nenhum registo telemétrico disponível para esta estação.' }) {
  return (
    <Empty
      image={<AlertOutlined className="empty-icon" />}
      description={description}
    />
  )
}

export default function Overview({ station, readings, lastReading, timeRange, onShowCharts }) {
  return (
    <div className="page-stack">
      <Row gutter={[16, 16]} className="stats-grid">
        <Col xs={24} md={8}>
          <Card className="stat-card stat-level">
            <Statistic
              title="Último Nível Registado (RF04)"
              value={lastReading ? lastReading.level : '--'}
              precision={lastReading ? 2 : undefined}
              suffix="m"
            />
            <Typography.Text type="secondary">
              {lastReading ? `Medição: ${lastReading.labelCompleto} (BRT)` : 'Sem leituras'}
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="stat-card stat-rain">
            <Statistic
              title="Precipitação Recente (RF05)"
              value={lastReading ? lastReading.rainfall : '--'}
              precision={lastReading ? 1 : undefined}
              suffix="mm/h"
            />
            <Typography.Text type="secondary">
              {lastReading ? (lastReading.rainfall > 0 ? 'Chuva detectada na bacia' : 'Tempo seco no período') : 'Sem dados'}
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="stat-card stat-status">
            <Typography.Text className="field-label">Estado de Transmissão</Typography.Text>
            <div className="status-line">
              <Tag color={station.status === 'Operando' ? 'success' : 'error'}>{station.status}</Tag>
              {lastReading && (
                <Typography.Text type="secondary">
                  Cota segura ({((lastReading.level / station.alertLevel) * 100).toFixed(0)}% do alerta)
                </Typography.Text>
              )}
            </div>
            <Typography.Text type="secondary">Código Telemétrico: {station.code}</Typography.Text>
          </Card>
        </Col>
      </Row>

      <Card
        title={<span className="card-title"><LineChartOutlined /> Tendência Rápida do Nível (Últimas {timeRange})</span>}
        extra={<Button type="link" onClick={onShowCharts}>Ver gráficos completos →</Button>}
      >
        {readings.length === 0
          ? <EmptyReadings />
          : <LevelChart readings={readings} compact />}
      </Card>
    </div>
  )
}
