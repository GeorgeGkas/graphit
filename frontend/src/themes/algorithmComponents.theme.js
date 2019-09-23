/**
 * Global styles for react-konva shapes used in organisms/Editor
 * component when algorithm mode is active (ie. running an algorithm).
 */

import cyan from '@material-ui/core/colors/cyan'
import grey from '@material-ui/core/colors/grey'
import pink from '@material-ui/core/colors/pink'

export default {
  edge: {
    highlighted: {
      color: cyan['400'],
    },
    neutral: {
      color: grey['400'],
    },
    selected: {
      color: pink['400'],
    },
  },
  node: {
    highlighted: {
      color: cyan['400'],
    },
    neutral: {
      color: grey['400'],
    },
    selected: {
      color: pink['400'],
    },
  },
}
