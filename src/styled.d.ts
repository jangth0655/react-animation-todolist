// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    activeColor: string;
    accentColor: string;
    purple: string;
    dark: string;
    light: string;
    color: string;
    white: string;
  }
}
