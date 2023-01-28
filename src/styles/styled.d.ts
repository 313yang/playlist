import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      black: string;
      white: string;
      lightGray: string;
      gray: string;
      darkGray: string;
      main: string;
      secondary: string;
      red: string;
    };

    device: {
      mobile: string;
      tablet: string;
      tabletL: string;
    };
  }
}
