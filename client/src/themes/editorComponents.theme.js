/**
 * Global styles for react-konva shapes used in organisms/Editor
 * component when editor mode is active (ie. not running any algorithm).
 */

import deepOrange from '@material-ui/core/colors/deepOrange'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

export default {
  connectArrow: {
    color: grey['300'],
  },
  edge: {
    hovered: {
      color: grey['900'],
    },
    neutral: {
      color: grey['900'],
    },
    selected: {
      color: grey['400'],
    },
  },
  finalNode: {
    color: green['A700'],
  },
  grid: {
    color: grey['300'],
  },
  initialNode: {
    color: green['A700'],
  },
  node: {
    hovered: {
      color: grey['900'],
    },
    neutral: {
      color: grey['900'],
    },
    selected: {
      color: grey['400'],
    },
  },
  shadowNode: {
    fill: {
      color: deepOrange['300'],
    },
    stroke: {
      color: deepOrange['400'],
    },
  },
  stage: {
    fill: {
      color: grey['50'],
    },
  },
}
