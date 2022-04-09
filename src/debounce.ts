import { FluentFlags } from 'fluent-flags'
import type { Fn } from './types'

/**
 * Decorate function `fn` with debounce delay `ms`.
 *
 * Flags: `first` => run `fn` first, then debounce
 * ```ts
 * fn = (x: number) => console.log(x)
 * // => runs `fn` after 100ms following last call
 * cb = debounce()(fn, 100)
 * cb(1)
 * cb(2) // <- cb(2) wins, prints `2`
 *
 * // => runs `fn` first then debounces until 100ms of inactivity
 * cb = debounce().first(fn, 100)
 * cb(1) // <- cb(1) wins, prints `1`
 * cb(2)
 * ```
 */
export const debounce = () =>
  FluentFlags<'first'>(flags =>
    <P extends any[]>(fn: Fn<P, any>, ms: number) => {
      let id: any
      let runs = false

      const cb = flags.first
        ? (fn: any) => {
          clearTimeout(id)
          id = setTimeout(() => (runs = false), ms)
          if (runs) return
          runs = true
          fn()
        }
        : (fn: any) => {
          clearTimeout(id)
          id = setTimeout(fn, ms)
        }

      return function(this: any, ...args: P) {
        cb(() => fn.apply(this, args))
      }
    }
  )
