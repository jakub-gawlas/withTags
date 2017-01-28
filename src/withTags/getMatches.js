// @flow
import type { Match } from './types';

function getMatches(pattern: RegExp, text: string): Array<Match>{
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

export default getMatches;