export const fullParameter = paramName => ({
  name: {
    titles: [{ title: `${paramName} name title` }],
    subtitles: [{ title: `${paramName} name subtitle`, color: 'red' }],
    headers: [{ title: `${paramName} name header`, color: 'red' }],
  },
  type: {
    titles: [
      {
        title: `${paramName} type title`,
        link: `/${encodeURIComponent(paramName)}/type/title/link`,
      },
    ],
    subtitles: [{ title: `${paramName} type subtitle`, color: 'red' }],
    headers: [{ title: `${paramName} type header`, color: 'default' }],
  },
  description: `${paramName} description.`,
});

export const minimalParameter = paramName => ({
  name: {
    title: `${paramName} name title`,
  },
  type: {
    titles: [
      {
        title: `${paramName} type title`,
      },
    ],
  },
});
