const drawEnergyMeterIndicator = (ctx, width, height, value) => {
    // Draw value text
    ctx.font = `bold ${width * 0.05}px Digital-7 Regular`;
    let text = `${value.toFixed(1)}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(text, width * 0.61, height * 0.35);
}

export {drawEnergyMeterIndicator};