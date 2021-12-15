/**
 * This draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius.
 * 
 * @category Utils
 * 
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {number} x The top left x coordinate.
 * @param {number} y The top left y coordinate.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @param {number|Object} [radius = 5] The corner radius; It can also be an object.
 *                 to specify different radii for corners
 * @param {number} [radius.tl = 0] Top left
 * @param {number} [radius.tr = 0] Top right
 * @param {number} [radius.br = 0] Bottom right
 * @param {number} [radius.bl = 0] Bottom left
 * @param {boolean} [fill = false] Whether to fill the rectangle.
 * @param {boolean} [stroke = true] Whether to stroke the rectangle.
 */
function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

/**
 * This draws a rounded rectangle with specified values for the width and height and all the corners.
 * 
 * @category Utils
 * 
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {number} x The top left x coordinate.
 * @param {number} y The top left y coordinate.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle. 
 * @param {boolean} [fill = false] Whether or not to fill the canvas diagram.
 * @param {boolean} [stroke = true] Whether or not to stroke the canvas diagram.
 * @param {number} [rtl = 5] The top left radius of the rectangle.
 * @param {number} [rtr = 5] The top right radius of the rectangle.
 * @param {number} [rbr = 5] The bottom right radius of the rectangle.
 * @param {number} [rbl = 5] The bottom left radius of the rectangle.
 */
function drawRoundRectWithRadii(ctx, x, y, width, height, fill = false, stroke = true, rtl = 5, rtr = 5, rbr = 5, rbl = 5) {
    let radius = {tl: rtl, tr: rtr, br: rbr, bl: rbl};
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
    ctx.fill();
    }
    if (stroke) {
    ctx.stroke();
    }
}

/**
 * This draws a regular rectangle with specified width and height.
 * 
 * @category Utils
 * 
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {number} x The top left x coordinate.
 * @param {number} y The top left y coordinate.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle. 
 * @param {boolean} [fill = false] Whether or not to fill the canvas diagram.
 * @param {boolean} [stroke = true] Whether or not to stroke the canvas diagram. 
 */
function drawRectangle(ctx, x, y, width, height, fill = false, stroke = true){
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x + width, y + height)
    ctx.lineTo(x, y + height)
    ctx.closePath()

    if(fill) {
        ctx.fill()
    }

    if(stroke) {
        ctx.stroke()
    }
}

/**
 * This draws a line starting from point (x1, y1) to (x2, y2).
 * 
 * @category Utils
 * 
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {number} x1 The x-coordinate of the starting point of the line.
 * @param {number} y1 The y-cordinate of the starting point of the line.
 * @param {number} x2 The x-coordinate of the ending point of the line.
 * @param {number} y2 The y-coordinate of the ending point of the line.
 */
function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

/**
 * This draws an image on a canvas using the specified corner point and dimensions.
 * 
 * @category Utils
 * 
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context of the canvas.
 * @param {number} x The x-coordinate of the top-left corner of the image.
 * @param {number} y The y-coordinate of the top-left corner of the image.
 * @param {number} width The width of the image.
 * @param {number} height The height of the image.
 * @param {string} src The path or location of the image.
 */
function drawImage(ctx, x, y, width, height, src) {
    let image = new Image();
    image.src = src;

    image.onload = function() {
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = 0
        ctx.drawImage(image, x, y, width, height);
    }
}

/**
 * This Draws a circle with a given radius and specified center point.
 * 
 * @category Utils
 * 
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context of the canvas. 
 * @param {number} centerX The x-coordinate of the center of the circle.
 * @param {number} centerY The y-coordinate of the center of the circle.
 * @param {number} radius The radius of the circle.
 * @param {boolean} [fill = false] Whether or not to fill the canvas diagram.
 * @param {boolean} [stroke = true] Whether or not to stroke the canvas diagram.
 */
function drawCircle(ctx, centerX, centerY, radius, fill = false, stroke = true) {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)

  if (fill) {
    ctx.fill()
  }

  if(stroke) {
    ctx.stroke()
  }
}

export {drawRoundRect, drawRoundRectWithRadii, drawRectangle, drawLine, drawImage, drawCircle}