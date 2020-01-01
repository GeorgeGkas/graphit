import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { bindActionCreators, compose } from 'redux'

import { operations as projectsOperations } from '../../../../../../ducks/projects'
import ConfirmDialog from '../../../../../../organisms/ConfirmDialog'
import Notification from '../../../../../../organisms/Notification'
import { withAuthentication } from '../../../../../../providers/Auth'
import { operations as algorithmOperations } from '../../../../ducks/algorithm'
import { operations as editorOperations } from '../../../../ducks/editor'
import { operations as graphOperations } from '../../../../ducks/graph'
import localDownload from './services/localDownload'

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

const FileDropdownMenu = ({
  TransitionProps,
  auth,
  createProject,
  currentEditorAction,
  fileDropdownMenu,
  futureExist,
  graph,
  handleCreateModalOpen,
  pastExist,
  updateProjectById,
}) => {
  const { t } = useTranslation()

  const [
    newProjectOverwriteDialogVisible,
    makeNewProjectOverwriteDialogVisible,
  ] = React.useState(false)
  const toggleNewProjectOverwriteDialog = () =>
    makeNewProjectOverwriteDialogVisible(!newProjectOverwriteDialogVisible)

  return (
    <>
      <Fade {...TransitionProps} timeout={360}>
        <Paper square id="menu-list-grow">
          <ClickAwayListener onClickAway={fileDropdownMenu.close}>
            <MenuList>
              <MenuItem
                button
                disabled={currentEditorAction === 'isPlaying'}
                onClick={() => {
                  if (futureExist || pastExist) {
                    toggleNewProjectOverwriteDialog()
                  } else {
                    handleCreateModalOpen()
                    fileDropdownMenu.close()
                  }
                }}
              >
                <ListItem component="div">
                  <ListItemText primary={t('app.appbar.file_dropdown.new')} />
                </ListItem>
              </MenuItem>

              {auth.authUser ? (
                <MenuItem
                  button
                  disabled={currentEditorAction === 'isPlaying'}
                  onClick={async () => {
                    const data = {
                      author: auth.authUser.uid,
                      graph: JSON.stringify(graph),
                    }

                    fileDropdownMenu.close()
                    if (graph.metadata.id) {
                      await updateProjectById(graph.metadata.id, data)
                    } else {
                      toast.dismiss()
                      toast(
                        <Notification
                          message={t('app.appbar.saving_project')}
                        />,
                      )

                      await createProject(data)

                      toast.dismiss()
                      toast(
                        <Notification
                          message={t('app.appbar.project_saved')}
                        />,
                      )
                    }
                  }}
                >
                  <ListItem component="div">
                    <ListItemText
                      primary={
                        graph.metadata.id
                          ? t('app.appbar.file_dropdown.update')
                          : t('app.appbar.file_dropdown.save')
                      }
                    />
                  </ListItem>
                </MenuItem>
              ) : null}

              <MenuItem
                button
                disabled={currentEditorAction === 'isPlaying'}
                onClick={() => localDownload(graph)}
              >
                <ListItem component="div">
                  <ListItemText
                    primary={t('app.appbar.file_dropdown.download')}
                  />
                </ListItem>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Fade>

      <ConfirmDialog
        confirmAction={() => {
          handleCreateModalOpen()
          fileDropdownMenu.close()
        }}
        confirmDialogVisible={newProjectOverwriteDialogVisible}
        confirmMessage={t('app.appbar.discard_changes_body')}
        confirmTitle={t('app.appbar.discard_changes_title')}
        handleClose={toggleNewProjectOverwriteDialog}
      />
    </>
  )
}

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FileDropdownMenu)
