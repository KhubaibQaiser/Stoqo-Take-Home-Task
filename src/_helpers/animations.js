import { spring } from 'react-router-transition';

export const animations = {
    ltrEnter: {
        opacity: 0,
        offset: 100
    },

    ltrExit: {
        opacity: 0,
        offset: -100
    },

    rtlEnter: {
        opacity: 0,
        offset: -100
    },

    rtlExit: {
        opacity: 0,
        offset: 100
    },

    Active: {
        opacity: bounce(1),
        offset: bounce(0)
    },

    MapStyles: (styles) => {
        return {
            opacity: styles.opacity,
            transform: 'translateX(' + styles.offset + '%)',
        };
    }
}

//wrap the `spring` helper to use a bouncy config
function bounce(val) {
    return spring(val, {
        stiffness: 176,
        damping: 20,
    });
}


export const AnimateCss = {
    AnimateWithDelay: function (element, animationName, duration, onComplete, saveAnimatedState, delay) {
        if (delay === null || typeof delay === 'undefined' || delay < 0) {
            this.Animate(element, animationName, duration, onComplete, saveAnimatedState);
        }
        else {
            setTimeout((_this) => {
                this.Animate(element, animationName, duration, onComplete, saveAnimatedState);
            }, delay, this);
        }
    },
    Animate: function (element, animationName, duration, onComplete, saveAnimatedState) {
        saveAnimatedState = saveAnimatedState === true;
        element.classList.add("animated", animationName);

        if (duration == null || duration <= 0) {
            const style = window.getComputedStyle(element),
                duration = parseFloat(style.getPropertyValue('animation-duration')) * 1000;
            console.log(duration);
        }

        element.setAttribute("style",
            "-webkit-animation-duration:" + String(duration / 1000) + "s;" +
            " animation-duration:" + String(duration / 1000) + "s");

        setTimeout(() => {
            if (!saveAnimatedState)
                element.classList.remove("animated", animationName);

            if (typeof onComplete === "function") {
                onComplete(element);
            }
        }, duration);
    },
}