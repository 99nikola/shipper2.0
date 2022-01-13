export function delaySlide(checkbox: HTMLInputElement, slide: () => void) {
    if (checkbox.checked)
        return;

    setTimeout(() => {
        slide();
        checkbox.checked = false;
    }, 250);
}