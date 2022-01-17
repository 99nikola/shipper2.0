export enum EDir {
    LEFT = "-",
    RIGHT = "+"
}

let animationFrame: number | null = null;

export function slide(element: HTMLElement, distance: number, dir = EDir.RIGHT, duration: number, stay?: boolean) {
    return new Promise<void>(resolve => {
        if (animationFrame !== null) 
            return;

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
                animationFrame = window.requestAnimationFrame(step);
            } else {
                setTimeout(() => {
                    if (!stay) {
                        window.requestAnimationFrame(() => element.style.transform = "translateX(0px)");
                        animationFrame = null;
                    }
                    resolve();
                });
            }
        }
    
        animationFrame = window.requestAnimationFrame(step);
    });
}