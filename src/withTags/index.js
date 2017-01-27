// @flow

type Options = {
  tags: Array<Tag>
};

type Tag = {
  pattern: RegExp,
  component: (Array<string> | string) => any
}

type Slice = {
  value: string | Array<string>,
  range: Range,
  tag?: number
}

type Match = {
  value: Array<string>,
  range: Range
}

type Range = {
  start: number,
  end: number
};

function withTags(text: string, { tags }: Options): Array<any> {
  return _getSlices(text, tags).map(({ value, tag }, index) => {
    if(tag !== undefined){
      return tags[tag].component(value, index);
    }
    return value;
  });
}

function _getSlices(text: string, tags: Array<Tag>): Array<Slice> {

  const matchesSlices = _getMatchesSlices(text, tags).sort(_sortByRange);

  const result: Array<Slice> = [];

  const initialSlice = {
    value: '',
    range: {
      start: -1,
      end: -1
    }
  };

  const lastIndex = matchesSlices.length - 1;

  matchesSlices.reduce((prevSlice, slice, index) => {

    const previousSlice = prevSlice;

    if(prevSlice && !_isSlicesOverlap(prevSlice, slice)){
      const range = {
        start: prevSlice.range.end + 1,
        end: slice.range.start - 1
      };
      const value = text.substring(range.start, range.end + 1);

      result.push({ value, range });
    }

    result.push(slice);

    if(index === lastIndex && slice.range.end !== text.length - 1){
      const range = {
        start: slice.range.end + 1,
        end: text.length
      };
      const value = text.substring(range.start, range.end);

      result.push({ value, range });
    }

    return slice;

  }, initialSlice);

  return result;
}

function _isSlicesOverlap(previousSlice: Slice, currentSlice: Slice): boolean{
  return previousSlice.range.end === currentSlice.range.start - 1;
}

function _sortByRange(sliceFirst: Slice, sliceSecond: Slice){
  return sliceFirst.range.start - sliceSecond.range.start;
}

function _getMatchesSlices(text: string, tags: Array<Tag>): Array<Slice> {
  return tags.reduce((result: Array<Slice>, { pattern }, index) => {
    const matches = _getMatches(pattern, text);
    const slices = matches.map((match) => ({ ...match, tag: index }));
    return [...result, ...slices];
  }, []);
}

function _getMatches(pattern: RegExp, text: string): Array<Match>{
  let match;
  const matches = [];
  while(match = pattern.exec(text)){
    matches.push({
      value: match,
      range: {
        start: match.index,
        end: match.index + (match[0].length - 1)
      }
    });
  }
  return matches;
}

export default withTags;