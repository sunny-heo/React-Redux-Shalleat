import anime from "animejs";

export const _heightAnimation = (on, targets, fromSize, toSize) =>
  anime({
    targets,
    height: on ? [fromSize, toSize] : [toSize, fromSize],
    easing: "easeInOutElastic"
  });
export const _widthAnimation = (on, targets, fromSize, toSize) =>
  anime({
    targets,
    width: on ? [fromSize, toSize] : [toSize, fromSize],
    easing: "easeInOutElastic"
  });
