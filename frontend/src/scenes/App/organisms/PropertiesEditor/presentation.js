import React from 'react'
import { Wrapper } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/EditSharp'
import NodeEditor from './organisms/NodeEditor'
import EdgeEditor from './organisms/EdgeEditor'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 0,
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
}))

const Presentation = ({ selectedNode, scale, selectedArrow, arrows }) => {
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
        className={classes.button}
        onClick={handleClickOpen}
      >
        <EditIcon className={classes.buttonIcon} />
        Edit
      </Button>

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
