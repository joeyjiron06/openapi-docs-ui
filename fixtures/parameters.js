export const userParameter = {
  title: 'userEmail',
  subtitles: [{ title: 'required', color: 'red' }]
};

export const simpleParameters = [
  {
    name: userParameter,
    type: {
      titles: [{ title: 'string' }],
      subtitles: [{ title: 'email', color: 'default' }],
      headers: [{ title: 'exactly', color: 'default' }]
    }
  }
];
