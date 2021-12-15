import { drawImage } from "../../utils/drawing_utils";

const drawToggleSwitchFace = (ctx, width, height, type) => {
    let radius = width / 2;
    let offStateText, onStateText;
    
    switch (type) {
        case 'motionDetected':
            offStateText = 'STILL';
            onStateText = 'MOTION';
            break;
        case 'openClose':
            offStateText = 'FALSE';
            onStateText = 'TRUE';
            break;
        case 'onOff':
            offStateText = 'OFF';
            onStateText = 'ON';
            break;
        default:
            break;
    }

    // Clear out shadows from previous draw
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0
    
    // Draw On and Off labels
    ctx.font = `bold ${width * 0.08}px Calibri`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#222";
    let text = offStateText;
    ctx.fillText(text, width * 0.25, height * 0.12);
    text = onStateText;
    ctx.fillText(text, width * 0.75, height * 0.12);

    // Draw Rim.
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.35, 0, 2 * Math.PI);
    let grad = ctx.createRadialGradient(radius, radius, radius * 0.35 * 0.87, radius, radius, radius * 0.35 * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#888');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();


    // Draw Image
    let src=''
    switch (type) {
        case 'motionDetected':
            src = 'icons/walk.png';
            break;
        case 'openClose':
            src = 'icons/leftright.png';
            break;
        case 'onOff':
            src = 'icons/switch.png';
            break;
        default:
            break;
    }
    drawImage(ctx, radius * 0.8, radius * 0.8, radius * 0.4, radius * 0.4, src);

    // Draw round lip
    ctx.beginPath();
    ctx.arc(radius, radius, radius * 0.5, 0, 2 * Math.PI);
    ctx.strokeStyle = "#113";
    ctx.lineWidth = radius * 0.2;
    ctx.shadowColor = "#555"
    ctx.shadowOffsetX = radius * 0.022
    ctx.shadowOffsetY = radius * 0.02
    ctx.shadowBlur = radius * 0.03
    ctx.stroke();

    // Draw ticks
    ctx.save();
    ctx.translate(radius, radius)
    ctx.rotate(-0.2 * Math.PI);
    ctx.beginPath();
    for (let index = 0; index <= 10; index++) {
        ctx.moveTo(0, radius * -0.56);
        if (index % 5 === 0){
            ctx.lineTo(0, radius * -0.50);
        }else{
        ctx.lineTo(0, radius * -0.53); 
        }
        ctx.rotate(0.04 * Math.PI);
    }

    ctx.strokeStyle = "#CCC";
    ctx.lineCap = 'round';
    ctx.lineWidth = radius * 0.015;
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0
    ctx.stroke();
    ctx.restore()

}

export {drawToggleSwitchFace};