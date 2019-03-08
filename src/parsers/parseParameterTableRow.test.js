import parseParameterTableRow from './parseParameterTableRow';

describe('parseParameterTableRow', () => {
  describe('$ref', () => {});

  describe('object', () => {
    it('should return a red subtitle called "required" when a value is required', () => {
      expect(
        parseParameterTableRow(
          {
            type: 'number',
            description: 'the age of the pet',
          },
          'age',
          ['age'],
        ),
      ).toEqual({
        name: {
          subtitles: [{ title: 'required', color: 'red' }],
          titles: [{ title: 'age' }],
        },
        type: {
          titles: [{ title: 'number' }],
        },
        description: 'the age of the pet',
      });
    });

    it('should return a link when array of is a schema', () => {
      expect(
        parseParameterTableRow(
          {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Pet',
            },
          },
          'details',
        ),
      ).toEqual(
        expect.objectContaining({
          type: expect.objectContaining({
            titles: [
              {
                title: 'Pet',
                link: '#/components/schemas/Pet',
              },
            ],
          }),
        }),
      );
    });

    it('should return a yellow subtitle called "depcreated" when a value is deprecated', () => {
      expect(
        parseParameterTableRow(
          {
            type: 'string',
            deprecated: true,
          },
          'tricks',
        ),
      ).toEqual(
        expect.objectContaining({
          name: expect.objectContaining({
            subtitles: [{ title: 'deprecated', color: 'yellow' }],
          }),
        }),
      );
    });

    it('should throw an error when marked as oneOf and has an inline schema', () => {
      expect(() => parseParameterTableRow(
        {
          oneOf: [
            {
              $ref: '#/components/schemas/Dog',
            },
            {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'the name of the pet',
                },
              },
            },
            {
              type: 'object',
              properties: {
                lastName: {
                  type: 'string',
                  description: 'the last name of the pet',
                },
              },
            },
            {
              type: 'string',
              description: 'some string',
            },
          ],
        },
        'pet',
      )).toThrow();
    });

    it('should return a header called "exactly one of" when marked as oneOf ', () => {
      expect(
        parseParameterTableRow(
          {
            oneOf: [
              {
                $ref: '#/components/schemas/Cat',
              },
              {
                $ref: '#/components/schemas/Dog',
              },
            ],
          },
          'pet',
        ),
      ).toEqual(
        expect.objectContaining({
          type: expect.objectContaining({
            headers: [
              {
                title: 'exactly one of',
              },
            ],
            titles: [
              {
                title: 'Cat',
                link: '#/components/schemas/Cat',
              },
              {
                title: 'Dog',
                link: '#/components/schemas/Dog',
              },
            ],
          }),
        }),
      );
    });

    it('should return a red header called "NOT" in type when marked as not', () => {
      expect(
        parseParameterTableRow(
          {
            not: {
              type: 'integer',
            },
          },
          'pet',
        ),
      ).toEqual(
        expect.objectContaining({
          type: expect.objectContaining({
            headers: [
              {
                title: 'NOT',
                color: 'red',
              },
            ],
            titles: [
              {
                title: 'integer',
              },
            ],
          }),
        }),
      );
    });

    it('should return a header called "array of" in type when type is marked as arrayOf ', () => {
      expect(
        parseParameterTableRow(
          {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          'details',
        ),
      ).toEqual(
        expect.objectContaining({
          type: expect.objectContaining({
            headers: [
              {
                title: 'array of',
              },
            ],
            titles: [
              {
                title: 'string',
              },
            ],
          }),
        }),
      );
    });

    it('should add a description when one is defined', () => {
      expect(
        parseParameterTableRow(
          {
            type: 'string',
            description: 'the name of the pet',
          },
          'name',
        ),
      ).toEqual(
        expect.objectContaining({
          description: 'the name of the pet',
        }),
      );
    });

    it('should return a subtitle in type when a format is given', () => {
      expect(
        parseParameterTableRow(
          {
            type: 'integer',
            format: 'int64',
          },
          'id',
        ),
      ).toEqual(
        expect.objectContaining({
          type: expect.objectContaining({
            subtitles: [
              {
                title: 'int64',
              },
            ],
          }),
        }),
      );
    });

    // TODO LATER
    it.skip('should return a default object when a defalt is given', () => {});
    it.skip('should add the additional properties when aditionalProperties is an object', () => {});
    it.skip('should add the additional properties when aditionalProperties is a reference to a component', () => {});
  });
});
