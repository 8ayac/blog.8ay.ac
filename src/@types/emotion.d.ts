export {};

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {
    color: RecursivePartialTheme;
  }
  type RecursivePartialTheme<T extends string> = {
    [P in keyof T]?: RecursivePartialTheme<T[P]>;
  };
}
