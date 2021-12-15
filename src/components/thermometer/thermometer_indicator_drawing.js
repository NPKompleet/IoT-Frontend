const drawThermometerIndicator = (ctx, width, height, value, min, max) => {
    const valueTextColor = '#222';
    const mercuryColor = '#00BFFF';

    // Draw mecury column
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.85);
    ctx.lineTo(width * 0.5, height * 0.70);

    // minimum value starts at height * 0.70
    // maximum value is at height * 0.10
    // the difference is height * 0.6
    let propDiff = ((value - min)/(max - min)) * 0.6;
    ctx.lineTo(width * 0.5, height * (0.70 - propDiff));

    ctx.lineWidth = width * 0.05;
    ctx.strokeStyle = mercuryColor;
    ctx.stroke();

    // Draw value text
    ctx.font = `bold ${width * 0.055}px Digital-7 Regular`;
    let text = `${value.toFixed(1)}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = valueTextColor;
    ctx.fillText(text, width * 0.5, height * 0.85);
}

export {drawThermometerIndicator};