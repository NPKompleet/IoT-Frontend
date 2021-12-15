const drawNeedle = (ctx2, radius, rotAngle) => {
    ctx2.save()
    ctx2.rotate(rotAngle);

    ctx2.beginPath();
    ctx2.moveTo(-radius * 0.01, -radius * 0.7);
    ctx2.lineTo(radius * 0.01, -radius * 0.7);
    ctx2.lineTo(radius * 0.03, 0);
    ctx2.lineTo(radius * 0.02, radius * 0.2);
    ctx2.lineTo(-radius * 0.02, radius * 0.2);
    ctx2.lineTo(-radius * 0.03, 0);
    ctx2.fillStyle = "#FF0000"
    ctx2.shadowColor = "#666"
    ctx2.shadowOffsetX = radius * 0.015
    ctx2.shadowBlur = radius * 0.03
    ctx2.fill();

    ctx2.restore();
}

/* 
 * The multiplier to correspond the value of the needle point to display value
 * 
 */
const drawNeedleValueMultiplier = (ctx2, radius, multiplier) => {
    ctx2.textBaseline = "middle";
    ctx2.textAlign = "center";
    ctx2.shadowOffsetX = 0;
    ctx2.shadowOffsetY = 0;
    ctx2.shadowBlur = 0;

    ctx2.font = `${radius * 0.1}px Roboto`;
    let mulText = `x${multiplier}`;
    ctx2.fillStyle = "#2A2A2A"
    ctx2.fillText(mulText, 0, radius * 0.30);
}

const drawValueIndicator = (ctx2, radius, value) => {
    ctx2.textBaseline = "middle";
    ctx2.textAlign = "center";
    ctx2.shadowOffsetX = 0;
    ctx2.shadowOffsetY = 0;
    ctx2.shadowBlur = 0;

    // The value in the LCD
    ctx2.font = `bold ${radius * 0.17}px Digital-7 Regular`;
    let text = `${value.toFixed(1)}`
    ctx2.fillStyle = "#2A2A2A"
    ctx2.fillText(text, 0, radius * 0.65);

    // Draw the measurement unit
    ctx2.font = `bold ${radius * 0.13}px Digital-7 Regular`;
    text = `W`
    ctx2.fillStyle = "#2A2A2A"
    ctx2.fillText(text, radius * 0.27, radius * 0.67);
}

export {drawNeedle, drawValueIndicator, drawNeedleValueMultiplier};