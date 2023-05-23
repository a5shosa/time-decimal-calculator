/*
 * GA_MEASUREMENT_ID is not required.
 * if it is 'undefined', measurement is ignored by Google script (Not raise JS error).
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};