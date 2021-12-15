
const drawFace = (ctx1, radius) => {
    ctx1.save();
    ctx1.beginPath();
    ctx1.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx1.fillStyle = '#EDEDED';
    ctx1.fill();
    let grad = ctx1.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#888');
    ctx1.strokeStyle = grad;
    ctx1.lineWidth = radius * 0.1;
    ctx1.stroke();
}

const drawColorArcs = (ctx1, radius) => {
    // The orange color arc
    ctx1.beginPath();
    ctx1.arc(0, 0, radius * 0.8 , 0.75 * Math.PI, 1.25 * Math.PI);
    ctx1.lineWidth = radius * 0.1;
    ctx1.strokeStyle = "#C96D42"
    ctx1.stroke();

    // The green color arc
    ctx1.beginPath();
    ctx1.arc(0, 0, radius * 0.8 , 1.25 * Math.PI, 1.75 * Math.PI);
    ctx1.lineWidth = radius * 0.1;
    ctx1.strokeStyle = "#8E9D4D"
    ctx1.stroke();

    // The blue color arc
    ctx1.beginPath();
    ctx1.arc(0, 0, radius * 0.8 , 1.75 * Math.PI, 0.25 * Math.PI);
    ctx1.lineWidth = radius * 0.1;
    ctx1.strokeStyle = "#056FB7"
    ctx1.stroke();
}

const drawTicks = (ctx1, radius) => {
    ctx1.restore();
    // The tick arc
    ctx1.beginPath();
    ctx1.arc(0, 0, radius * (0.8 + 0.055), 0.75 * Math.PI, 0.25 * Math.PI);
    ctx1.lineWidth = radius * 0.015;
    ctx1.lineCap = "round";
    // ctx1.stroke();

    ctx1.save();
    ctx1.rotate(0.75 * Math.PI);
    ctx1.strokeStyle = "#333333"

    // Large ticks
    ctx1.save();
    ctx1.moveTo(radius * (0.8 + 0.05), 0);
    ctx1.lineTo(radius * (0.72), 0);
    // ctx1.stroke();
    
    for (let i = 0; i < 5; i++) {
        ctx1.rotate(0.3 * Math.PI);
        ctx1.moveTo(radius * (0.8 + 0.05), 0);
        ctx1.lineTo(radius * (0.72), 0);
        // ctx1.stroke();  
    }
    ctx1.stroke();
    ctx1.restore();

    // Small ticks
    ctx1.save();
    ctx1.beginPath()
    ctx1.lineWidth = radius * 0.008;
    for (let i = 0; i < 50; i++) {
        if (i % 5 === 0){
            // Points 0, 20, 40, 60... already has the large tick
            // so draw nothing and just rotate to next point.
            if (i % 10 === 0) {
                ctx1.rotate(0.03 * Math.PI);
                continue;
            }
            // Draw longer small tick at point 10, 30, 50 ......
            ctx1.moveTo(radius * (0.8 + 0.06), 0);
            ctx1.lineTo(radius * (0.77), 0)    
        }
        // Draw shorter small tick at points 2, 4, 6, 8, 12.....
        else{
            ctx1.moveTo(radius * (0.8 + 0.06), 0);
            ctx1.lineTo(radius * (0.8), 0) 
        }
        ctx1.rotate(0.03 * Math.PI);
    }
    ctx1.stroke();
    ctx1.restore();

    // Tick text
    ctx1.font = `${radius * 0.12}px open sans`;
    ctx1.textBaseline = "middle";
    ctx1.textAlign = "center";
    ctx1.fillStyle = '#333'
    for (let i = 0; i <= 5; i++) {
        ctx1.save();
        ctx1.translate(radius * 0.62, 0);
        ctx1.rotate(- (0.75 + 0.3 * i) * Math.PI);
        ctx1.fillText(i * 20, 0, 0);
        ctx1.restore();
        ctx1.rotate(0.3 * Math.PI);
    }
    ctx1.restore();
    
}

const drawLCD = (ctx1, radius) => {
        // The LCD display
        ctx1.beginPath();
        ctx1.moveTo(-radius * 0.28, radius * 0.52);
        ctx1.lineTo(radius * 0.28, radius * 0.52);
        ctx1.lineTo(radius * 0.38, radius * 0.75);
        ctx1.lineTo(-radius * 0.38, radius * 0.75);
        
        ctx1.closePath()
        ctx1.lineWidth = radius * 0.03
        ctx1.fillStyle = "#BABAB2"
        ctx1.strokeStyle = "#555555"
        ctx1.shadowOffsetX = 0;
        ctx1.shadowOffsetY = 0;
        ctx1.shadowBlur = 0;
        ctx1.lineJoin = "round";
        ctx1.fill()
        ctx1.stroke()

}

export {drawFace, drawColorArcs, drawTicks, drawLCD};
