type GtagCommand = 'js' | 'config' | 'event' | 'consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function getMeasurementId(): string {
  return (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()
}

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
}

function loadGaScript(measurementId: string): void {
  if (document.getElementById('ga4-gtag')) return

  const script = document.createElement('script')
  script.id = 'ga4-gtag'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)

  ensureGtag()
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  })
}

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined> = {},
): void {
  if (!getMeasurementId() || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

function linkLabel(link: HTMLAnchorElement): string {
  return (
    link.dataset.trackLabel ||
    link.getAttribute('aria-label') ||
    link.textContent?.trim().replace(/\s+/g, ' ') ||
    link.href
  )
}

function classifyLink(link: HTMLAnchorElement): { eventName: string; linkType: string } {
  const href = link.getAttribute('href') || ''
  const track = link.dataset.track

  if (track) return { eventName: track, linkType: track }
  if (link.hasAttribute('data-whatsapp') || href.includes('wa.me') || href.includes('whatsapp.com')) {
    return { eventName: 'whatsapp_click', linkType: 'whatsapp' }
  }
  if (href.startsWith('mailto:')) {
    return { eventName: 'email_click', linkType: 'email' }
  }
  if (href.startsWith('tel:')) {
    return { eventName: 'phone_click', linkType: 'phone' }
  }
  if (link.classList.contains('nav-cta') || link.classList.contains('btn')) {
    return { eventName: 'cta_click', linkType: 'cta' }
  }
  if (href.startsWith('http') && !href.includes(window.location.hostname)) {
    return { eventName: 'outbound_click', linkType: 'outbound' }
  }
  return { eventName: 'link_click', linkType: 'internal' }
}

function initClickTracking(): void {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a')
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute('href')
      if (!href || href === '#') return

      const { eventName, linkType } = classifyLink(link)
      trackEvent(eventName, {
        link_url: link.href,
        link_text: linkLabel(link).slice(0, 100),
        link_type: linkType,
        page_path: window.location.pathname,
      })
    },
    true,
  )
}

export function initAnalytics(): void {
  const measurementId = getMeasurementId()
  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.info('[analytics] VITE_GA_MEASUREMENT_ID is not set - tracking disabled.')
    }
    return
  }

  loadGaScript(measurementId)
  initClickTracking()
}

export type { GtagCommand }
