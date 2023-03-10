export const pageView = (url: URL) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
    page_path: url,
  });
};
