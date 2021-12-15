import { drawRoundRect } from '../../utils/drawing_utils'

const drawShutterIndicator = (ctx, width, height, position) => {
    ctx.font = `bold ${width * 0.06}px Arial`;
    let text = `Position: ${position.toFixed(2)}%`
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000"
    ctx.fillText(text, width * 0.5, height * 0.85);

    // There is always one slat visible.
    // so the extra slats indicate value
    let numOfExtraSlats = parseInt(position / 20);

    // Draw slats
    ctx.fillStyle = "#330000";
    let h = height * 0.22
    for (let index = 0; index <= numOfExtraSlats; index++) {
        drawRoundRect(ctx, width * 0.25, h, width * 0.5, height * 0.05, 5, true, false);
        h = h + height * 0.08 
    }
    ctx.fill()

    // Draw slat bindings
    ctx.beginPath()
    ctx.strokeStyle = "#220000"
    ctx.lineWidth = width * 0.01
    ctx.moveTo(width * 0.33, height * 0.2)
    h = height * 0.24
    for (let index = 0; index <= numOfExtraSlats; index++) {
        ctx.lineTo(width * 0.33, h)
        h = h + height * 0.08
    }

    ctx.moveTo(width * 0.67, height * 0.2)
    h = height * 0.24
    for (let index = 0; index <= numOfExtraSlats; index++) {
        ctx.lineTo(width * 0.67, h)
        h = h + height * 0.08
    }
    ctx.stroke()

    // Draw string
    ctx.lineWidth = width * 0.01
    ctx.strokeStyle = "#222"
    ctx.beginPath()
    ctx.moveTo(width * 0.78, height * 0.19)
    h = height * 0.25 + (height * (0.25 - (0.25 * position/ 100 )))
    ctx.lineTo(width * 0.78, h)
    ctx.stroke()
    ctx.beginPath()
    ctx.lineWidth = width * 0.02
    ctx.moveTo(width * 0.78, h)
    ctx.lineTo(width * 0.78, h + height * 0.05)
    ctx.stroke()

}

export {drawShutterIndicator};