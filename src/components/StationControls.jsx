import {
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
  showTimeRange,
  timeRange,
  onTimeRangeChange,
  onRefresh,
  refreshing,
}) {
  return (
    <>
      <section className="control-strip">
        <div className="control-inner container">
          <div className="selectors-row">
            <div className="control-field station-field">
              <Typography.Text className="field-label">Estação Hidrológica</Typography.Text>
              <div className="station-select-row">
              <Select
                aria-label="Estação Hidrológica"
                value={selectedStationId}
                onChange={onStationChange}
                options={stations.map((item) => ({
                  value: item.id,
                  label: `${item.name} (${item.id})`,
                }))}
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
            {showTimeRange && (
              <div className="control-field timeframe-field">
              <Typography.Text className="field-label">Janela de Tempo</Typography.Text>
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
              </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="station-details">
        <div className="control-inner container">
          <Descriptions className="station-metadata" size="small" column={{ xs: 1, md: 2, xl: 3 }}>
            <Descriptions.Item label={<><EnvironmentOutlined /> Código da estação</>}>
              {station.id}
            </Descriptions.Item>
            <Descriptions.Item label={<><ThunderboltOutlined /> Origem dos dados</>}>
              {station.dataMode === 'simulation' ? 'Simulação' : station.dataMode}
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
