import { configure } from '@storybook/react';

function loadStories() {
  require('../src/index.css');
  require('./sidebar');
}

configure(loadStories, module);
