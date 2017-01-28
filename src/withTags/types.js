// @flow

export type Options = {
  tags: Array<Tag>
};

export type Tag = {
  pattern: RegExp,
  component: (Array<string> | string) => any
}

export type Slice = {
  value: string | Array<string>,
  range: Range,
  tag?: number
}

export type Match = {
  value: Array<string>,
  range: Range
}

export type Range = {
  start: number,
  end: number
};