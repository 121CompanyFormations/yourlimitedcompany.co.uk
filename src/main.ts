import './styles/main.css'
import { initAnalytics } from './analytics'

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('.site-header')
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
  const nav = document.querySelector<HTMLElement>('#primary-nav')

  const onScroll = () => {
    if (!header) return
    header.classList.toggle('is-scrolled', window.scrollY > 8)
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true'
      toggle.setAttribute('aria-expanded', String(!open))
      nav.classList.toggle('is-open', !open)
    })

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false')
        nav.classList.remove('is-open')
      })
    })
  }
}

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal')
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )

  items.forEach((el) => observer.observe(el))
}

function initYear(): void {
  const year = document.querySelectorAll('[data-year]')
  const value = String(new Date().getFullYear())
  year.forEach((el) => {
    el.textContent = value
  })
}

initAnalytics()
initHeader()
initReveal()
initYear()
