import * as colors from '@/src/constants/colors';

const globalStyleTheme = {
  color: {
    body: {
      bg: colors.yellow.base,
    },

    table: {
      tr: {
        bg2n: colors.green.light3,
      },
    },
  },
};

const commonTheme = {
  color: {
    text: {
      primary: 'hsla(0, 0%, 15%)',
      primaryLight: 'hsla(0, 0%, 40%)',
      secondary: colors.blue.dark2,
      accent: colors.green.dark,
    },

    border: {
      primary: 'hsla(0, 0%, 50%)',
      primaryLight: 'hsla(0, 0%, 75%)',
    },
  },
};

const elementsTheme = {
  color: {
    blogTitle: {
      logoWrapperAnchor: {
        textOnHover: colors.green.light2,
      },
    },

    bodyHeader: {
      titleAnchor: {
        shadow: colors.green.light3,
      },
    },

    categoryTag: {
      anchor: {
        text: 'white',

        bg: colors.blue.dark,
        bgOnHover: colors.blue.base,

        shadow: colors.blue.light2,
      },
    },

    dateTime: {
      isoDateTime: {
        text: colors.blue.dark2,
      },
    },

    markdownRenderer: {
      convertedMdBody: { blockquote: { border: colors.blue.light3 } },
    },

    socialLinkWithIcon: {
      socialLinkAnchor: { textOnHover: colors.yellow.base },
    },
  },
};

const widgetsTheme = {
  color: {
    articleShareButtons: {
      buttonWrapperDiv: {
        shadow: colors.blue.light2,
      },
    },

    siteHeader: {
      header: {
        bg: colors.green.dark3,
        shadow: colors.green.dark4,
      },

      innerWrapperFlexContainerDiv: {
        shadow: colors.green.dark4,
      },
    },
  },
};

export const theme = {
  color: {
    global: globalStyleTheme.color,
    common: commonTheme.color,

    ...elementsTheme.color,
    ...widgetsTheme.color,
  },
};
