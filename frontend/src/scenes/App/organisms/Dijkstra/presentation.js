import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DistanceEntry from './organisms/DistanceEntry'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  card: {
    width: '20%',
    position: 'absolute',
    right: 0,
    top: '128px',
    boxShadow: '0 0 2px 1px #ddd',
    height: 'calc(100% - 128px)',
    background: '#fff',
    fontSize: '12px',
    overflowY: 'auto',
    borderRadius: 0,
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
  isUnvisitedNode: {
    position: 'absolute',
    marginLeft: '-8px',
  },
})

const Presentation = ({
  distances,
  selected,
  highlighted,
  nodes,
  isFinal,
  unvisited,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Distances from start node
        </Typography>

        {Object.entries(distances).map(([name, distance]) => (
          <DistanceEntry
            name={name}
            distance={distance}
            isSelected={
              !isFinal &&
              selected.includes(
                Object.values(nodes)
                  .filter(node => node.name === name)
                  .pop().id,
              )
            }
            isHighlighted={
              !isFinal &&
              highlighted.includes(
                Object.values(nodes)
                  .filter(node => node.name === name)
                  .pop().id,
              )
            }
          />
        ))}

        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Unvisited nodes
        </Typography>

        <div className={classes.unvisitedContent}>
          {Object.entries(unvisited).map(([name, unvisited]) => (
            <Box width={1 / 4} pr="5px" className={classes.unvisitedNode}>
              <span>{name}</span>
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
export default Presentation
