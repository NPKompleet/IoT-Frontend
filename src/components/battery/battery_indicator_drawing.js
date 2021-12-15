import { drawRectangle, drawImage } from '../../utils/drawing_utils'

const drawBatteryIndicator = (ctx, width, height, value, status) => {
    // Draw indicator
    ctx.fillStyle = '#83BD75'
    //#AAC8CD
    //#83BD75
    const percentage = value
    const totalIndicatorheight = height / 2
    const charging = status
    drawRectangle(ctx, width / 25, height * 7 / 20 + totalIndicatorheight - totalIndicatorheight * percentage / 100, width * 23 / 25, totalIndicatorheight * percentage / 100, true, false)

    // Draw value text
    ctx.font = `bold ${width * 0.07}px Arial`;
    let text = `${percentage}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#222";
    ctx.fillText(text, width * 0.5, height * 3 / 5);

    // Draw charging signs
    drawImage(ctx, width * 6 / 10, height * 4.5 / 10, width / 10, width / 10, `${charging ? 'icons/plug-charge.png' : ''}`)
}


export { drawBatteryIndicator };