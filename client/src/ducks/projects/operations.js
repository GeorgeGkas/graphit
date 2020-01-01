import i18next from 'i18next'
import React from 'react'
import { toast } from 'react-toastify'

import Notification from '../../organisms/Notification'
import * as actions from './actions'

const {
  createProject: createProjectAction,
  deleteProjectById: deleteProjectByIdAction,
  getProjectById: getProjectByIdAction,
  requestProjectList: requestProjectListAction,
  setProjectList: setProjectListAction,
  updateProjectById: updateProjectByIdAction,
} = actions

const createProject = data => async dispatch => {
  await dispatch(createProjectAction(data))
}

const deleteProjectById = id => async dispatch => {
  await dispatch(deleteProjectByIdAction(id))
}

const getProjectById = id => async dispatch => {
  await dispatch(getProjectByIdAction(id))
}

const requestProjectList = () => async dispatch => {
  await dispatch(requestProjectListAction())
}

const setProjectList = projectList => dispatch => {
  dispatch(setProjectListAction(projectList))
}

const updateProjectById = (id, data) => async dispatch => {
  toast.dismiss()
  toast(
    <Notification
      message={i18next.t('ducks.projects.operations.updating_project')}
    />,
  )
  await dispatch(updateProjectByIdAction(id, data))
}

export {
  createProject,
  deleteProjectById,
  getProjectById,
  requestProjectList,
  setProjectList,
  updateProjectById,
}
