import {
  AlertOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  ReloadOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Descriptions, Select, Segmented, Typography } from 'antd'

export default function StationControls({
  stations,
  station,
  selectedStationId,
  onStationChange,
  timeRange,
  onTimeRangeChange,
  onRefresh,
  refreshing,
}) {
  return (
    <section className="control-strip">
      <div className="control-inner">
        <div className="selectors-row">
          <div className="control-field station-field">
            <Typography.Text className="field-label">Estação Hidrológica (RF01 / RF02)</Typography.Text>
            <Select
              aria-label="Estação Hidrológica"
              value={selectedStationId}
              onChange={onStationChange}
              options={stations.map((item) => ({
                value: item.id,
                label: `${item.name} (${item.status})`,
              }))}
            />
          </div>
          <div className="control-field">
            <Typography.Text className="field-label">Janela de Tempo (RF08)</Typography.Text>
            <div className="time-controls">
              <Segmented
                value={timeRange}
                onChange={onTimeRangeChange}
                options={[
                  { label: '12 Horas', value: '12h' },
                  { label: '24 Horas', value: '24h' },
                  { label: '48 Horas', value: '48h' },
                ]}
              />
              <Button
                aria-label="Atualizar dados"
                title="Atualizar dados"
                icon={<ReloadOutlined spin={refreshing} />}
                loading={refreshing}
                onClick={onRefresh}
              />
            </div>
          </div>
        </div>
        <Descriptions className="station-metadata" size="small" column={{ xs: 1, md: 2, xl: 4 }}>
          <Descriptions.Item label={<><EnvironmentOutlined /> Município</>}>
            {station.city} - {station.state}
          </Descriptions.Item>
          <Descriptions.Item label={<><ThunderboltOutlined /> Corpo Hídrico</>}>
            {station.river}
          </Descriptions.Item>
          <Descriptions.Item label={<><AlertOutlined /> Cota de Alerta</>}>
            {station.alertLevel.toFixed(2)} m
          </Descriptions.Item>
          <Descriptions.Item label={<><FieldTimeOutlined /> Fuso</>}>
            América/São Paulo (BRT, UTC-3)
          </Descriptions.Item>
        </Descriptions>
      </div>
    </section>
  )
}
