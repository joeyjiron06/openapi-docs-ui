export const simpleResponses = [
  {
    tag: { title: '200 OK' },
    headers: {
      description: 'An auth bearer token in response header',
      content: [
        {
          name: {
            title: 'bearerTokenInResponseHeader',
            subtitles: [{ title: 'required' }]
          },
          type: {
            titles: [{ title: 'stringInResponseHeader' }]
          },
          description: 'Descripion of bearerTokenInResponseHeader'
        }
      ]
    },
    body: {
      description: 'This is the description of the response body.',
      content: [
        {
          name: {
            title: 'userEmailNameInBody',
            subtitles: [{ title: 'required', color: 'red' }]
          },
          type: {
            titles: [{ title: 'userEmailTypeInBody' }]
          },
          description: 'Descripion of userEmailNameInBody'
        }
      ]
    }
  }
];
