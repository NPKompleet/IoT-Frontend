import { drawRoundRect, drawRoundRectWithRadii } from '../../utils/drawing_utils'

const drawShutterFace = (ctx, width, height, slatAngle) => {
    ctx.font = `bold ${width * 0.06}px Arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000"
    let text = `SlatAngle: ${slatAngle.toFixed(2)}%`
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.fillText(text, width * 0.5, height * 0.92);

    ctx.fillStyle = "#004";
    ctx.shadowColor = "#888";
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 2;

    // Draw blind roller
    drawRoundRect(ctx, width * 0.2, height * 0.1, width * 0.6, height * 0.1, 5, true, false);
    drawRoundRectWithRadii(ctx, width * 0.15, height * 0.12, width * 0.04, height * 0.06, true, false, 8, 0, 0, 8);
    drawRoundRectWithRadii(ctx, width * 0.81, height * 0.12, width * 0.04, height * 0.06, true, false, 0, 8, 8, 0);

    // Draw window face
    ctx.strokeStyle = "#8E9D4D"
    ctx.fillStyle = "#a9e8fc";
    ctx.lineWidth = width * 0.04
    ctx.beginPath()
    ctx.moveTo(width * 0.3, height * 0.25)
    ctx.lineTo(width * 0.7, height * 0.25)
    ctx.lineTo(width * 0.7, height * 0.65)
    ctx.lineTo(width * 0.3, height * 0.65)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(width * 0.5, height * 0.25)
    ctx.lineTo(width * 0.5, height * 0.65)
    ctx.moveTo(width * 0.3, height * 0.45)
    ctx.lineTo(width * 0.7, height * 0.45)
    ctx.fillStyle = "#330000"
    ctx.lineWidth = width * 0.025
    ctx.stroke()

    drawRoundRectWithRadii(ctx, width * 0.22, height * 0.675, width * 0.56, height * 0.1, true, false, 20, 20, 5, 5);

}

export {drawShutterFace};