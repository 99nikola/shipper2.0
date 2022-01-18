export enum EDir {
    LEFT = "-",
    RIGHT = "+"
}

export function slide(element: HTMLElement, distance: number, dir = EDir.RIGHT, duration: number) {
    return new Promise<void>(resolve => {

        let start: DOMHighResTimeStamp, previousTimeStamp: DOMHighResTimeStamp;
        let speed = distance / duration;
    
        const step = (timestamp: DOMHighResTimeStamp) => {
            if (start === undefined) {
                start = timestamp;
            }
            const elapsed = timestamp - start;
    
            if (previousTimeStamp !== timestamp) {
                const count = Math.min(speed * elapsed, distance);
                element.style.transform = "translateX(" + dir + count + "px)";
            }
    
            if (elapsed < duration) {
                previousTimeStamp = timestamp
                window.requestAnimationFrame(step);
            } else {
                setTimeout(() => {
                    window.requestAnimationFrame(() => element.style.transform = "translateX(0px)");
                    resolve();
                });
            }
        }
    
        window.requestAnimationFrame(step);
    });
}