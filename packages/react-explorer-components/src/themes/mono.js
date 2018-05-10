import {css} from 'emotion';
import Color from 'color';

export const config = {
  hue: 230,
  saturation: '1%',
  brightness: '98%',
};

const saturation = 0.1;

const mono1 = `hsl(${config.hue}, 8%, 24%)`;
const mono2 = `hsl(${config.hue}, 6%, 44%)`;
const mono3 = `hsl(${config.hue}, 4%, 64%)`;

const cyan = `hsl(198, ${99 * saturation}%, 37%)`;
const blue = `hsl(221, ${87 * saturation}%, 60%)`;
const purple = `hsl(301, ${63 * saturation}%, 40%)`;
const green = `hsl(119, ${34 * saturation}%, 47%)`;

const red = `hsl(  5, ${74 * saturation}%, 59%)`;
const red2 = `hsl(344, ${84 * saturation}%, 43%)`;

const orange = `hsl(41, ${99 * saturation}%, 30%);`;
const orange2 = `hsl(41, ${99 * saturation}%, 38%);`;

export const Colors = {
  mono1, mono2, mono3, cyan, blue, purple, green,
  red, red2, orange, orange2,
};

const syntaxFg = mono1;
const syntaxBg = `hsl(${config.hue}, ${config.saturation}, ${config.brightness})`;
const syntaxGutter = Color(syntaxBg).darken(0.36).string();
const syntaxGuide = Color(syntaxFg).fade(0.2).string();
const syntaxAccent = `hsl(${config.hue}, 100%, 66%)`;

export const Base = {
  syntaxFg,
  syntaxBg,
  syntaxGutter,
  syntaxGuide,
  syntaxAccent,
};

export default {
  Base: css({
    label: 'Theme--Base',
    fontFamily: 'monospace',
    color: syntaxFg,
  }),
  Syntax: {
    Comment: css({
      label: 'Theme--Comment',
      color: mono3,
      fontStyle: 'italic',
    }),
    FunctionName: css({
      label: 'Theme--FunctionName',
      color: blue,
    }),
    Regexp: css({
      label: 'Theme--Regexp',
      color: green,
    }),
    Number: css({
      label: 'Theme--Number',
      color: blue,
    }),
    Key: css({
      label: 'Theme--Key',
      color: purple,
    }),
    AttributeName: css({
      label: 'Theme--AttributeName',
      color: orange,
      fontStyle: 'italic',
    }),
    String: css({
      label: 'Theme--String',
      color: green,
    }),
    Tag: css({
      label: 'Theme--Tag',
      color: purple,
    }),
    Operator: css({
      label: 'Theme--Operator',
      color: cyan,
    }),
    Variable: css({
      label: 'Theme--Variable',
      color: red,
    }),
  },
  Diff: {
    Changed: css({
      label: 'Theme--Changed',
      color: orange,
      fontWeight: 'bold',
    }),
    Deleted: css({
      label: 'Theme--Deleted',
      color: red,
      fontStyle: 'italic',
    }),
    Inserted: css({
      label: 'Theme--Inserted',
      color: green,
      fontWeight: 'bold',
    }),
  },
  Layout: {
    PreviewRow: css({
      label: 'Layout--PreviewRow',
      flex: '0 0',
      display: 'flex column',
      paddingLeft: '1.5ch',
    }),
    PreviewSummary: css({
      label: 'Layout--PreviewSummary',
      marginLeft: '-1.5ch',
    }),
  },
};
