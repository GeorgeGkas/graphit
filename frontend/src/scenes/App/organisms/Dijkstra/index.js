/**
 * Import globals.
 */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

/**
 * Import UI framework modules.
 */
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

/**
 * Import components.
 */
import DistanceEntry from './organisms/DistanceEntry'

/**
 * Construct component styles.
 */
const styles = () => ({
  card: {
    background: '#fff',
    borderRadius: 0,
    boxShadow: '0 0 2px 1px #ddd',
    fontSize: '12px',
    height: 'calc(100% - 128px)',
    overflowY: 'auto',
    position: 'absolute',
    right: 0,
    top: '128px',
    width: '20%',
  },
  isUnvisitedNode: {
    marginLeft: '-8px',
    position: 'absolute',
  },
  title: {
    fontSize: 14,
  },
  unvisitedContent: {
    display: 'flex',
    padding: '15px 0',
  },
  unvisitedNode: {
    fontSize: '16px',
    textAlign: 'center',
  },
})

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  distances: state.algorithm.steps[state.algorithm.currentIndex].distances,
  highlighted:
    state.algorithm.steps[state.algorithm.currentIndex].highlighted_nodes,
  isFinal: state.algorithm.isFinal,
  nodes: state.graph.present.nodes,
  selected: state.algorithm.steps[state.algorithm.currentIndex].selected_nodes,
  unvisited: state.algorithm.steps[state.algorithm.currentIndex].unvisited,
})

const mapDispatchToProps = null

/**
 * Component.
 */
class Dijkstra extends React.Component {
  render() {
    const {
      classes,
      distances,
      forwardedRef,
      highlighted,
      isFinal,
      nodes,
      selected,
      unvisited,
    } = this.props

    return (
      <Card ref={forwardedRef} className={classes.card}>
        <CardContent>
          <Typography
            gutterBottom
            className={classes.title}
            color="textSecondary"
          >
            Distances from start node
          </Typography>

          {Object.entries(distances).map(([id, distance]) => (
            <DistanceEntry
              distance={distance}
              isHighlighted={
                !isFinal &&
                highlighted.includes(
                  Object.values(nodes)
                    .filter(node => node.id === id)
                    .pop().id,
                )
              }
              isSelected={
                !isFinal &&
                selected.includes(
                  Object.values(nodes)
                    .filter(node => node.id === id)
                    .pop().id,
                )
              }
              name={
                Object.values(nodes)
                  .filter(node => node.id === id)
                  .pop().properties.name
              }
            />
          ))}

          <Typography
            gutterBottom
            className={classes.title}
            color="textSecondary"
          >
            Unvisited nodes
          </Typography>

          <div className={classes.unvisitedContent}>
            {Object.entries(unvisited).map(([id, unvisited]) => (
              <Box className={classes.unvisitedNode} pr="5px" width={1 / 4}>
                <span>{nodes[id].properties.name}</span>
                <span className={classes.isUnvisitedNode}>
                  {!unvisited ? '/' : ''}
                </span>
              </Box>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
}

const Connected = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Dijkstra)

export default React.forwardRef((props, ref) => (
  <Connected {...props} forwardedRef={ref} />
))
