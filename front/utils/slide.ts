export function delaySlide(checkbox: HTMLInputElement, label: HTMLLabelElement, slide: () => void) {
    const labelFor = label.htmlFor;
    if (labelFor === "disabled")
        return;

    label.htmlFor = "disabled";

    setTimeout(() => {
        slide();
        label.htmlFor = labelFor;
        checkbox.checked = false;
    }, 250);
}