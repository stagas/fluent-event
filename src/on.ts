import { FluentFlags } from 'fluent-flags'

function onEvent<T extends HTMLElement | SVGElement | Window, K extends keyof WindowEventMap>(
  el: T,
  type: K,
  listener?: (ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): () => void
function onEvent<T extends SVGElement, K extends keyof SVGElementEventMap>(
  el: T,
  type: K,
  listener?: (ev: SVGElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): () => void
function onEvent<T extends HTMLElement, K extends keyof HTMLElementEventMap>(
  el: T,
  type: K,
  listener?: (ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  el.addEventListener(type, listener!, options)
  return () => off(el, type, listener!, options)
}

/**
 * Adds a DOM event `listener` to an event `type` using `options` and returns its remover.
 *
 * Flags: `active` | `capture` | `once` | `passive`
 *
 * ```ts
 * on()(btn, 'click', fn)
 * on().once(btn, 'click', fn)
 * on().passive(div, 'wheel', fn)
 *
 * const off = on().passive.capture(btn, 'wheel', fn)
 * // ...later...
 * off() // remove listener
 * ```
 */
export const on = () =>
  FluentFlags<'active' | 'capture' | 'once' | 'passive'>(flags =>
    ((el: any, type: any, fn: any, options: any = {}) =>
      onEvent(el, type, fn, {
        ...(flags.active ? { passive: false } : null),
        ...flags,
        ...options,
      })) as typeof onEvent
  )

/**
 * Removes an event `listener` of type `type` from `el` using `options`.
 */
export const off = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
  el: T,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => el.removeEventListener(type, listener, options)
