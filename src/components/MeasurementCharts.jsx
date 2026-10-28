import { AlertOutlined, CloudOutlined, LineChartOutlined } from '@ant-design/icons'
import { Area, Column } from '@ant-design/plots'
import { Card, Empty, Typography } from 'antd'

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

  const levelConfig = {
    data: readings,
    xField: 'labelHora',
    yField: 'level',
    shapeField: 'smooth',
    height: 240,
    axis: {
      x: { title: false, labelAutoHide: true, labelAutoRotate: false },
      y: { title: false, labelFormatter: (value) => `${value} m` },
    },
    scale: { y: { nice: true } },
    style: { fill: 'linear-gradient(-90deg, #6029a5 0%, #b999dc 100%)', fillOpacity: 0.3, stroke: '#6029a5', lineWidth: 2.5 },
    tooltip: { title: 'labelCompleto' },
  }
  const rainfallConfig = {
    data: readings,
    xField: 'labelHora',
    yField: 'rainfall',
    height: 220,
    axis: {
      x: { title: false, labelAutoHide: true, labelAutoRotate: false },
      y: { title: false, labelFormatter: (value) => `${value} mm` },
    },
    style: { fill: '#fa4165', radiusTopLeft: 4, radiusTopRight: 4 },
    tooltip: { title: 'labelCompleto' },
  }

  return (
    <div className="page-stack">
      <Card
        title={<span className="card-title"><LineChartOutlined /> Série Histórica do Nível do Rio (metros)</span>}
        extra={<Typography.Text type="secondary">Fuso Horário: BRT (UTC-3)</Typography.Text>}
      >
        <Area {...levelConfig} />
      </Card>
      <Card
        title={<span className="card-title"><CloudOutlined /> Série Histórica de Precipitação (mm/h)</span>}
        extra={<Typography.Text type="secondary">Série independente de precipitação</Typography.Text>}
      >
        <Column {...rainfallConfig} />
      </Card>
    </div>
  )
}
