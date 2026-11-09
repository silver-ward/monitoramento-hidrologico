import { useState } from 'react'
import { TableOutlined } from '@ant-design/icons'
import { Card, Table, Typography } from 'antd'

const compareValues = (left, right) => {
  const leftIsValid = Number.isFinite(left)
  const rightIsValid = Number.isFinite(right)

  if (!leftIsValid && !rightIsValid) return 0
  if (!leftIsValid) return -1
  if (!rightIsValid) return 1
  return left - right
}

const formatMeasurement = (value, digits, unit) => {
  if (value === null) return 'null'
  if (!Number.isFinite(value)) return 'NaN'
  return `${value.toFixed(digits)} ${unit}`
}

export default function MeasurementsTable({ readings }) {
  const [page, setPage] = useState(1)
  const [sortState, setSortState] = useState({ columnKey: 'date', order: 'descend' })
  const sortDirections = ['ascend', 'descend', 'ascend']
  const columns = [
    {
      title: 'Data / Hora',
      key: 'date',
      width: '33%',
      sorter: (left, right) => {
        const leftTimestamp = left.timestamp == null ? Number.NaN : Date.parse(String(left.timestamp))
        const rightTimestamp = right.timestamp == null ? Number.NaN : Date.parse(String(right.timestamp))
        return compareValues(leftTimestamp, rightTimestamp)
      },
      sortDirections,
      sortOrder: sortState.columnKey === 'date' ? sortState.order : null,
      render: (_, reading) => {
        const timestamp = reading.timestamp == null ? Number.NaN : Date.parse(String(reading.timestamp))
        if (!Number.isFinite(timestamp)) {
          return <Typography.Text strong>{reading.timestamp === null ? 'null' : 'NaN'}</Typography.Text>
        }

        return (
          <div>
            <Typography.Text strong>{reading.labelHora}</Typography.Text>
            <br />
            <Typography.Text type="secondary">{reading.labelData}</Typography.Text>
          </div>
        )
      },
    },
    {
      title: 'Nível',
      dataIndex: 'level',
      key: 'level',
      width: '33%',
      sorter: (left, right) => compareValues(left.level, right.level),
      sortDirections,
      sortOrder: sortState.columnKey === 'level' ? sortState.order : null,
      render: (level) => <Typography.Text className="level-value">{formatMeasurement(level, 2, 'm')}</Typography.Text>,
    },
    {
      title: 'Chuva',
      dataIndex: 'rainfall',
      key: 'rainfall',
      width: '33%',
      sorter: (left, right) => compareValues(left.rainfall, right.rainfall),
      sortDirections,
      sortOrder: sortState.columnKey === 'rainfall' ? sortState.order : null,
      render: (rainfall) => (
        <Typography.Text
          className={Number.isFinite(rainfall) && rainfall > 0 ? 'rainfall-value' : ''}
          type={Number.isFinite(rainfall) && rainfall > 0 ? undefined : 'secondary'}
        >
          {formatMeasurement(rainfall, 1, 'mm/h')}
        </Typography.Text>
      )
    }
  ]

  return (
    <Card
      className="measurements-card"
      title={
        <div>
          <span className="card-title"><TableOutlined />Consulta de Medições</span>
          <div><Typography.Text type="secondary">{readings.length} resultados</Typography.Text></div>
        </div>
      }
    >
      <Table
        rowKey="tableKey"
        columns={columns}
        dataSource={readings}
        onChange={(pagination, _, sorter, extra) => {
          if (extra.action === 'paginate') {
            setPage(pagination.current)
          } else if (extra.action === 'sort') {
            const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter
            if (activeSorter?.columnKey && activeSorter.order) {
              setSortState({ columnKey: activeSorter.columnKey, order: activeSorter.order })
            }
            setPage(1)
          }
        }}
        locale={{ emptyText: 'Nenhuma medição encontrada para os filtros selecionados.' }}
        tableLayout="fixed"
        pagination={{
          current: page,
          pageSize: 10,
          total: readings.length,
          showSizeChanger: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
        }}
      />
    </Card>
  )
}
