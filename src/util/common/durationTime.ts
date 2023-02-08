export const msToMinutesAndSeconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = (ms % 60000) / 1000;
  return ` ${minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
};
