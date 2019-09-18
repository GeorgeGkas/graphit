/**
 * Global styles for react-konva shapes used in organisms/Editor
 * component when algorithm mode is active (ie. running an algorithm).
 */

import grey from '@material-ui/core/colors/grey'
import pink from '@material-ui/core/colors/pink'
import cyan from '@material-ui/core/colors/cyan'

export default {
  node: {
    neutral: {
      color: grey['400'],
    },
    highlighted: {
      color: cyan['400'],
    },
    selected: {
      color: pink['400'],
    },
  },
  edge: {
    neutral: {
      color: grey['400'],
    },
    highlighted: {
      color: cyan['400'],
    },
    selected: {
      color: pink['400'],
    },
  },
}
