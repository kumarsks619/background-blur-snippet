videoElement.onplaying = async () => {
    let lastTime = new Date()

    async function getFrames() {
        const now = videoElement.currentTime
        if (now > lastTime) {
            await segment({
                videoElement,
                canvasElementID: 'meetingGatewayCanvasID',
            })
        }
        lastTime = now
        requestAnimationFrame(getFrames)
    }

    await getFrames()
}
