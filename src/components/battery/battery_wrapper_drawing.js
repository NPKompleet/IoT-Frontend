import { drawCircle, drawImage } from '../../utils/drawing_utils'

const drawBatteryWrapper = (ctx, width, height) => {
    // draw circle
    ctx.fillStyle = '#222'
    ctx.lineWidth = height / 50
    drawCircle(ctx, width / 2, height * 3 / 5, height / 7, false, true)

    // Draw polarities
    drawImage(ctx, width / 10, height / 2.5, width / 15, width / 15, 'icons/plus-symbol-button.png')
    drawImage(ctx, width * 5 / 6, height / 2.5, width / 15, width / 15, 'icons/minus-symbol.png')

}

export { drawBatteryWrapper };