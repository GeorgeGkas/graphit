import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { operations as editorOperations } from '../../../Editor/duck'
import { operations as algorithmOperations } from '../../../EditorBar/duck'
import { operations as profileOperations } from '../../duck'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import localDownload from './services/localDownload'
import cloudUpdate from './services/cloudUpdate'
import cloudSave from './services/cloudSave'
import Fade from '@material-ui/core/Fade'

const mapStateToProps = state => ({
  pastExist: state.editor.past.length,
  futureExist: state.editor.future.length,
  editorActionType: state.editor.present.editorActionType,
  isSignIn: state.user.isSignIn,
  selectedProjectId: state.user.selectedProjectId,
  profile: state.user.profile,
  graph: state.editor.present,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...editorOperations, ...algorithmOperations, ...profileOperations },
    dispatch,
  )

const FileDropdownMenu = ({
  editorActionType,
  pastExist,
  futureExist,
  initEditorHistory,
  selectProject,
  isSignIn,
  selectedProjectId,
  fileDropdownMenu,
  graph,
  TransitionProps,
}) => (
  <Fade {...TransitionProps} timeout={360}>
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
            onClick={() => document.getElementById('load_state').click()}
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
                selectedProjectId
                  ? cloudUpdate(selectedProjectId, graph)
                  : cloudSave(graph, selectProject)
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
            onClick={() => localDownload(graph)}
          >
            <ListItem component="div">
              <ListItemText primary="Download" />
            </ListItem>
          </MenuItem>
        </MenuList>
      </ClickAwayListener>
    </Paper>
  </Fade>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileDropdownMenu)
