/**
 * Import globals.
 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Import UI framework modules.
 */
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import IconButton from '@material-ui/core/IconButton'
import MUIDataTable from 'mui-datatables'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeSharp'
import Tooltip from '@material-ui/core/Tooltip'
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations as projectsOperations } from '../../../../ducks/projects'

/**
 * Construct component styles.
 */
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

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  projects: state.projects,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(projectsOperations, dispatch)

/**
 * Component.
 */
const Dashboard = ({ deleteProjectById, projects, requestProjectList }) => {
  const classes = useStyles()
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
            label: 'Name',
            name: 'name',
            options: {
              searchable: true,
            },
          },
          {
            label: 'Algorithm',
            name: 'algorithm',
            options: {
              searchable: false,
            },
          },
          {
            label: 'Created',
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
                    <Tooltip title="View">
                      <IconButton
                        disabled={deleteProjectLoading}
                        onClick={() => {
                          const url =
                            window.location.protocol +
                            '//' +
                            window.location.host +
                            '/app/' +
                            value
                          window.open(url, '_blank').focus()
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        disabled={deleteProjectLoading}
                        onClick={() => {
                          setCurrentProjectIdAction(value)
                          deleteSelectedProject(value)
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
          searchPlaceholder: 'Search by project name',
          selectableRows: 'none',
          selectableRowsHeader: false,
          sort: true,
          textLabels: {
            body: {
              noMatch: getProjectListLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                'No projects exist'
              ),
            },
          },
          viewColumns: false,
        }}
        title="My Projects"
      />
    </MuiThemeProvider>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
