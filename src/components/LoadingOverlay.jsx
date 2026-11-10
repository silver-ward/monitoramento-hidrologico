import { ReloadOutlined } from '@ant-design/icons'

export default function LoadingOverlay({ loading }) {
  return (
    <div
      aria-hidden={!loading}
      aria-label="Carregando dados"
      aria-live="polite"
      className={`loading-overlay${loading ? ' loading-overlay-active' : ''}`}
      role="status"
    >
      <span className="loading-spinner-position">
        <ReloadOutlined className="loading-overlay-icon" spin={loading} />
      </span>
    </div>
  )
}
