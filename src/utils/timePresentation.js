const locale = 'pt-BR'
const timeZone = 'America/Sao_Paulo'
const location = 'Brasília'
const readingFormatter = new Intl.DateTimeFormat(locale, {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone,
})
const chartAxisFormatter = new Intl.DateTimeFormat(locale, {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone,
})
const chartTooltipFormatter = new Intl.DateTimeFormat(locale, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone,
})
const timeZoneNameFormatter = new Intl.DateTimeFormat(locale, {
  timeZone,
  timeZoneName: 'short',
})
const offsetFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone,
  timeZoneName: 'shortOffset',
})

export const timePresentation = {
  timeZone,

  formatReading(timestamp) {
    const date = new Date(timestamp)
    if (!Number.isFinite(date.getTime())) {
      return {
        labelHora: '—',
        labelData: '—',
        labelCompleto: '—',
      }
    }

    const parts = readingFormatter.formatToParts(date)
    const value = (type) => parts.find((part) => part.type === type)?.value ?? ''
    const labelData = `${value('day')}/${value('month')}`
    const labelHora = `${value('hour')}:${value('minute')}`

    return {
      labelHora,
      labelData,
      labelCompleto: `${labelData} ${labelHora}`,
    }
  },

  formatChartAxis(timestamp) {
    return chartAxisFormatter.format(timestamp)
  },

  formatChartTooltip(timestamp) {
    return chartTooltipFormatter.format(timestamp)
  },

  getLabel(date = new Date()) {
    const timeZoneName = timeZoneNameFormatter.formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value
    const offset = offsetFormatter.formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value
    const utcOffset = offset?.replace(/^GMT/, 'UTC') ?? ''

    return `${timeZoneName} / ${utcOffset} (${location})`
  },
}
