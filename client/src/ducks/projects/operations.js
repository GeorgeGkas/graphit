import React from 'react'
import { toast } from 'react-toastify'
import Notification from '../../organisms/Notification'
import * as actions from './actions'

const {
  createProject: createProjectAction,
  deleteProjectById: deleteProjectByIdAction,
  getProjectById: getProjectByIdAction,
  requestProjectList: requestProjectListAction,
  selectProjectById: selectProjectByIdAction,
  setProjectList: setProjectListAction,
  updateProjectById: updateProjectByIdAction,
} = actions

const createProject = data => async dispatch => {
  toast(<Notification message="Creating new project..." />)
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

const selectProjectById = id => dispatch => {
  dispatch(selectProjectByIdAction(id))
}

const setProjectList = projectList => dispatch => {
  dispatch(setProjectListAction(projectList))
}

const updateProjectById = (id, data) => async dispatch => {
  toast(<Notification message="Updating project..." />)
  await dispatch(updateProjectByIdAction(id, data))
}

export {
  createProject,
  deleteProjectById,
  getProjectById,
  requestProjectList,
  selectProjectById,
  setProjectList,
  updateProjectById,
}
