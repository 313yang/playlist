import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;

      lightGray: string;
      gray: string;
      darkGray: string;
      main: string;
    };

    device: {
      mobile: string;
      tablet: string;
      tabletL: string;
    };
  }
}
