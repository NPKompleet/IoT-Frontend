import {drawRoundRect, drawRectangle, drawLine, drawImage} from '../../utils/drawing_utils'
const drawCompositeMeterFace = (ctx, width, height) => {
    // Draw Face
    ctx.fillStyle = "#898989"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = width * 0.005
    drawRoundRect(ctx, width * 0.3, height * 0.78, width * 0.4, height * 0.1, 5, true, true);
    drawRoundRect(ctx, width * 0.38, height * 0.77, width * 0.24, height * 0.12, 5, true, true);
    drawRoundRect(ctx, width * 0.22, height * 0.1, width * 0.56, height * 0.72, 5, true, true);

    ctx.fillStyle = "#3F3939"
    drawRoundRect(ctx, width * 0.25, height * 0.13, width * 0.5, height * 0.5, 5, true, true);

    drawLine(ctx, width * 0.22, height * 0.75, width * 0.78, height * 0.75)

    // Draw LCDs
    ctx.fillStyle = "#989F8D"
    drawRectangle(ctx, width * 0.3, height * 0.2, width * 0.4, height * 0.07, true, true)
    drawRectangle(ctx, width * 0.3, height * 0.3, width * 0.4, height * 0.07, true, true)
    drawRectangle(ctx, width * 0.3, height * 0.4, width * 0.4, height * 0.07, true, true)
    drawRectangle(ctx, width * 0.3, height * 0.5, width * 0.4, height * 0.07, true, true)

    // Draw icons
    drawImage(ctx, width * 0.31, height * 0.21, width * 0.05, height * 0.05, 'icons/lighting.png')
    drawImage(ctx, width * 0.31, height * 0.31, width * 0.05, height * 0.05, 'icons/power-plug.png')
    drawImage(ctx, width * 0.31, height * 0.41, width * 0.05, height * 0.05, 'icons/thermometer.png')
    drawImage(ctx, width * 0.31, height * 0.51, width * 0.05, height * 0.05, 'icons/power-button.png')

    // Draw QR Image
    ctx.fillStyle = "#FFF"
    drawRoundRect(ctx, width * 0.45, height * 0.66, width * 0.1, height * 0.1, 3, true, true);
    drawImage(ctx, width * 0.465, height * 0.675, width * 0.07, height * 0.07, 'icons/qr-code.png')
}
export {drawCompositeMeterFace};