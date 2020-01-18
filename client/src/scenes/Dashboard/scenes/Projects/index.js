import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeSharp'
import MUIDataTable from 'mui-datatables'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'

import { operations as projectsOperations } from '../../../../ducks/projects'
import { withFirebase } from '../../../../providers/Firebase'

const datatableTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          backgroundColor: 'rgba(0,0,0,0)',
          display: 'flex',
          flexDirection: 'column',

          paddingTop: '10px',
        },
        responsiveScrollMaxHeight: {
          order: 2,
        },
      },
      MUIDataTableHeadCell: {
        root: {
          backgroundColor: '#fafafa !important',
        },
      },
      MUIDataTableToolbar: {
        root: {
          order: 1,
        },
      },
      MuiTable: {
        root: {
          order: 1,
        },
      },
    },
  })

const useStyles = makeStyles(theme => ({
  buttonLoading: {
    position: 'absolute',
    zIndex: 1,
  },
  delete: {
    marginRight: theme.spacing(3),
  },
}))

const mapStateToProps = state => ({
  projects: state.projects,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(projectsOperations, dispatch)

const Dashboard = ({
  deleteProjectById,
  firebase,
  projects,
  requestProjectList,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [currentProjectIdAction, setCurrentProjectIdAction] = React.useState(
    null,
  )
  const [getProjectListLoading, setGetProjectListLoadingState] = React.useState(
    true,
  )
  const [deleteProjectLoading, setDeleteProjectLoadingState] = React.useState(
    false,
  )

  React.useEffect(() => {
    ;(async () => {
      await requestProjectList()
      setGetProjectListLoadingState(false)
    })()
  }, [])

  const deleteSelectedProject = async id => {
    setDeleteProjectLoadingState(true)
    await deleteProjectById(id)
    setDeleteProjectLoadingState(false)
  }

  return (
    <MuiThemeProvider theme={datatableTheme()}>
      <MUIDataTable
        className={classes.table}
        columns={[
          {
            label: t('dashboard.projects.name'),
            name: 'name',
            options: {
              searchable: true,
            },
          },
          {
            label: t('dashboard.projects.algorithm'),
            name: 'algorithm',
            options: {
              searchable: false,
            },
          },
          {
            label: t('dashboard.projects.created'),
            name: 'created',
            options: {
              searchable: false,
            },
          },
          {
            name: 'id',
            options: {
              display: 'false',
              searchable: false,
              sort: false,
            },
          },
          {
            name: '',
            options: {
              customBodyRender: value => {
                return (
                  <>
                    <Tooltip title={t('dashboard.projects.view')}>
                      <IconButton
                        component={Link}
                        disabled={deleteProjectLoading}
                        target="_blank"
                        to={`/app/${value}`}
                        onClick={() =>
                          firebase.analytics.logEvent('view_project_button')
                        }
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={t('dashboard.projects.delete')}>
                      <IconButton
                        disabled={deleteProjectLoading}
                        onClick={() => {
                          setCurrentProjectIdAction(value)
                          deleteSelectedProject(value)
                          firebase.analytics.logEvent('delete_project_button')
                        }}
                      >
                        <DeleteIcon />
                        {deleteProjectLoading &&
                        currentProjectIdAction === value ? (
                          <CircularProgress
                            className={classes.buttonLoading}
                            color="secondary"
                          />
                        ) : null}
                      </IconButton>
                    </Tooltip>
                  </>
                )
              },
              searchable: false,
              sort: false,
            },
          },
        ]}
        data={projects.projectList.map(project => ({
          '': project.id,
          algorithm: project.algorithm,
          created: new Date(Date.parse(project.createdAt)).toDateString(),
          id: project.id,
          name: project.name,
        }))}
        options={{
          download: false,
          elevation: 0,
          filter: false,
          print: false,
          responsive: 'scrollMaxHeight',
          rowHover: false,
          search: true,
          searchPlaceholder: t('dashboard.projects.search'),
          selectableRows: 'none',
          selectableRowsHeader: false,
          sort: true,
          textLabels: {
            body: {
              noMatch: getProjectListLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                t('dashboard.projects.empty')
              ),
            },
          },
          viewColumns: false,
        }}
        title={t('dashboard.projects.title')}
      />
    </MuiThemeProvider>
  )
}

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Dashboard)
