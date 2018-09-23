import anime from "animejs";

export const heightAnimation = (on, targets, fromSize, toSize) =>
  anime({
    targets,
    height: on ? [fromSize, toSize] : [toSize, fromSize],
    easing: "easeInOutQuad"
  });
