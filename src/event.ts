import { FluentFlags } from 'fluent-flags'

export type EventListener<E extends Event, T = HTMLElement | SVGElement | Window> = (
  this: T,
  event: E,
) => any

/**
 * Decorates event listener `fn`.
 *
 * Flags:
 * - `prevent` => `event.preventDefault()`
 * - `stop` => `event.stopPropagation()`
 * - `stop.immediate` => `event.stopImmediatePropagation()`
 *
 * ```ts
 * btn.onclick = event()(fn)
 * btn.onclick = event().prevent(fn)
 * btn.onclick = event().prevent.stop(fn)
 * btn.onclick = event().stop.immediate(fn)
 * ```
 */
export const event = () =>
  FluentFlags<'prevent' | 'stop' | 'immediate'>(flags =>
    <
      E extends Event,
      T extends HTMLElement | SVGElement | Window | GlobalEventHandlers,
    >(fn: EventListener<E, T> = () => {}): EventListener<E, T> =>
      function(this: T, event: E) {
        if (flags.prevent) event.preventDefault()
        if (flags.stop) flags.immediate ? event.stopImmediatePropagation() : event.stopPropagation()
        return fn.call(this, event)
      }
  )
