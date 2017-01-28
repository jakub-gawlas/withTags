import getMatches from './getMatches';

describe('getMatches', () => {

  it('should return no matches', () => {

    const pattern = /#test/g;

    // array ['#test'] not passing test, beacuse is cast to string '#test'
    const texts = [null, 123, NaN, { '#test': '#test' }, '', 'test', '✌️', 'test#tes✌️t'];

    const expected = [];

    texts.forEach((text) => {

      const actual = getMatches(pattern, text);

      expect(actual).toMatchObject(expected);

    });

  });

  it('should return one match without groups', () => {

    const pattern = /#test/g;
    let text = '#test';

    let expected = [
      {
        value: ['#test'],
        range: {
          start: 0,
          end: 4
        }
      }
    ];

    let actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


    text = 'test #test';

    expected = [
      {
        value: ['#test'],
        range: {
          start: 5,
          end: 9
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


    text = 'test#test';

    expected = [
      {
        value: ['#test'],
        range: {
          start: 4,
          end: 8
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


    text = '✌️️#test';

    expected = [
      {
        value: ['#test'],
        range: {
          start: 3,
          end: 7
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


  });

  it('should return one match with one group', () => {

    const pattern = /#(\w+)/g;
    let text = '#test';

    let expected = [
      {
        value: ['#test', 'test'],
        range: {
          start: 0,
          end: 4
        }
      }
    ];

    let actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


    text = 'test #test';

    expected = [
      {
        value: ['#test', 'test'],
        range: {
          start: 5,
          end: 9
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


    text = 'test#test';

    expected = [
      {
        value: ['#test', 'test'],
        range: {
          start: 4,
          end: 8
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toHaveLength(1);
    expect(actual[0]).toMatchObject(expected[0]);


    text = '✌️️#test';

    expected = [
      {
        value: ['#test', 'test'],
        range: {
          start: 3,
          end: 7
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);

  });

  it('should return two matches without groups', () => {

    const pattern = /#test/g;
    let text = '#test#test';

    let expected = [
      {
        value: ['#test'],
        range: {
          start: 0,
          end: 4
        }
      },
      {
        value: ['#test'],
        range: {
          start: 5,
          end: 9
        }
      }
    ];

    let actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);



    text = '#test✌️️#test';

    expected = [
      {
        value: ['#test'],
        range: {
          start: 0,
          end: 4
        }
      },
      {
        value: ['#test'],
        range: {
          start: 8,
          end: 12
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);

  });

  it('should return one match with two groups', () => {

    const pattern = /#(\w+)test(\w+)/g;
    let text = '#footestbar';

    let expected = [
      {
        value: ['#footestbar', 'foo', 'bar'],
        range: {
          start: 0,
          end: 10
        }
      }
    ];

    let actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);


    text = '✌️️#footestbar✌️️';

    expected = [
      {
        value: ['#footestbar', 'foo', 'bar'],
        range: {
          start: 3,
          end: 13
        }
      }
    ];

    actual = getMatches(pattern, text);

    expect(actual).toMatchObject(expected);

  });

});