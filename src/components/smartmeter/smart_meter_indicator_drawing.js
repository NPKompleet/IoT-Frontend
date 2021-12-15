const drawSmartMeterIndicator = (ctx, width, height, energyValue, powerValue, time) => {
    ctx.font = `bold ${width * 0.08}px Digital-7 Regular`;
    let text = `${powerValue.toFixed(1)}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(text, width * 0.65, height * 0.45);
    text = `${energyValue.toFixed(1)}`;
    ctx.fillText(text, width * 0.65, height * 0.52);

    ctx.font = `bold ${width * 0.05}px Digital-7 Regular`;
    ctx.textAlign = "right";
    text = time
    ctx.fillText(text, width * 0.35, height * 0.35);
}

export {drawSmartMeterIndicator};