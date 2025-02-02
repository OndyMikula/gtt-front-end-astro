const scrollStep = 200;
let scrollDirection = "left";

export function onCarouselChange(element: HTMLDivElement) {
    const container = element as HTMLDivElement;
    //@ts-expect-error
    const carouselControls = element.parentElement.getElementsByClassName('Carousel-controls')[0] as HTMLDivElement;
    //@ts-expect-error
    const leftButton = container.parentElement.getElementsByClassName('Carousel-left')[0] as HTMLButtonElement;
    //@ts-expect-error
    const rightButton = container.parentElement.getElementsByClassName('Carousel-right')[0] as HTMLButtonElement;
    if((container.scrollWidth - container.clientWidth) > 0){
        carouselControls.style.display = "flex";
    }
    scrollHandler(container);
    container.addEventListener('scroll', event => {scrollHandler(container);});

    rightButton.addEventListener("click", event => {scrollRight(container);});
    leftButton.addEventListener("click", event => {scrollLeft(container);});
}

/**
 * Enable autoscroll for carousel. 
 * @param element carousel element
 * @param interval time in milliseconds
 */
export function enableAutoScroll(element: HTMLDivElement, interval: number) {
    const container = element as HTMLDivElement;
    setInterval(function (container: HTMLDivElement) {
        if (scrollDirection === "left") {
            scrollLeft(container);
        } else if (scrollDirection === "right") {
            scrollRight(container);
        } else {
            console.error("Unknown scroll direction.");
        }
    }, interval, container);
}

/**
 * Scroll carousel container to right
 * @param container carousel element
 */
function scrollRight(container: HTMLDivElement) {
    const scrollRight = container.scrollWidth - container.clientWidth - container.scrollLeft;
    if((scrollRight - scrollStep) < (scrollStep/2)){
        container.scrollBy(scrollRight, 0);
        scrollDirection = "left";
    }else{
        container.scrollBy(scrollStep, 0);
    }
}

/**
 * Scroll carousel container to left
 * @param container carousel element
 */
function scrollLeft(container: HTMLDivElement) {
    if((container.scrollLeft-scrollStep) < (scrollStep/2)){
        container.scrollBy(-container.scrollLeft, 0);
        scrollDirection = "right";
    }else{
        container.scrollBy(-scrollStep, 0);
    }
}

function scrollHandler(container: HTMLDivElement){
    //@ts-expect-error
    const leftButton = container.parentElement.getElementsByClassName('Carousel-left')[0] as HTMLButtonElement;
    //@ts-expect-error
    const rightButton = container.parentElement.getElementsByClassName('Carousel-right')[0] as HTMLButtonElement;
    if (((container.scrollLeft + container.clientWidth) > (container.scrollWidth - 1)) && !rightButton.classList.contains("Carousel-disabled")) {
        rightButton.classList.add("Carousel-disabled");
    } else if (((container.scrollLeft + container.clientWidth) <= (container.scrollWidth - 1)) && rightButton.classList.contains("Carousel-disabled")) {
        rightButton.classList.remove("Carousel-disabled");
    }
    if ((container.scrollLeft == 0) && !leftButton.classList.contains("Carousel-disabled")) {
        leftButton.classList.add("Carousel-disabled");
    } else if ((container.scrollLeft != 0) && leftButton.classList.contains("Carousel-disabled")) {
        leftButton.classList.remove("Carousel-disabled");
    }
}

export function carouselAppendChild(carousel: HTMLDivElement, node: Node){
    carousel.appendChild(node);
    for (const img of carousel.querySelectorAll("img")) {
        img.onload = function () {
            onCarouselChange(carousel);
        }
    }
    onCarouselChange(carousel);
}