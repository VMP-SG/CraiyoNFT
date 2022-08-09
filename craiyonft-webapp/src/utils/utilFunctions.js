function toggleFullScreen(c) {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    // current working methods
    if (c.requestFullscreen) {
      c.requestFullscreen();
    } else if (c.mozRequestFullScreen) {
      c.mozRequestFullScreen();
    } else if (c.webkitRequestFullscreen) {
      c.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

export { toggleFullScreen };
