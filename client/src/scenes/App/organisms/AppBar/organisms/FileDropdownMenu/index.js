/**
 * Import globals.
 */
import React, { useState } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'

/**
 * Import ducks.
 */
import { operations as algorithmOperations } from '../../../../ducks/algorithm'
import { operations as editorOperations } from '../../../../ducks/editor'
import { operations as graphOperations } from '../../../../ducks/graph'
import { operations as projectsOperations } from '../../../../../../ducks/projects'

/**
 * Import components.
 */
import ConfirmDialog from '../../../../../../organisms/ConfirmDialog'
import PromptSaveDialog from './organisms/PromptSaveDialog'

/**
 * Import services
 */
import localDownload from './services/localDownload'
import { withAuthentication } from '../../../../../../providers/Auth'

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  currentEditorAction: state.editor.currentEditorAction,
  futureExist: state.graph.future.length,
  graph: state.graph.present,
  pastExist: state.graph.past.length,
  projects: state.projects,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...editorOperations,
      ...algorithmOperations,
      ...graphOperations,
      ...projectsOperations,
    },
    dispatch,
  )

/**
 * Component
 */
const FileDropdownMenu = ({
  TransitionProps,
  auth,
  createProject,
  currentEditorAction,
  fileDropdownMenu,
  futureExist,
  graph,
  initGraphHistory,
  pastExist,
  projects,
  selectProjectById,
  updateProjectById,
}) => {
  const [overwriteDialogVisible, makeOverwriteDialogVisible] = useState(false)
  const toggleOverwriteDialog = () =>
    makeOverwriteDialogVisible(!overwriteDialogVisible)

  const [promptSaveDialogVisible, makePromptSaveDialogVisible] = useState(false)
  const togglePromptSaveDialog = () =>
    makePromptSaveDialogVisible(!promptSaveDialogVisible)

  return (
    <React.Fragment>
      <Fade {...TransitionProps} timeout={360}>
        <Paper square id="menu-list-grow">
          <ClickAwayListener onClickAway={fileDropdownMenu.close}>
            <MenuList>
              <MenuItem
                button
                disabled={currentEditorAction === 'isPlaying'}
                onClick={() => {
                  if (futureExist || pastExist) {
                    toggleOverwriteDialog()
                  } else {
                    initGraphHistory()
                    selectProjectById(null)
                    fileDropdownMenu.close()
                  }
                }}
              >
                <ListItem component="div">
                  <ListItemText primary="New" />
                </ListItem>
              </MenuItem>

              <MenuItem
                button
                disabled={currentEditorAction === 'isPlaying'}
                onClick={() => document.getElementById('load_state').click()}
              >
                <ListItem component="div">
                  <ListItemText primary="Open" />
                </ListItem>
              </MenuItem>

              {auth.authUser ? (
                <MenuItem
                  button
                  disabled={currentEditorAction === 'isPlaying'}
                  onClick={async () => {
                    if (projects.selectedProjectId) {
                      const data = {
                        graph: JSON.stringify(graph),
                      }

                      fileDropdownMenu.close()
                      await updateProjectById(projects.selectedProjectId, data)
                    } else {
                      togglePromptSaveDialog()
                    }
                  }}
                >
                  <ListItem component="div">
                    <ListItemText primary="Save" />
                  </ListItem>
                </MenuItem>
              ) : null}

              <MenuItem
                button
                disabled={currentEditorAction === 'isPlaying'}
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

      <ConfirmDialog
        confirmAction={() => {
          initGraphHistory()
          selectProjectById(null)
          toggleOverwriteDialog()
          fileDropdownMenu.close()
        }}
        confirmDialogVisible={overwriteDialogVisible}
        confirmMessage={
          'All unsaved changes will be deleted if you confirm this action.'
        }
        confirmTitle="Create new project?"
        handleClose={toggleOverwriteDialog}
      />

      <PromptSaveDialog
        handleClose={togglePromptSaveDialog}
        promptSaveDialogAction={async projectName => {
          const data = {
            author: auth.authUser.uid,
            graph: JSON.stringify({
              ...graph,
              metadata: {
                algorithm: 'Dijkstra',
                createdAt: new Date().toISOString(),
                name: projectName,
              },
            }),
          }
          await createProject(data)
        }}
        promptSaveDialogVisible={promptSaveDialogVisible}
      />
    </React.Fragment>
  )
}

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FileDropdownMenu)
