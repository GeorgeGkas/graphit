import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/AddSharp'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  containerFix: {
    marginLeft: -theme.spacing(1),
  },
  createButton: {
    borderRadius: 0,
    width: '90%',
  },
  createButtonIcon: {
    marginRight: theme.spacing(2),
  },
  createButtonWrapper: {
    padding: '20px 0',
  },
}))

const Sidebar = () => {
  const classes = useStyles()

  return (
    <Container className={classes.containerFix}>
      <Box className={classes.createButtonWrapper}>
        <Tooltip title="Create new project">
          <Button
            className={classes.createButton}
            color="secondary"
            component={Link}
            size="large"
            target="_blank"
            to="/app"
            variant="contained"
          >
            <AddIcon className={classes.createButtonIcon} />
            Create
          </Button>
        </Tooltip>
      </Box>
    </Container>
  )
}

export default Sidebar
