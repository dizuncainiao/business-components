export function useElementOffset(el) {
  if (isNoWuJie()) {
    return {
      offsetTop: 0,
      offsetLeft: 0
    }
  }

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

export function isNoWuJie() {
  return window.parent === window
}
