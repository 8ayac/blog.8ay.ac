export {};

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {
    color: {
      blue: { [key: string]: string };
      green: { [key: string]: string };
      yellow: { [key: string]: string };

      primary: string;
      primaryLight: string;
      primaryDark: string;

      text: {
        primary: string;
        primaryLight: string;
        secondary: string;
        accent: string;
      };

      border: {
        primary: string;
        primaryLight: string;
      };
    };
  }
}
