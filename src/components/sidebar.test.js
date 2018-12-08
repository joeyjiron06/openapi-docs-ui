import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import Sidebar from './sidebar';

afterEach(cleanup);

describe('Sidebar', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should render the sections', () => {
    const sections = [
      { title: 'API', items: [{ title: 'Overview' }] },
      {
        title: 'Pets',
        items: [
          { title: 'Get all pets' },
          { title: 'Post a pet' },
          { title: 'Delete a pet' }
        ]
      },
      {
        title: 'Users',
        items: [
          { title: 'Get users' },
          { title: 'Add a user' },
          { title: 'Delete users' }
        ]
      }
    ];
    const { getByText } = render(<Sidebar sections={sections} />);

    sections.forEach(section => {
      expect(getByText(section.title)).toBeInTheDocument();
      section.items.forEach(item => {
        expect(getByText(item.title)).toBeInTheDocument();
      });
    });
  });
});
