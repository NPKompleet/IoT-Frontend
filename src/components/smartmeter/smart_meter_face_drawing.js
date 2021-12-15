import { drawRoundRect, drawImage, drawCircle } from '../../utils/drawing_utils'

const drawSmartMeterFace = (ctx, width, height) => {
    let radius = width / 2

    ctx.fillStyle = "#999"
    ctx.shadowColor = "#888"
    ctx.shadowBlur = width * 0.08
    ctx.shadowOffsetX = width * 0.05
    ctx.shadowOffsetY = height * 0.05
    drawCircle(ctx, radius, radius, radius * 0.8, true, false)

    ctx.fillStyle = "#BBB"
    ctx.shadowColor = "#888"
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    drawCircle(ctx, radius, radius, radius * 0.75, true, false)

    ctx.fillStyle = "#CCC"
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    drawCircle(ctx, radius, radius, radius * 0.71, true, false)

    ctx.fillStyle = "#EFEFEF"
    ctx.beginPath()
    ctx.arc(radius, radius, radius * 0.6, 1.25 * Math.PI, 1.75 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(radius, radius, radius * 0.6, Math.PI / 12, Math.PI * 11 / 12)
    ctx.fill()

    // Draw LCD
    ctx.fillStyle = "#8DC8E8"
    ctx.strokeStyle = "#888"
    ctx.lineWidth = width * 0.01
    drawRoundRect(ctx, width * 0.23, height * 0.31, width * 0.54, height * 0.25, 5, true, true);

    // Draw Images
    drawImage(ctx, width * 0.35, height * 0.23, width * 0.04, height * 0.04, 'icons/wifi-signal.png')
    drawImage(ctx, width * 0.35, height * 0.65, width * 0.06, height * 0.06, 'icons/barcode.png')
    drawImage(ctx, width * 0.4, height * 0.65, width * 0.06, height * 0.06, 'icons/barcode.png')
    drawImage(ctx, width * 0.45, height * 0.65, width * 0.06, height * 0.06, 'icons/barcode.png')
    drawImage(ctx, width * 0.5, height * 0.65, width * 0.06, height * 0.06, 'icons/barcode.png')
    drawImage(ctx, width * 0.55, height * 0.65, width * 0.06, height * 0.06, 'icons/barcode.png')
    drawImage(ctx, width * 0.6, height * 0.65, width * 0.06, height * 0.06, 'icons/barcode.png')

    // Draw Text
    ctx.fillStyle = "#222"
    ctx.font = `bold ${width * 0.04}px Arial`;
    let text = 'Smart Meter';
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(text, width * 0.51, height * 0.24);
    ctx.font = `bold ${width * 0.05}px Digital-7 Regular`;
    text = 'W';
    ctx.fillText(text, width * 0.7, height * 0.43);
    ctx.font = `bold ${width * 0.05}px Digital-7 Regular`;
    text = 'Wh';
    ctx.fillText(text, width * 0.7, height * 0.5);
    ctx.font = `bold ${width * 0.03}px Arial`;
    text = '1234567890';
    ctx.fillText(text, width * 0.51, height * 0.62);
    ctx.font = `${width * 0.02}px Arial`;
    ctx.fillText(text, width * 0.51, height * 0.71);

    // Draw object
    ctx.fillStyle = "#CCC"
    ctx.lineWidth = width * 0.005
    drawRoundRect(ctx, width * 0.73, height * 0.57, width * 0.07, height * 0.05, width * 0.03, true, true);
    ctx.fillStyle = "#444"
    drawCircle(ctx, width * 0.75, height * 0.595, width * 0.01, true, false)
    drawCircle(ctx, width * 0.78, height * 0.595, width * 0.01, true, false)
}
export { drawSmartMeterFace };