import i18next from 'i18next'
import filter from 'lodash/fp/filter'
import React from 'react'
import { toast } from 'react-toastify'

import Notification from '../../organisms/Notification'
import { operations as graphOperations } from '../../scenes/App/ducks/graph'
import * as types from './types'

const setProjectList = projectList => ({
  payload: projectList,
  type: types.SET_PROJECT_LIST,
})

const requestProjectList = () => ({
  payload: {
    options: {
      onError({ error }) {
        console.error(error)
        toast.dismiss()
        toast(
          <Notification
            message={i18next.t(
              'ducks.projects.actions.fail_to_fetch_project_list',
            )}
          />,
        )
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
        toast.update(
          <Notification
            message={i18next.t('ducks.projects.actions.fail_to_update_project')}
          />,
        )
      },
      onSuccess() {
        toast.dismiss()
        toast(
          <Notification
            message={i18next.t('ducks.projects.actions.project_updated')}
          />,
        )
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
        toast(
          <Notification
            message={i18next.t('ducks.projects.actions.fail_to_delete_project')}
          />,
        )
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
        }

        toast.dismiss()
        toast(
          <Notification
            message={i18next.t('ducks.projects.actions.project_deleted')}
          />,
        )
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
      },
      onSuccess({ dispatch, response }) {
        dispatch(
          graphOperations.loadGraph(JSON.parse(response.data.data.graph)),
        )
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
        toast(
          <Notification
            message={i18next.t('ducks.projects.actions.fail_to_create_project')}
          />,
        )
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

        dispatch(
          graphOperations.updateMetadata({
            id: response.data.data,
          }),
        )

        /**
         * Use browsers' built-in History API to update
         * the URL with the Id of the saved project.
         */
        // eslint-disable-next-line no-restricted-globals
        history.replaceState({}, '', `app/${response.data.data}`)
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
  setProjectList,
  updateProjectById,
}
