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

  it('should render the title and version number', () => {
    const title = 'Title';
    const version = '6.0.1';
    const { getByText } = render(
      <Sidebar title={title} version={version} sections={sections} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(`v${version}`)).toBeInTheDocument();
  });
  it('should render the sections', () => {
    const { getByText } = render(
      <Sidebar title="" version="" sections={sections} />
    );

    sections.forEach(section => {
      expect(getByText(section.title)).toBeInTheDocument();
      section.items.forEach(item => {
        expect(getByText(item.title)).toBeInTheDocument();
      });
    });
  });
});
