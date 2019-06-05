/**
 * toggle-utils
 * https://github.com/sk-rt/toggle-utils
 * Copyright (c) 2018  Ryuta Sakai
 * Licensed under the MIT license.
 */
import {
    ambientToggle,
    ambientShow,
    ambientHide,
    IParams
} from './modules/ambient';
import { getTargetSizes } from './modules/domUtils';
export type ToggleFuntion = (
    targetElement: HTMLElement,
    param: Partial<IParams>
) => void;

/* ------------------------------------------------
    fadeIn/fadeOut
 */
export const fadeToggle = (
    targetElement: HTMLElement,
    _param: Partial<IParams> = {}
) => {
    ambientToggle(targetElement)(
        () => fadeIn(targetElement, _param),
        () => fadeOut(targetElement, _param)
    );
};
// const getKeyFrames = () => {
//     const css = document.createElement('style');
//     css.media = 'screen';
//     css.type = 'text/css';
//     css.innerHTML = `
//     @keyframes _fadein {
//         0% {
//             display:block;
//             opacity: 0;
//         }
//         100% {
//             opacity: 1.0;
//             }
//     }
//     `;
//     return css;
// };
export const fadeIn = (
    targetElement: HTMLElement,
    _param: Partial<IParams> = {}
): void => {
    if (!targetElement) return;

    // const opacity = window.getComputedStyle(targetElement).opacity || '1';
    // const css = getKeyFrames();
    targetElement.style.opacity = '0';

    ambientShow(targetElement, _param)(
        param => {
            // document.head.appendChild(css);
            targetElement.style.transition = `${param.speed}ms ${param.easing}`;
            targetElement.style.display = param.displayValue;
            param.onAnimationStart(true);
            targetElement.style.opacity = '0';
            targetElement.style.visibility = 'visible';
            // requestAnimationFrame(() => {
            //     // targetElement.style.animation = `_fadein ${param.speed}ms ${
            //     //     param.easing
            //     // } 0s 1 normal forwards`;
            //     targetElement.style.opacity = '1';
            // });
            setTimeout(() => {
                targetElement.style.opacity = '1';
            }, 1);
            // setTimeout(() => {
            //     targetElement.style.animation = `_fadein ${param.speed}ms ${
            //         param.easing
            //     } 0s 1 normal forwards`;
            // }, 1);
        },
        param => {
            targetElement.style.opacity = '1';
            // targetElement.style.visibility = '';
            targetElement.style.visibility = 'visible';
            targetElement.style.animation = '';
            targetElement.style.transition = ``;
            param.onAnimationEnd(true);
            // document.head.removeChild(css);
        }
    );
};
export const fadeOut = (
    targetElement: HTMLElement,
    _param: Partial<IParams> = {}
) => {
    if (!targetElement) return;
    // const css = getKeyFrames();

    ambientHide(targetElement, _param)(
        param => {
            // document.head.appendChild(css);
            param.onAnimationStart(false);
            targetElement.style.opacity = '1';
            targetElement.style.visibility = 'visible';
            targetElement.style.transition = `${param.speed}ms ${param.easing}`;

            setTimeout(() => {
                targetElement.style.opacity = '0';
                // targetElement.style.animation = `_fadein ${param.speed}ms ${
                //     param.easing
                // } 0s 1 reverse forwards`;
            }, 1);
        },
        param => {
            targetElement.style.opacity = '0';
            targetElement.style.visibility = 'hidden';
            targetElement.style.animation = '';
            targetElement.style.transition = ``;
            param.onAnimationEnd(false);
            // document.head.removeChild(css);
        }
    );
};

/* ------------------------------------------------
    SlideUp/SlideDown
 */
export const slideToggle = (
    targetElement: HTMLElement,
    _param: Partial<IParams> = {}
) => {
    ambientToggle(targetElement)(
        () => slideDown(targetElement, _param),
        () => slideUp(targetElement, _param)
    );
};
export const slideDown: ToggleFuntion = (targetElement, _param = {}): void => {
    const sizes = getTargetSizes(targetElement);
    if (!sizes) return;
    ambientShow(targetElement, _param)(
        param => {
            param.onAnimationStart(true);
            targetElement.style.transition = `${param.speed}ms ${param.easing}`;

            targetElement.style.overflow = 'hidden';
            targetElement.style.maxHeight = '0px';
            setTimeout(() => {
                targetElement.style.maxHeight = (sizes.height || '1000') + 'px';
            }, 1);
        },
        param => {
            targetElement.style.maxHeight = '';
            targetElement.style.overflow = '';
            targetElement.style.transition = '';
            param.onAnimationEnd(true);
        }
    );
};
export const slideUp = (
    targetElement: HTMLElement,
    _param: Partial<IParams> = {}
) => {
    const sizes = getTargetSizes(targetElement);
    if (!sizes) return;
    ambientHide(targetElement, _param)(
        param => {
            param.onAnimationStart(false);
            targetElement.style.transition = `${param.speed}ms ${param.easing}`;
            targetElement.style.maxHeight = (sizes.height || '1000') + 'px';
            targetElement.style.overflow = 'hidden';

            setTimeout(() => {
                targetElement.style.maxHeight = '0px';
            }, 1);
        },
        param => {
            targetElement.style.maxHeight = '';
            targetElement.style.overflow = '';
            targetElement.style.transition = '';
            param.onAnimationEnd(false);
        }
    );
};
