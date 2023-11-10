export type TPalette = {
  main: string;
};
export type TTheme = {
  primary: TPalette;
  secondary: TPalette;
  error: TPalette;
  backgrounds: {
    webPrimary: string;
    appPrimary: string;
    webSecondary: string;
    appSecondary: string;
    webMobile: string;
    inputColor: string;
    success: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
};
