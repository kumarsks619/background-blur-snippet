import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    },
})
selfieSegmentation.setOptions({ modelSelection: 1 })

export const segment = async ({ videoElement, canvasElementID }) => {
    selfieSegmentation.onResults((results) => {
        renderOnCanvas({ results, canvasElementID })
    })
    await selfieSegmentation.send({ image: videoElement })
}

export const renderOnCanvas = ({ results, canvasElementID }) => {
    const canvasElement = document.getElementById(canvasElementID)
    const ctx = canvasElement.getContext('2d')

    ctx.save()
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

    ctx.filter = 'none'
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    )

    ctx.globalCompositeOperation = 'source-in'
    ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

    ctx.filter = 'blur(16px)'
    ctx.globalCompositeOperation = 'destination-over'
    ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

    ctx.restore()
}
