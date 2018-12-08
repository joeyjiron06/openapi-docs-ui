import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const Sidebar = ({ sections, title, version }) => (
  <div className={css(styles.root)}>
    <div>
      <span className={css(styles.title)}>{title}</span>
      <span>{`v${version}`}</span>
    </div>

    {
      <div>
        {sections.map(({ title, items }, index) => (
          <div key={index}>
            <div className={css(styles.listItem, styles.sectionTitle)}>
              {title}
            </div>
            {items.map(({ title }, index) => (
              <div
                key={`${index}`}
                className={css(styles.listItem, styles.itemTitle)}
              >
                {title}
              </div>
            ))}
          </div>
        ))}
      </div>
    }
  </div>
);

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1B1C19',
    color: 'white',
    padding: 40,
    maxWidth: 240
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10
  },
  listItem: {
    marginBottom: 22
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 40
  },
  itemTitle: {
    cursor: 'pointer',
    opacity: 0.8,
    transition: 'opacity 250ms ease-in-out',
    ':hover': {
      opacity: 1
    }
  }
});

export default Sidebar;
