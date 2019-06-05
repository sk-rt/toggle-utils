export interface IParams {
    nameSpace: string;
    speed: number;
    easing: string;
    displayValue: string;
    onAnimationStart: (isOpen: boolean) => void;
    onAnimationEnd: (isOpen: boolean) => void;
}

const _defaultParams: IParams = {
    nameSpace: 'is-toggle',
    speed: 400,
    easing: 'ease',
    displayValue: 'block',
    onAnimationStart: () => undefined,
    onAnimationEnd: () => undefined
};
export const ambientToggle = (targetElement: HTMLElement) => {
    return (showFunction: Function, hideFunction: Function) => {
        if (window.getComputedStyle(targetElement).display === 'none') {
            showFunction();
        } else {
            hideFunction();
        }
    };
};
export const ambientShow = (
    targetElement: HTMLElement,
    _param: Partial<IParams>
) => {
    const param = {
        ..._defaultParams,
        ..._param
    };
    return (
        onStart: (param: IParams) => void,
        onEnd: (param: IParams) => void
    ) => {
        onStart(param);
        targetElement.style.display = param.displayValue;
        // targetElement.style.transition = `${param.speed}ms ${param.easing}`;
        targetElement.classList.add(
            `${param.nameSpace}-animating`,
            `${param.nameSpace}-showing`
        );

        setTimeout(() => {
            targetElement.classList.remove(
                `${param.nameSpace}-animating`,
                `${param.nameSpace}-showing`
            );
            targetElement.classList.add(`${param.nameSpace}-shown`);
            targetElement.classList.remove(`${param.nameSpace}-hidden`);
            onEnd(param);
        }, param.speed);
    };
};
export const ambientHide = (
    targetElement: HTMLElement,
    _param: Partial<IParams>
) => {
    const param = {
        ..._defaultParams,
        ..._param
    };
    return (
        onStart: (param: IParams) => void,
        onEnd: (param: IParams) => void
    ) => {
        if (targetElement.classList.contains(`${param.nameSpace}-animating`)) {
            return;
        }
        onStart(param);
        targetElement.classList.add(
            `${param.nameSpace}-animating`,
            `${param.nameSpace}-hiding`
        );
        targetElement.style.display = param.displayValue;
        // targetElement.style.transition = `${param.speed}ms ${param.easing}`;
        setTimeout(() => {
            targetElement.style.display = 'none';
            // targetElement.style.transition = '';
            targetElement.classList.remove(
                `${param.nameSpace}-animating`,
                `${param.nameSpace}-hiding`
            );
            targetElement.classList.add(`${param.nameSpace}-hidden`);
            targetElement.classList.remove(`${param.nameSpace}-shown`);
            onEnd(param);
        }, param.speed);
    };
};
