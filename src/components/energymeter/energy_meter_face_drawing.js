import {drawRoundRect, drawImage} from '../../utils/drawing_utils'

const drawEnergyMeterFace = (ctx, width, height) => {
    ctx.fillStyle = "#222";
    ctx.shadowColor = "#888";
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 2;

    // Draw bottom panel
    drawRoundRect(ctx, width * 0.25, height * 0.6, width * 0.5, height * 0.32, 20, true, false);

    // Draw Face
    drawRoundRect(ctx, width * 0.15, height * 0.1, width * 0.7, height * 0.7, 50, true, false);

    // Draw inner white
    ctx.fillStyle = "#888";
    ctx.shadowColor = "#555";
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 0;
    drawRoundRect(ctx, width * 0.25, height * 0.2, width * 0.5, height * 0.5, 10, true, false);

    ctx.fillStyle = "#FFF";
    ctx.shadowColor = "#555";
    ctx.shadowColor = "#0000";
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 0;
    drawRoundRect(ctx, width * 0.27, height * 0.22, width * 0.46, height * 0.46, 10, true, false);

    // Draw LCD
    ctx.fillStyle = "#444"
    drawRoundRect(ctx, width * 0.35, height * 0.28, width * 0.3, height * 0.12, 1, true, false);
    ctx.fillStyle = "#BABAB2"
    drawRoundRect(ctx, width * 0.38, height * 0.3, width * 0.24, height * 0.08, 1, true, false);

    // Draw arrow
    ctx.beginPath();
    ctx.moveTo(width * 0.3, height * 0.61);
    ctx.lineTo(width * 0.33, height * 0.61);
    ctx.lineTo(width * 0.35, height * 0.62);
    ctx.lineTo(width * 0.33, height * 0.63);
    ctx.lineTo(width * 0.3, height * 0.63);
    ctx.lineTo(width * 0.32, height * 0.62);
    ctx.closePath();

    // ctx.beginPath();
    ctx.moveTo(width * 0.67, height * 0.61);
    ctx.lineTo(width * 0.7, height * 0.62);
    ctx.lineTo(width * 0.67, height * 0.63);
    ctx.closePath();

    ctx.fillStyle = "#333"
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width * 0.32, height * 0.62);
    ctx.lineTo(width * 0.7, height * 0.62);
    ctx.stroke();

    // Draw unit text
    ctx.font = `bold ${width * 0.04}px Arial`;
    let text = 'Wh';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, width * 0.5, height * 0.535);

    // Draw meter wheel
    ctx.fillStyle = "#111"
    drawRoundRect(ctx, width * 0.38, height * 0.6, width * 0.24, height * 0.04, 5, true, false);
    ctx.fillStyle = "#CFCFCF"
    drawRoundRect(ctx, width * 0.38, height * 0.615, width * 0.24, height * 0.01, 5, true, false);

    // Draw QR Image
    drawImage(ctx, width * 0.35, height * 0.5, width * 0.06, height * 0.06, 'icons/qr-code.png')

    ctx.beginPath()
    ctx.moveTo(width * 0.35, height * 0.49);
    ctx.lineTo(width * 0.655, height * 0.49);
    ctx.moveTo(width * 0.35, height * 0.57);
    ctx.lineTo(width * 0.655, height * 0.57);
    ctx.strokeStyle = "#222";
    ctx.stroke();

    // Draw screw
    ctx.fillStyle = "#AAA";
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.85, width * 0.015, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath()
    ctx.moveTo(width * 0.485, height * 0.835);
    ctx.lineTo(width * 0.515, height * 0.865);
    ctx.strokeStyle = "#222";
    ctx.stroke();

    // Draw button hole for middle button
    ctx.fillStyle = "#777";
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.45, width * 0.025, 0, 2 * Math.PI);
    ctx.fill();

    // Draw buttons
    ctx.fillStyle = "#F55";
    ctx.beginPath();
    ctx.arc(width * 0.4, height * 0.45, width * 0.015, 0, 2 * Math.PI);
    ctx.shadowOffsetY = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowBlur = 2;
    ctx.fill();

    ctx.fillStyle = "#585";
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.45, width * 0.015, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#55F";
    ctx.beginPath();
    ctx.arc(width * 0.6, height * 0.45, width * 0.015, 0, 2 * Math.PI);
    ctx.fill();
}

export {drawEnergyMeterFace};