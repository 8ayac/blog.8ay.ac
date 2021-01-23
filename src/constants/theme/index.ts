import * as colors from '@/src/constants/colors';

export const theme = {
  color: {
    blue: colors.blue,
    green: colors.green,
    yellow: colors.yellow,

    primary: colors.blue.base,
    primaryLight: colors.blue.light,
    primaryDark: colors.blue.dark,

    text: {
      primary: 'hsla(0, 0%, 15%)',
      primaryLight: 'hsla(0, 0%, 40%)',
      secondary: colors.blue.dark2,
      accent: colors.green.dark,
    },
  },
};
