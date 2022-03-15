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

/** Queue */
export const queue = {
  /** Decorate function with `requestAnimationFrame`. */
  raf: q(requestAnimationFrame),
  /** Decorate function with `setTimeout`. */
  time: q(setTimeout),
  /** Decorate function with `queueMicrotask`. */
  task: q(queueMicrotask),
}
