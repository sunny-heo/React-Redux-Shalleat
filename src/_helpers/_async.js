export const _delay = duration => new Promise(res => setTimeout(res, duration));
export const _repeat = async (cb, duration) => {
  try {
    cb();
    const timerId = await setInterval(cb, duration);
    return timerId;
  } catch (error) {
    console.log(error);
  }
};
