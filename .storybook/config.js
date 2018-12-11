import { configure } from '@storybook/react';

function loadStories() {
  require('../src/index.css');
  require('./sidebarStory');
  require('./parameterTableStory');
  require('./operationStory');
}

configure(loadStories, module);
