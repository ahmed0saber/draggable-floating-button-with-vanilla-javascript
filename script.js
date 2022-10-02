const fabElement = document.querySelector(".whatsapp-floating-btn")
let oldPositionX, oldPositionY, draggingTime = 0
let draggingTimeInterval
const move = (e) => {
    if (!fabElement.classList.contains("fab-active")) {
        if (e.type === "touchmove") {
            fabElement.style.top = e.touches[0].clientY - 28 + "px"
            fabElement.style.left = e.touches[0].clientX - 28 + "px"
            fabElement.style.right = "auto"
        } else {
            fabElement.style.top = e.clientY - 28 + "px"
            fabElement.style.left = e.clientX - 28 + "px"
            fabElement.style.right = "auto"
        }
    }
}
const mouseDown = (e) => {
    document.body.style.overflow = "hidden"
    document.body.style.position = "relative"
    document.body.style.height = "100%"
    fabElement.classList.add("being-dragged")
    draggingTime = 0
    draggingTimeInterval = setInterval(() => {
        draggingTime += 100
    }, 100)
    oldPositionY = fabElement.style.top
    oldPositionX = fabElement.style.left
    if (e.type === "mousedown") {
        window.addEventListener("mousemove", move)
    } else {
        window.addEventListener("touchmove", move)
    }
    fabElement.style.transition = "0s ease-in-out left, 0.2s ease-in-out border-radius, 0.2s ease-in-out transform"
}
const mouseUp = (e) => {
    document.body.style.overflow = "auto"
    document.body.style.position = "static"
    document.body.style.height = "auto"
    fabElement.classList.remove("being-dragged")
    if (e.type === "mouseup") {
        window.removeEventListener("mousemove", move)
    } else {
        window.removeEventListener("touchmove", move)
    }
    snapToSide(e)
    fabElement.style.transition = "0.3s ease-in-out left, 0.2s ease-in-out border-radius, 0.2s ease-in-out transform"
    if(draggingTime < 200){
        window.open('https://wa.me/+201208611892', '_target')
    }
    clearInterval(draggingTimeInterval)
}
const snapToSide = (e) => {
    const windowWidth = window.innerWidth
    let currPositionX, currPositionY
    if (e.type === "touchend") {
        currPositionX = e.changedTouches[0].clientX
        currPositionY = e.changedTouches[0].clientY
    } else {
        currPositionX = e.clientX
        currPositionY = e.clientY
    }
    if(currPositionY < 104 + 28) {
        fabElement.style.top = 104 + "px"
    }
    if(currPositionY > window.innerHeight - 68 - 58) {
        fabElement.style.top = (window.innerHeight - 68 - 58) + "px"
    }
    if (currPositionX < windowWidth / 2) {
        fabElement.style.left = "-2px"
        fabElement.style.right = "auto"
        fabElement.classList.remove('right')
        fabElement.classList.add('left')
    } else {
        fabElement.style.left = "calc(100% - 56px)"
        setTimeout(()=>{
            fabElement.style.right = "-2px"
            fabElement.style.left = "auto"
        }, 300)
        fabElement.classList.remove('left')
        fabElement.classList.add('right')
    }
}
fabElement.addEventListener("mousedown", mouseDown)
fabElement.addEventListener("mouseup", mouseUp)
fabElement.addEventListener("touchstart", mouseDown)
fabElement.addEventListener("touchend", mouseUp)