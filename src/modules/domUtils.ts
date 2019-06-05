/**
 * Get Elemet Height
 * @param targetEl - target Element
 * @return Height(px)
 */
type Sizes = {
    width: number;
    height: number;
};
export const getTargetSizes = (targetEl: HTMLElement): Sizes | void => {
    if (!targetEl) return;
    const cloneEl = targetEl.cloneNode(true) as HTMLElement;
    const parentEl = targetEl.parentNode || document.body;

    if (!parentEl) return;
    cloneEl.style.maxHeight = 'none';
    cloneEl.style.display = 'block';
    cloneEl.style.opacity = '0';

    parentEl.appendChild(cloneEl);
    const sizes = { width: cloneEl.clientWidth, height: cloneEl.clientHeight };
    parentEl.removeChild(cloneEl);
    return sizes;
};
