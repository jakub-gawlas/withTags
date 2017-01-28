// @flow
import type { Options, Tag, Slice } from './types';

import getMatches from './getMatches';

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
    const matches = getMatches(pattern, text);
    const slices = matches.map((match) => ({ ...match, tag: index }));
    return [...result, ...slices];
  }, []);
}

export default withTags;