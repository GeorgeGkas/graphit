import React from 'react'
import Notification from '../../organisms/Notification'
import filter from 'lodash/fp/filter'
import { toast } from 'react-toastify'

import * as types from './types'
import { operations as graphOperations } from '../../scenes/App/ducks/graph'

const setProjectList = projectList => ({
  payload: projectList,
  type: types.SET_PROJECT_LIST,
})

const selectProjectById = project => ({
  payload: project,
  type: types.SELECT_PROJECT_BY_ID,
})

const requestProjectList = () => ({
  payload: {
    options: {
      onError({ error }) {
        console.error(error)
        toast.dismiss()
        toast(<Notification message="Could not fetch project list" />)
      },
      onSuccess({ dispatch, response }) {
        dispatch(setProjectList(response.data.data))
      },
    },
    request: {
      method: 'get',
      url: `/projects`,
    },
  },
  type: types.REQUEST_PROJECT_LIST,
})

const updateProjectById = (id, data) => ({
  payload: {
    options: {
      onError({ error }) {
        console.error(error)
        toast.dismiss()
        toast.update(<Notification message="Could not update project" />)
      },
      onSuccess() {
        toast.dismiss()
        toast(<Notification message="Project updated successfully" />)
      },
    },
    request: {
      data,
      method: 'patch',
      url: `/projects/${id}`,
    },
  },
  type: types.UPDATE_PROJECT_BY_ID,
})

const deleteProjectById = id => ({
  payload: {
    options: {
      onError({ error }) {
        console.error(error)
        toast.dismiss()
        toast(<Notification message="Could not delete project" />)
      },
      onSuccess({ dispatch, getState }) {
        dispatch(
          setProjectList(
            filter(project => project.id !== id)(
              getState().projects.projectList,
            ),
          ),
        )

        if (getState().projects.selectedProjectId === id) {
          dispatch(graphOperations.initGraphHistory())
          dispatch(selectProjectById(null))
        }

        toast.dismiss()
        toast(<Notification message="Project deleted successfully" />)
      },
    },
    request: {
      method: 'delete',
      url: `/projects/${id}`,
    },
  },
  type: types.DELETE_PROJECT_BY_ID,
})

const getProjectById = id => ({
  payload: {
    options: {
      onError({ error }) {
        console.error(error)
        toast.dismiss()
        toast(<Notification message="Could not fetch project" />)
      },
      onSuccess({ dispatch, response }) {
        dispatch(
          graphOperations.loadGraph(JSON.parse(response.data.data.graph)),
        )
        dispatch(selectProjectById(id))
        toast.dismiss()
        toast(<Notification message="Project fetched successfully" />)
      },
    },
    request: {
      method: 'get',
      url: `/projects/${id}`,
    },
  },
  type: types.GET_PROJECT_BY_ID,
})

const createProject = data => ({
  payload: {
    options: {
      onError({ error }) {
        console.error(error)
        toast.dismiss()
        toast(<Notification message="Could not create project" />)
      },
      onSuccess({ dispatch, getState, response }) {
        const graph = JSON.parse(data.graph)

        dispatch(
          graphOperations.updateMetadata({
            algorithm: graph.metadata.algorithm,
            createdAt: graph.metadata.createdAt,
            name: graph.metadata.name,
          }),
        )

        dispatch(
          setProjectList([
            {
              algorithm: graph.metadata.algorithm,
              createdAt: graph.metadata.createdAt,
              id: response.data.data,
              name: graph.metadata.name,
            },
            ...getState().projects.projectList,
          ]),
        )
        dispatch(selectProjectById(response.data.data))
        toast.dismiss()
        toast(<Notification message="Project created successfully" />)
      },
    },
    request: {
      data,
      method: 'post',
      url: `/projects`,
    },
  },
  type: types.CREATE_PROJECT,
})

export {
  createProject,
  deleteProjectById,
  getProjectById,
  requestProjectList,
  selectProjectById,
  setProjectList,
  updateProjectById,
}
