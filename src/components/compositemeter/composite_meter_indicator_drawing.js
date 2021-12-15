const drawCompositeMeterIndicator = (ctx, width, height, energyValue, powerValue, temperatureValue, switchValue) => {
    // Draw value text
    ctx.font = `bold ${width * 0.05}px Digital-7 Regular`;
    let text = `${energyValue.toFixed(1)} Wh`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(text, width * 0.69, height * 0.24);
    text = `${powerValue.toFixed(1)} W`
    ctx.fillText(text, width * 0.69, height * 0.34);
    text = `${temperatureValue.toFixed(1)} °C`
    ctx.fillText(text, width * 0.69, height * 0.44);
    text = switchValue? 'ON':'OFF'
    ctx.fillText(text, width * 0.69, height * 0.54);
}

export {drawCompositeMeterIndicator};