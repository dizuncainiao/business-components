import { computed, ref } from 'vue'
import { isClient, toRefs, toValue } from '@vueuse/shared'
import { useEventListener } from './useEventListener'
const defaultWindow = isClient ? window : void 0

export function useDraggable(target, options = {}) {
  var _a, _b
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = 'both',
    draggingElement = defaultWindow,
    containerElement,
    handle: draggingHandle = target
  } = options
  const position = ref(
    (_a = toValue(initialValue)) != null ? _a : { x: 0, y: 0 }
  )
  const pressedDelta = ref()
  const filterEvent = e => {
    if (pointerTypes) return pointerTypes.includes(e.pointerType)
    return true
  }
  const handleEvent = e => {
    if (toValue(preventDefault)) e.preventDefault()
    if (toValue(stopPropagation)) e.stopPropagation()
  }
  const start = e => {
    var _a2
    if (!filterEvent(e)) return
    if (toValue(exact) && e.target !== toValue(target)) return
    const container =
      (_a2 = toValue(containerElement)) != null ? _a2 : toValue(target)
    const rect = container.getBoundingClientRect()
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    if ((onStart == null ? void 0 : onStart(pos, e)) === false) return
    pressedDelta.value = pos
    handleEvent(e)
  }
  const move = e => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    let { x, y } = position.value
    if (axis === 'x' || axis === 'both') x = e.clientX - pressedDelta.value.x
    if (axis === 'y' || axis === 'both') y = e.clientY - pressedDelta.value.y
    position.value = {
      x,
      y
    }
    onMove == null ? void 0 : onMove(position.value, e)
    handleEvent(e)
  }
  const end = e => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    pressedDelta.value = void 0
    onEnd == null ? void 0 : onEnd(position.value, e)
    handleEvent(e)
  }
  if (isClient) {
    const config = { capture: (_b = options.capture) != null ? _b : true }
    useEventListener(draggingHandle, 'pointerdown', start, config)
    useEventListener(draggingElement, 'pointermove', move, config)
    useEventListener(draggingElement, 'pointerup', end, config)
  }
  return {
    ...toRefs(position),
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(
      () => `left:${position.value.x}px;top:${position.value.y}px;`
    )
  }
}
