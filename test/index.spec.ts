import { debounce, event, on, queue } from '../src'

describe('all', () => {
  describe('event(fn)', () => {
    it('decorates listener', () => {
      let count = 0
      const btn = document.createElement('button')
      btn.onclick = event(() => count++)
      btn.click()
      expect(count).toEqual(1)
    })

    it('prevent', () => {
      let count = 0
      let prevent = 0
      let stop = 0
      const mock = {
        preventDefault() {
          prevent++
        },
        stopPropagation() {
          stop++
        },
      } as Event
      event.prevent(() => count++).call(this as any, mock)
      expect(count).toEqual(1)
      expect(prevent).toEqual(1)
      expect(stop).toEqual(0)
    })

    it('stop', () => {
      let count = 0
      let prevent = 0
      let stop = 0
      const mock = {
        preventDefault() {
          prevent++
        },
        stopPropagation() {
          stop++
        },
      } as Event
      event.stop(() => count++).call(this as any, mock)
      expect(count).toEqual(1)
      expect(prevent).toEqual(0)
      expect(stop).toEqual(1)
    })

    it('stop.immediate', () => {
      let count = 0
      let prevent = 0
      let stop = 0
      const mock = {
        preventDefault() {
          prevent++
        },
        stopImmediatePropagation() {
          stop++
        },
      } as Event
      event.stop.immediate(() => count++).call(this as any, mock)
      expect(count).toEqual(1)
      expect(prevent).toEqual(0)
      expect(stop).toEqual(1)
    })

    it('prevent.stop', () => {
      let count = 0
      let prevent = 0
      let stop = 0
      const mock = {
        preventDefault() {
          prevent++
        },
        stopPropagation() {
          stop++
        },
      } as Event
      event.prevent.stop(() => count++).call(this as any, mock)
      expect(count).toEqual(1)
      expect(prevent).toEqual(1)
      expect(stop).toEqual(1)
    })
  })

  describe('queue(fn)', () => {
    it('decorates function', async () => {
      let count = 0
      const cb = queue.task(() => count++)
      cb()
      expect(count).toEqual(0)
      await Promise.resolve()
      expect(count).toEqual(1)
    })

    it('raf', async () => {
      let count = 0
      const cb = queue.raf(() => count++)
      cb()
      expect(count).toEqual(0)
      await new Promise(resolve => requestAnimationFrame(resolve))
      expect(count).toEqual(1)
    })

    it('raf multiple times', async () => {
      let count = 0
      const cb = queue.raf(() => count++)
      cb()
      cb()
      cb()
      cb()
      expect(count).toEqual(0)
      const results: any = []
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          results.push(count)
          requestAnimationFrame(resolve)
        })
      })
      results.push(count)
      expect(count).toEqual(2)
      expect(results).toMatchSnapshot()
    })

    it('raf last first and last args win', async () => {
      let value: any
      const cb = queue.raf(x => {
        value = x
      })
      cb(1)
      cb(2)
      cb(3)
      cb(4)
      expect(value).toBeUndefined()
      const results: any = []
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          results.push(value)
          requestAnimationFrame(resolve)
        })
      })
      results.push(value)
      expect(value).toBe(4)
      expect(results).toMatchSnapshot()
    })

    it('time', async () => {
      let count = 0
      const cb = queue.time(() => count++)
      cb()
      expect(count).toEqual(0)
      await new Promise(resolve => setTimeout(resolve))
      expect(count).toEqual(1)
    })
  })

  describe('on/off', () => {
    it('adds event listener', () => {
      let count = 0
      const btn = document.createElement('button')
      const cb = () => count++
      const off = on(btn, 'click', cb)
      expect(count).toBe(0)
      btn.click()
      expect(count).toBe(1)
      btn.click()
      expect(count).toBe(2)
      off()
      btn.click()
      expect(count).toBe(2)
    })

    it('once', () => {
      let count = 0
      const btn = document.createElement('button')
      const cb = () => count++
      on.once(btn, 'click', cb)
      expect(count).toBe(0)
      btn.click()
      expect(count).toBe(1)
      btn.click()
      expect(count).toBe(1)
    })
  })

  describe('debounce', () => {
    it('debounces fn', async () => {
      let count = 0
      const cb = debounce(() => count++, 5)
      cb()
      cb()
      cb()
      expect(count).toBe(0)
      await new Promise(resolve => setTimeout(resolve, 10))
      expect(count).toBe(1)
    })

    it('debounces first run', async () => {
      let count = 0
      const cb = debounce.first(() => count++, 5)
      cb()
      cb()
      cb()
      expect(count).toBe(1)
      await new Promise(resolve => setTimeout(resolve, 10))
      expect(count).toBe(1)
      cb()
      expect(count).toBe(2)
    })

    it('passes arguments first', async () => {
      let count = 0
      const cb = debounce.first((x: number) => (count += x), 5)
      cb(2)
      cb(2)
      cb(2)
      expect(count).toBe(2)
      await new Promise(resolve => setTimeout(resolve, 10))
      expect(count).toBe(2)
      cb(2)
      expect(count).toBe(4)
    })

    it('passes arguments last win', async () => {
      let count = 0
      const cb = debounce((x: number) => (count += x), 5)
      cb(2)
      cb(2)
      cb(3)
      expect(count).toBe(0)
      await new Promise(resolve => setTimeout(resolve, 10))
      expect(count).toBe(3)
    })
  })
})
