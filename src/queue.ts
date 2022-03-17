import type { Fn } from './types'

const q =
  (queueFn: Fn<[Fn<any[], any>], any>) =>
  <P extends any[]>(fn: Fn<P, any>): Fn<P, void> => {
    let args: P | null
    let after: P | null
    const cb = function (this: any) {
      // and if there are more calls, schedule early
      if (after) queueFn(cb)

      // callback runs with first args
      fn.apply(this, args!)

      args = after ?? null
      after = null
    }
    return function (this: any, ...newArgs: P) {
      // initial call gets first args
      if (!args) {
        queueFn(cb)
        args = newArgs
      } else {
        // later calls get latest args
        after = newArgs
      }
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
