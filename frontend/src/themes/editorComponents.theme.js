/**
 * Global styles for react-konva shapes used in organisms/Editor
 * component when editor mode is active (ie. not running any algorithm).
 */

import grey from '@material-ui/core/colors/grey'
import deepOrange from '@material-ui/core/colors/deepOrange'

export default {
  node: {
    neutral: {
      color: grey['900'],
    },
    hovered: {
      color: grey['900'],
    },
    selected: {
      color: grey['400'],
    },
  },
  edge: {
    neutral: {
      color: grey['900'],
    },
    hovered: {
      color: grey['900'],
    },
    selected: {
      color: grey['400'],
    },
  },
  grid: {
    color: grey['300'],
  },
  connectArrow: {
    color: grey['300'],
  },
  shadowNode: {
    stroke: {
      color: deepOrange['400'],
    },
    fill: {
      color: deepOrange['300'],
    },
  },
  stage: {
    fill: {
      color: grey['50'],
    },
  },
}
