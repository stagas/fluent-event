import type { Fn } from './types'

const q = (queueFn: Fn<[Fn<any[], any>], any>) =>
  <P extends any[]>(fn: Fn<P, any>): Fn<P, void> => {
    let self: any
    let args: P | null
    let next: P | null
    const cb = () => {
      // schedule early when more calls
      if (next) queueFn(cb)

      fn.apply(self, args!)

      // pass next args when more calls
      args = next ?? null
      next = null
    }
    return function(this: any, ...newArgs: P) {
      self = this

      // initial call gets first args
      if (!args) {
        queueFn(cb)
        args = newArgs
      } else {
        // next calls latest args win
        next = newArgs
      }
    }
  }

/**
 * Queue.
 *
 * All queue functions are also throttled to once per invocation.
 *
 * ```ts
 * // decorate function with `requestAnimationFrame`
 * const cbWithRaf = queue().raf(cb)
 *
 * // decorate function with `setTimeout`
 * const cbWithTimeout = queue().time(cb)
 *
 * // decorate function with `queueMicrotask`
 * const cbWithMicrotask = queue().task(cb)
 * ```
 */
export const queue = () => ({
  /**
   * Decorate function with `requestAnimationFrame`.
   *
   * ```ts
   * const cbWithRaf = queue.raf(cb)
   * ```
   */
  raf: q(requestAnimationFrame),
  /**
   * Decorate function with `setTimeout`.
   *
   * ```ts
   * const cbWithTimeout = queue.time(cb)
   * ```
   */
  time: q(setTimeout),
  /**
   * Decorate function with `queueMicrotask`.
   *
   * ```ts
   * const cbWithMicrotask = queue.task(cb)
   * ```
   */
  task: q(queueMicrotask),
})
