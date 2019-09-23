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
  editorActionType: state.editor.present.editorActionType,
  futureExist: state.editor.future.length,
  graph: state.editor.present,
  isSignIn: state.user.isSignIn,
  pastExist: state.editor.past.length,
  profile: state.user.profile,
  selectedProjectId: state.user.selectedProjectId,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...editorOperations, ...algorithmOperations, ...profileOperations },
    dispatch,
  )

const FileDropdownMenu = ({
  TransitionProps,
  editorActionType,
  fileDropdownMenu,
  futureExist,
  graph,
  initEditorHistory,
  isSignIn,
  pastExist,
  selectProject,
  selectedProjectId,
}) => (
  <Fade {...TransitionProps} timeout={360}>
    <Paper square id="menu-list-grow">
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
