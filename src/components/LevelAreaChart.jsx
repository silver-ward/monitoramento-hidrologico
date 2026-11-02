import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function LevelAreaChart({ readings, height = 240 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={readings} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
          <defs>
            <linearGradient id="riverLevelFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="labelHora"
            tickLine={false}
            axisLine={false}
            minTickGap={24}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => `${value} m`}
            tickLine={false}
            axisLine={false}
            width={48}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip
            labelFormatter={(value, payload) => payload?.[0]?.payload?.labelCompleto ?? value}
            formatter={(value) => [`${Number(value).toFixed(2)} m`, 'Nível do rio']}
          />
          <Area
            type="monotone"
            dataKey="level"
            name="Nível do rio"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#riverLevelFill)"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
