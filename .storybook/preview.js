import { setup } from '@storybook/vue3';
import vuetify from '../src/plugins/vuetify';
import 'remixicon/fonts/remixicon.css';
import '../src/scss/styles.scss';

setup((app) => {
  app.use(vuetify);
});

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#1E1E1E',
        },
        {
          name: 'gray',
          value: '#F5F5F5',
        },
      ],
    },
  },
};

export default preview;