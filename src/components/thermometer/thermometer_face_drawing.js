import { drawRoundRect } from '../../utils/drawing_utils'

const drawThermometerFace = (ctx, width, height, min, max) => {
    const outerColor = '#800';
    const innerColor = '#EEE8AA';
    const mercuryColor = '#00BFFF';


    // Draw value text
    ctx.font = `bold ${width * 0.12}px Arial`;
    let text = '°C';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = outerColor;
    ctx.fillText(text, width * 0.32, height * 0.1);

    // Draw outer stem and bulb;
    ctx.fillStyle = outerColor;
    drawRoundRect(ctx, width * 0.43, height * 0.01, width * 0.14, height * 0.98, width * 0.07, true, false);
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.85, height * 0.15, 0, 2 * Math.PI);
    ctx.fill();

    // Draw inner stem and bulb
    ctx.fillStyle = innerColor;
    drawRoundRect(ctx, width * 0.44, height * 0.015, width * 0.12, height * 0.97, width * 0.06, true, false);
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.85, height * 0.14, 0, 2 * Math.PI);
    ctx.fill();

    // Draw mecury circle
    ctx.fillStyle = mercuryColor;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.85, height * 0.09, 0, 2 * Math.PI);
    ctx.fill();

    // Draw graduations
    ctx.beginPath();
    ctx.moveTo(width * 0.57, height * 0.70);
    ctx.lineTo(width * 0.62, height * 0.70);
    ctx.moveTo(width * 0.57, height * 0.60);
    ctx.lineTo(width * 0.59, height * 0.60);
    ctx.moveTo(width * 0.57, height * 0.50);
    ctx.lineTo(width * 0.59, height * 0.50);
    ctx.moveTo(width * 0.57, height * 0.40);
    ctx.lineTo(width * 0.62, height * 0.40);
    ctx.moveTo(width * 0.57, height * 0.30);
    ctx.lineTo(width * 0.59, height * 0.30);
    ctx.moveTo(width * 0.57, height * 0.20);
    ctx.lineTo(width * 0.59, height * 0.20);
    ctx.moveTo(width * 0.57, height * 0.10);
    ctx.lineTo(width * 0.62, height * 0.10);
    ctx.lineWidth = width * 0.01;
    ctx.strokeStyle = outerColor;
    ctx.stroke();

    // Max and min graduation values
    ctx.font = `bold ${width * 0.05}px Arial`;
    text = `${min}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillStyle = outerColor;
    ctx.fillText(text, width * 0.63, height * 0.70);
    text = `${max}`;
    ctx.fillText(text, width * 0.63, height * 0.10);
}

export {drawThermometerFace};