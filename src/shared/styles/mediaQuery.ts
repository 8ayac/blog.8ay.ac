const breakpoints = {
  xs: 400, // Extra small devices (portrait phones, less than 576px)
  sm: 576, // Small devices (landscape phones, 576px and up)
  md: 768, // Medium devices (tablets, 768px and up)
  lg: 992, // Large devices (desktops, 992px and up)
  xl: 1200, // Extra large devices (large desktops, 1200px and up)
};

export const mq = (key: keyof typeof breakpoints): string => {
  return `@media screen and (max-width: ${breakpoints[key]}px)`;
};
