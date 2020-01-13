/* eslint-disable */

const defaultHandler = () => {};

class Movement {
  constructor(pane, window, onUpdate = defaultHandler) {
    const minWidth = 60;

    const FULLSCREEN_MARGINS = -10;
    const MARGINS = 4;
    const CORNER_MARGINS = 15;

    let clicked = null;
    let onRightEdge,
      onBottomEdge,
      onLeftEdge,
      onTopEdge;

    let rightScreenEdge,
      bottomScreenEdge;

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
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        const { style } = pane;
        onUpdate({
          width: style.width,
          left: style.left,
          top: style.top
        });
      }, 100);
    }

    function setBounds(props) {
      const { element } = props;
      let { x = element.style.left, y = element.style.top, w = element.style.width } = props;

      element.style.left = x + 'px';
      element.style.top = y + 'px';
      element.style.width = w + 'px';

      triggerOnUpdate();
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
      return x > 0 && x < b.width && y > 0 && y < b.height && y < 30;
    }

    function calc(e) {
      b = pane.getBoundingClientRect();
      x = e.clientX - b.left;
      y = e.clientY - b.top;

      onTopEdge = y < MARGINS;
      onLeftEdge = x < MARGINS;
      onRightEdge = x >= b.width - CORNER_MARGINS;
      onBottomEdge = y >= b.height - CORNER_MARGINS;

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
        b = pane.getBoundingClientRect();
        if (
          (clicked.onRightEdge && clicked.onBottomEdge)) {
          let newWidth = Math.max(x, minWidth);

          if (b.left + newWidth > rightScreenEdge) {
            newWidth -= Math.abs(((b.left + newWidth) - rightScreenEdge));
          }

          setBounds({
            element: pane,
            w: newWidth
          });
        }

        return;
      }

      if (clicked && clicked.isMoving) {
        // moving
        setBounds({
          element: pane,
          x: e.clientX - clicked.x,
          y: e.clientY - clicked.y,
        });
        return;
      }

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
        let x = e.clientX - clicked.x;
        let y = e.clientY - clicked.y;

          if (x < FULLSCREEN_MARGINS) {
            x = 0;
          } else if (x + pane.offsetWidth > rightScreenEdge) {
            x = x - Math.abs((pane.offsetWidth + x - rightScreenEdge));
          }

          if (y < FULLSCREEN_MARGINS) {
            y = 0;
          } else if (y + pane.offsetHeight > bottomScreenEdge) {
            y = y - Math.abs((pane.offsetHeight + y - bottomScreenEdge));
          }

        setBounds({element: pane, x, y});
      }

      clicked = null;
    }
  };
}


export default Movement;
