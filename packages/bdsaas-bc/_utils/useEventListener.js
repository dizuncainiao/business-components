import {
  isClient,
  isObject,
  noop,
  toValue,
  tryOnScopeDispose
} from '@vueuse/shared'
import { watch } from 'vue'
import { unrefElement } from './unrefElement'

const defaultWindow = isClient ? window : void 0

export function useEventListener(...args) {
  let target
  let events
  let listeners
  let options
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    ;[events, listeners, options] = args
    target = defaultWindow
  } else {
    ;[target, events, listeners, options] = args
  }
  if (!target) return noop
  if (!Array.isArray(events)) events = [events]
  if (!Array.isArray(listeners)) listeners = [listeners]
  const cleanups = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2)
    return () => el.removeEventListener(event, listener, options2)
  }
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup()
      if (!el) return
      const optionsClone = isObject(options2) ? { ...options2 } : options2
      cleanups.push(
        ...events.flatMap(event => {
          return listeners.map(listener =>
            register(el, event, listener, optionsClone)
          )
        })
      )
    },
    { immediate: true, flush: 'post' }
  )
  const stop = () => {
    stopWatch()
    cleanup()
  }
  tryOnScopeDispose(stop)
  return stop
}
