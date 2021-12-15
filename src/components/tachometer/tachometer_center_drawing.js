const drawCenter = (ctx3, radius) => {
    ctx3.save();

    // Large needle circle
    ctx3.beginPath();
    ctx3.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
    ctx3.fillStyle = "#DDDDDD"
    ctx3.shadowColor = "#AAAAAA"
    ctx3.shadowOffsetX = radius * 0.02
    ctx3.shadowOffsetY = radius * 0.02
    ctx3.shadowBlur = radius * 0.05
    ctx3.fill();

    // Small needle circle
    ctx3.beginPath();
    ctx3.arc(0, 0, radius * 0.06, 0, 2 * Math.PI);
    ctx3.fillStyle = "#EAEAEA"
    ctx3.fill();

    ctx3.restore();
}

export {drawCenter};