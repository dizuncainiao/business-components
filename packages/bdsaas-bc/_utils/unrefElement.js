import { toValue } from '@vueuse/shared'

export function unrefElement(elRef) {
  var _a
  const plain = toValue(elRef)
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain
}
