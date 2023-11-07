export function useElementOffset(el) {
  let left = el.offsetLeft
  let top = el.offsetTop

  el = el.offsetParent

  while (el != null) {
    left += el.offsetLeft
    top += el.offsetTop

    el = el.offsetParent
  }

  return {
    offsetTop: top,
    offsetLeft: left
  }
}
