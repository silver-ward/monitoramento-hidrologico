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
    <>
      <section className="control-strip">
        <div className="control-inner">
          <div className="selectors-row">
            <div className="control-field station-field">
              <Typography.Text className="field-label">Estação Hidrológica</Typography.Text>
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
              <Typography.Text className="field-label">Período</Typography.Text>
              <div className="time-controls">
                <Segmented
                  value={timeRange}
                  onChange={onTimeRangeChange}
                  options={[
                    { label: '12 h', value: '12h' },
                    { label: '24 h', value: '24h' },
                    { label: '48 h', value: '48h' },
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
        </div>
      </section>
      <div className="station-metadata-wrap">
        <div className="control-inner">
          <Descriptions className="station-metadata" size="small" column={{ xs: 2, md: 2, xl: 4 }}>
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
      </div>
    </>
  )
}
