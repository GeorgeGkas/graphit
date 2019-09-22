import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Presentation = ({
  editorActionType,
  pastExist,
  futureExist,
  initEditorHistory,
  selectProject,
  open,
  isSignIn,
  selectedProjectId,
  updateInCloud,
  saveInCloud,
  saveHistory,
  fileDropdownMenu,
}) => (
  <Paper id="menu-list-grow" square>
    <ClickAwayListener onClickAway={fileDropdownMenu.close}>
      <MenuList>
        <MenuItem
          button
          disabled={editorActionType === 'isPlaying'}
          onClick={() => {
            if (
              (!pastExist && !futureExist) ||
              // eslint-disable-next-line no-restricted-globals
              confirm(
                'Are you sure you want to quit as there are unsaved documents?',
              )
            ) {
              initEditorHistory()
              selectProject('')
            }
          }}
        >
          <ListItem component="div">
            <ListItemText primary="New" />
          </ListItem>
        </MenuItem>

        <MenuItem
          button
          disabled={editorActionType === 'isPlaying'}
          onClick={open}
        >
          <ListItem component="div">
            <ListItemText primary="Open" />
          </ListItem>
        </MenuItem>

        {isSignIn ? (
          <MenuItem
            button
            disabled={editorActionType === 'isPlaying'}
            onClick={() =>
              selectedProjectId ? updateInCloud() : saveInCloud()
            }
          >
            <ListItem component="div">
              <ListItemText primary="Save" />
            </ListItem>
          </MenuItem>
        ) : null}

        <MenuItem
          button
          disabled={editorActionType === 'isPlaying'}
          onClick={saveHistory}
        >
          <ListItem component="div">
            <ListItemText primary="Download" />
          </ListItem>
        </MenuItem>
      </MenuList>
    </ClickAwayListener>
  </Paper>
)

export default Presentation
