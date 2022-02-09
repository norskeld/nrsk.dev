import Script from 'next/script'

interface AnalyticsProps {
  id?: string
  host?: string
  tracker?: string
}

function hasValidAnalyticsProps({ id, host, tracker }: AnalyticsProps) {
  const isValidId = typeof id === 'string' && id.length
  const isValidHost = typeof host === 'string' && host.length
  const isValidTracker = typeof tracker === 'string' && tracker.length

  return isValidId && isValidHost && isValidTracker
}

export default function Analytics({ id, host, tracker }: AnalyticsProps) {
  return hasValidAnalyticsProps({ id, host, tracker }) ? (
    <Script
      strategy="afterInteractive"
      src={`${host}/${tracker}`}
      data-ackee-server={host}
      data-ackee-domain-id={id}
    />
  ) : null
}
