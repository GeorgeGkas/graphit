import React from 'react'
import { Wrapper } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/EditSharp'
import NodeEditor from './organisms/NodeEditor'
import EdgeEditor from './organisms/EdgeEditor'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  editButton: {
    margin: theme.spacing(1),
    borderRadius: 0,
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  deleteButton: {
    borderRadius: 0,
  },
}))

const Presentation = ({
  selectedNode,
  scale,
  selectedArrow,
  arrows,
  deleteShapes,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <Wrapper
      selectedNode={selectedNode}
      selectedArrow={selectedArrow}
      scale={scale}
      arrows={Object.values(arrows)}
    >
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.editButton}
        onClick={handleClickOpen}
      >
        <EditIcon className={classes.buttonIcon} />
        Edit
      </Button>
      <IconButton
        variant="contained"
        color="secondary"
        size="small"
        className={classes.deleteButton}
        onClick={deleteShapes}
      >
        <DeleteIcon />
      </IconButton>

      {selectedNode ? (
        <NodeEditor open={open} handleClose={handleClose} />
      ) : (
        <EdgeEditor
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      )}
    </Wrapper>
  )
}

export default Presentation
