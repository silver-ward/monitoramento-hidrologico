import { useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined, SwapOutlined, TableOutlined } from '@ant-design/icons'
import { Button, Card, Segmented, Table, Tag, Typography } from 'antd'

export default function MeasurementsTable({
  readings,
  filterRain,
  onFilterChange,
  sortOrder,
  onSortChange,
}) {
  const [page, setPage] = useState(1)
  const columns = [
    {
      title: 'Data / Horário (BRT)',
      key: 'date',
      width: '35%',
      render: (_, reading) => (
        <div>
          <Typography.Text strong>{reading.labelHora}</Typography.Text>
          <br />
          <Typography.Text type="secondary">{reading.labelData}</Typography.Text>
        </div>
      ),
    },
    {
      title: 'Nível (m)',
      dataIndex: 'level',
      key: 'level',
      width: '25%',
      render: (level) => <Typography.Text className="level-value">{level.toFixed(2)} m</Typography.Text>,
    },
    {
      title: 'Precipitação (mm/h)',
      dataIndex: 'rainfall',
      key: 'rainfall',
      width: '25%',
      render: (rainfall) => (
        <Typography.Text className={rainfall > 0 ? 'rainfall-value' : ''} type={rainfall > 0 ? undefined : 'secondary'}>
          {rainfall.toFixed(1)} mm/h
        </Typography.Text>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'rainfall',
      key: 'status',
      width: '15%',
      render: (rainfall) => <Tag color={rainfall > 0 ? '#fa4165' : 'default'}>{rainfall > 0 ? 'Chuva' : 'Seco'}</Tag>,
    },
  ]

  return (
    <Card
      title={
        <div>
          <span className="card-title"><TableOutlined /> Consulta Analítica de Medições (RF10 e RF11)</span>
          <div><Typography.Text type="secondary">Total de registos encontrados: {readings.length}</Typography.Text></div>
        </div>
      }
      extra={
        <div className="table-actions">
          <Segmented
            value={filterRain}
            onChange={(value) => {
              onFilterChange(value)
              setPage(1)
            }}
            options={[
              { label: 'Todos', value: 'all' },
              { label: 'Com Chuva', value: 'rain' },
              { label: 'Sem Chuva', value: 'dry' },
            ]}
          />
          <Button
            icon={sortOrder === 'desc' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
            onClick={onSortChange}
          >
            {sortOrder === 'desc' ? 'Mais Recentes' : 'Mais Antigos'}
            <SwapOutlined />
          </Button>
        </div>
      }
    >
      <Table
        rowKey="timestamp"
        columns={columns}
        dataSource={readings}
        locale={{ emptyText: 'Nenhuma medição encontrada para os filtros selecionados.' }}
        scroll={{ x: 600 }}
        pagination={{
          current: page,
          pageSize: 10,
          total: readings.length,
          showSizeChanger: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
          onChange: setPage,
        }}
      />
    </Card>
  )
}
