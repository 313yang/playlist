export const debounced = (callback: () => void, delay = 1000) => {
  let timer: any;
  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => callback(), delay);
  };
};

let throttle = false;
export const throttled = (fetchApi: () => void) => {
  if (throttle) return;

  throttle = true;

  fetchApi();
  setTimeout(async () => {
    throttle = false;
  }, 1000);
};
