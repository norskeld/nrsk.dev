import { isServer } from './env'

/**
 * Because Safari is "technically challenged" and can't into smooth scrolling. This won't be loaded
 * if the client supports smooth scrolling natively.
 */
export function smoothScrollPolyfill() {
  if (!isServer()) {
    if (!('scrollBehavior' in document.documentElement.style)) {
      import('smoothscroll-polyfill').then((poly) => poly.polyfill())
    }
  }
}
