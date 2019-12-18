const defaultHander = () => {};
class Movement {
  constructor(pane, ghostpane, window, onUpdate = defaultHander) {
    let minWidth = 60;
    let minHeight = 40;

    let FULLSCREEN_MARGINS = -10;
    let MARGINS = 4;

    let clicked = null;
    let onRightEdge,
      onBottomEdge,
      onLeftEdge,
      onTopEdge;

    let rightScreenEdge,
      bottomScreenEdge;

    let preSnapped;

    let b,
      x,
      y;

    let redraw = false;
    let timeout;

    this.addEventListeners = () => {
      pane.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);

      pane.addEventListener('touchstart', onTouchDown);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    };

    this.removeEventListeners = () => {
      pane.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

      pane.removeEventListener('touchstart', onTouchDown);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    function triggerOnUpdate() {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        const { style } = pane;
        onUpdate({width: style.width, left: style.left, top: style.top})
      }, 100);
    }

    function setBounds(element, x, y, w, h) {
      element.style.left = x + 'px';
      element.style.top = y + 'px';
      element.style.width = w + 'px';
      element.style.height = h + 'px';

      triggerOnUpdate()
    }

    function hintHide() {
      setBounds(ghostpane, b.left, b.top, b.width, b.height);
      ghostpane.style.opacity = 0;
    }

    function onTouchDown(e) {
      onDown(e.touches[0]);
      e.preventDefault();
    }

    function onTouchMove(e) {
      onMove(e.touches[0]);
    }

    function onTouchEnd(e) {
      if (e.touches.length == 0) onUp(e.changedTouches[0]);
    }

    function onMouseDown(e) {
      onDown(e);
      e.preventDefault();
    }

    function onDown(e) {
      calc(e);

      let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

      clicked = {
        x: x,
        y: y,
        cx: e.clientX,
        cy: e.clientY,
        w: b.width,
        h: b.height,
        isResizing: isResizing,
        isMoving: !isResizing && canMove(),
        onTopEdge: onTopEdge,
        onLeftEdge: onLeftEdge,
        onRightEdge: onRightEdge,
        onBottomEdge: onBottomEdge
      };
    }

    function canMove() {
      return x > 0 && x < b.width && y > 0 && y < b.height
        && y < 30;
    }

    function calc(e) {
      b = pane.getBoundingClientRect();
      x = e.clientX - b.left;
      y = e.clientY - b.top;

      onTopEdge = y < MARGINS;
      onLeftEdge = x < MARGINS;
      onRightEdge = x >= b.width - MARGINS;
      onBottomEdge = y >= b.height - MARGINS;

      rightScreenEdge = window.offsetWidth - MARGINS;
      bottomScreenEdge = window.offsetHeight - MARGINS;
    }

    let e;

    function onMove(ee) {
      calc(ee);

      e = ee;

      redraw = true;

    }

    function animate() {

      requestAnimationFrame(animate);

      if (!redraw) return;

      redraw = false;

      if (clicked && clicked.isResizing) {

        if (
          (clicked.onRightEdge && clicked.onBottomEdge)) {
          pane.style.width = Math.max(x, minWidth) + 'px';
          triggerOnUpdate();
        }

        hintHide();

        return;
      }

      if (clicked && clicked.isMoving) {

        if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.offsetWidth - FULLSCREEN_MARGINS || b.bottom > window.offsetHeight - FULLSCREEN_MARGINS) {
          // hintFull();
          setBounds(ghostpane, 0, 0, window.offsetWidth, window.offsetHeight);
          ghostpane.style.opacity = 0.2;
        } else if (b.top < MARGINS) {
          // hintTop();
          setBounds(ghostpane, 0, 0, window.offsetWidth, window.offsetHeight / 2);
          ghostpane.style.opacity = 0.2;
        } else if (b.left < MARGINS) {
          // hintLeft();
          setBounds(ghostpane, 0, 0, window.offsetWidth / 2, window.offsetHeight);
          ghostpane.style.opacity = 0.2;
        } else if (b.right > rightScreenEdge) {
          // hintRight();
          setBounds(ghostpane, window.offsetWidth / 2, 0, window.offsetWidth / 2, window.offsetHeight);
          ghostpane.style.opacity = 0.2;
        } else if (b.bottom > bottomScreenEdge) {
          // hintBottom();
          setBounds(ghostpane, 0, window.offsetHeight / 2, window.offsetWidth, window.offsetWidth / 2);
          ghostpane.style.opacity = 0.2;
        } else {
          hintHide();
        }

        if (preSnapped) {
          setBounds(pane,
            e.clientX - preSnapped.width / 2,
            e.clientY - Math.min(clicked.y, preSnapped.height),
            preSnapped.width,
            preSnapped.height
          );
          return;
        }

        // moving
        pane.style.top = (e.clientY - clicked.y) + 'px';
        pane.style.left = (e.clientX - clicked.x) + 'px';
        triggerOnUpdate();

        return;
      }

      // This code executes when mouse moves without clicking

      // style cursor
      if (onRightEdge && onBottomEdge) {
        pane.style.cursor = 'nwse-resize';
      } else if (canMove()) {
        pane.style.cursor = 'move';
      } else {
        pane.style.cursor = 'default';
      }
    }

    animate();

    function onUp(e) {
      calc(e);

      if (clicked && clicked.isMoving) {
        // Snap
        let snapped = {
          width: b.width,
          height: b.height
        };

        if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.offsetWidth - FULLSCREEN_MARGINS || b.bottom > window.offsetHeight - FULLSCREEN_MARGINS) {
          // hintFull();
          setBounds(pane, 0, 0, window.offsetWidth, window.offsetHeight);
          preSnapped = snapped;
        } else if (b.top < MARGINS) {
          // hintTop();
          setBounds(pane, 0, 0, window.offsetWidth, window.offsetHeight / 2);
          preSnapped = snapped;
        } else if (b.left < MARGINS) {
          // hintLeft();
          setBounds(pane, 0, 0, window.offsetWidth / 2, window.offsetHeight);
          preSnapped = snapped;
        } else if (b.right > rightScreenEdge) {
          // hintRight();
          setBounds(pane, window.offsetWidth / 2, 0, window.offsetWidth / 2, window.offsetHeight);
          preSnapped = snapped;
        } else if (b.bottom > bottomScreenEdge) {
          // hintBottom();
          setBounds(pane, 0, window.offsetHeight / 2, window.offsetWidth, window.offsetWidth / 2);
          preSnapped = snapped;
        } else {
          preSnapped = null;
        }

        hintHide();
      }

      clicked = null;
    }
  };
}


export default Movement;
