import { drawRoundRectWithRadii, drawRectangle } from '../../utils/drawing_utils'

const drawBatteryFace = (ctx, width, height) => {
    // draw top slab
    ctx.fillStyle = '#222'
    drawRectangle(ctx, width / 50, height * 4 / 15, width * 24 / 25, height / 12, true, false)
    drawRectangle(ctx, width / 20, height * 4 / 30, width * 9 / 10, height / 6, true, false)
    ctx.fillStyle = '#333'
    ctx.shadowColor = "#555"
    ctx.shadowOffsetX = width / 100
    ctx.shadowBlur = width / 100
    drawRoundRectWithRadii(ctx, width / 4, height * 3 / 20, width / 2, height * 7 / 60, true, false, 20, 20, 0, 0)

    ctx.shadowColor = undefined
    ctx.shadowOffsetX = 0
    ctx.shadowBlur = 0

    // draw left electrode
    ctx.fillStyle = '#777'
    drawRectangle(ctx, width / 10, height / 10, width / 15, height / 10, true, false)
    ctx.fillStyle = '#A00'
    drawRectangle(ctx, width / 15, height / 5, width / 7.5, height / 15, true, false)

    // draw right electrode
    ctx.fillStyle = '#777'
    drawRectangle(ctx, width * 5 / 6, height / 10, width / 15, height / 10, true, false)
    ctx.fillStyle = '#00C'
    drawRectangle(ctx, width * 12 / 15, height / 5, width / 7.5, height / 15, true, false)

    // draw body
    ctx.fillStyle = '#BFBFBF'
    drawRectangle(ctx, width / 25, height * 7 / 20, width * 23 / 25, height / 2, true, false)

    // draw base
    ctx.fillStyle = '#444'
    drawRoundRectWithRadii(ctx, width / 30, height * 17 / 20, width * 14 / 15, height / 25, true, false, 5, 5, 0, 0)
}


export { drawBatteryFace };
