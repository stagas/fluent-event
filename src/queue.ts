import type { Fn } from './types'

const q =
  (queueFn: Fn<[Fn<any[], any>], any>) =>
  <P extends any[]>(fn: Fn<P, any>): Fn<P, void> => {
    let args: P | null
    const cb = function (this: any) {
      fn.apply(this, args!)
      args = null
    }
    return function (this: any, ...newArgs: P) {
      // we throttle but pass latest values
      if (!args) queueFn(cb)
      args = newArgs
    }
  }

/**
 * Queue.
 *
 * All queue functions are also throttled to once per invocation.
 */
export const queue = {
  /**
   * Decorate function with `requestAnimationFrame`.
   * ```ts
   * queue.raf(cb)
   * ```
   */
  raf: q(requestAnimationFrame),
  /**
   * Decorate function with `setTimeout`.
   * ```ts
   * queue.time(cb)
   * ```
   */
  time: q(setTimeout),
  /**
   * Decorate function with `queueMicrotask`.
   * ```ts
   * queue.task(cb)
   * ```
   */
  task: q(queueMicrotask),
}
