const drawToggleSwitchIndicator = (ctx, radius, value, type) => {
    const stateColor = type === 'motionDetected' ? `rgb(0, 0, ${value * 255})` : `rgb(0, ${value * 255}, 0)`;

    // Draw pointer
    ctx.save()
    ctx.translate(radius, radius)

    // The rotation range is 0.4 * Math.PI
    let rotAngle = value * 0.4 * Math.PI;

    // The starting point is at -0.2 * Math.PI
    ctx.rotate(-0.2 * Math.PI + rotAngle);
    ctx.beginPath();
    ctx.moveTo(0, radius * -0.75);
    ctx.lineTo(radius * -0.33, 0);
    ctx.lineTo(radius * 0.33, 0);
    ctx.fillStyle = "#F00"
    ctx.shadowColor = "#444"
    ctx.shadowOffsetX = radius * 0.02
    ctx.shadowBlur = radius * 0.03
    ctx.fill();
    ctx.restore();

    // Draw glowing indicator
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.3, 0, 2 * Math.PI);
    ctx.fillStyle = stateColor;
    ctx.fill();
}

export {drawToggleSwitchIndicator};