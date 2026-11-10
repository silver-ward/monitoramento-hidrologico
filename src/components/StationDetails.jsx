import {
  ClockCircleOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  NumberOutlined,
} from '@ant-design/icons'
import { Descriptions } from 'antd'

export default function StationDetails({ station, timePresentation }) {
  return (
    <div className="station-details">
      <div className="control-inner container">
        <Descriptions className="station-metadata" size="small" column={{ xs: 1, md: 2, xl: 3 }}>
          <Descriptions.Item label={<><NumberOutlined /> Código da estação</>}>
            {station.id}
          </Descriptions.Item>
          <Descriptions.Item label={<><EnvironmentOutlined /> Estação</>}>
            {station.name ?? 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label={<><EnvironmentOutlined /> Rio</>}>
            {station.river ?? 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label={<><EnvironmentOutlined /> Município</>}>
            {station.municipality ?? 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label={<><DatabaseOutlined /> Origem dos dados</>}>
            {station.dataMode === 'simulation' ? 'Simulação' : station.dataMode}
          </Descriptions.Item>
          <Descriptions.Item label={<><ClockCircleOutlined /> Fuso horário</>}>
            {timePresentation.getLabel()}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}
