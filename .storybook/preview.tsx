import type { Preview } from '@storybook/react-vite'
import { themes } from 'storybook/theming';

import "../src/index.css"

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark
    },
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Adding a dark background color to Storybook's canvas when in dark mode
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#09090b' }, // Adjust this hex to match your app's dark background
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow', // Shows a nice little icon in the toolbar
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },

  // 👇 2. This applies the 'dark' class to the HTML tag when you toggle it
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // Select the HTML element
      const htmlElement = document.documentElement;

      if (theme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }

      // Return the story with the new classes applied
      return Story();
    },
  ],

};

export default preview;