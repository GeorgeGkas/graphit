/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import AddIcon from '@material-ui/icons/AddSharp'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

/**
 * Import components.
 */
import CreateModal from './organisms/CreateModal'

/**
 * Construct component styles.
 */
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

/**
 * Component.
 */
const Sidebar = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container className={classes.containerFix}>
      <Box className={classes.createButtonWrapper}>
        <Tooltip title="Create new project">
          <Button
            className={classes.createButton}
            color="secondary"
            size="large"
            variant="contained"
            onClick={handleOpen}
          >
            <AddIcon className={classes.createButtonIcon} />
            Create
          </Button>
        </Tooltip>
      </Box>

      <CreateModal handleClose={handleClose} open={open} />
    </Container>
  )
}

export default Sidebar
