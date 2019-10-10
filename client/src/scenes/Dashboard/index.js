/**
 * Import globals.
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'

/**
 * Import UI framework modules.
 */
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import IconButton from '@material-ui/core/IconButton'
import MUIDataTable from 'mui-datatables'
import Paper from '@material-ui/core/Paper'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeSharp'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations as projectsOperations } from '../../ducks/projects'

/**
 * Import components.
 */
import close from './images/close.svg'
import CloseButton from './atoms/CloseButton'

/**
 * Import services.
 */
import { withAuthentication } from '../../providers/Auth'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  buttonLoading: {
    position: 'absolute',
    zIndex: 1,
  },
  delete: {
    marginRight: theme.spacing(3),
  },
  paper: {
    borderRadius: 0,
    height: '100vh',
    left: '50%',
    marginLeft: '-32.5%',
    position: 'absolute',
    width: '65%',
  },
  table: {
    height: '70vh',
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
const Dashboard = ({
  auth,
  deleteProjectById,
  getProjectById,
  projects,
  requestProjectList,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const [currentProjectIdAction, setCurrentProjectIdAction] = useState(
    projects.selectedProjectId,
  )
  const [getProjectListLoading, setGetProjectListLoadingState] = useState(true)
  const [selectProjectLoading, setSelectProjectLoadingState] = useState(false)
  const [deleteProjectLoading, setDeleteProjectLoadingState] = useState(false)

  useEffect(() => {
    ;(async () => {
      await requestProjectList()
      setGetProjectListLoadingState(false)
    })()
  }, [])

  const loadSelectedProject = async id => {
    setSelectProjectLoadingState(true)
    await getProjectById(id)
    setSelectProjectLoadingState(false)
    history.push('/app')
  }

  const deleteSelectedProject = async id => {
    setDeleteProjectLoadingState(true)
    await deleteProjectById(id)
    setDeleteProjectLoadingState(false)
  }

  return (
    <Paper className={classes.paper}>
      <Box display="flex" style={{ borderBottom: '1px solid #ddd' }}>
        <Box p="15px" style={{ textAlign: 'center' }} width={1 / 10}>
          <img
            alt=""
            height={42}
            src={auth.authUser.imageUrl}
            style={{ borderRadius: '50%' }}
            width={42}
          />
        </Box>
        <Box p="15px" style={{ lineHeight: '42px' }} width={8 / 10}>
          {auth.authUser.name}
        </Box>
        <Box width={1 / 10}>
          <CloseButton component={Link} to="/app">
            <img alt="" src={close} />
          </CloseButton>
        </Box>
      </Box>

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
                  <React.Fragment>
                    <Tooltip title="View">
                      <IconButton
                        disabled={selectProjectLoading || deleteProjectLoading}
                        onClick={() => {
                          setCurrentProjectIdAction(value)
                          loadSelectedProject(value)
                        }}
                      >
                        <RemoveRedEyeIcon />
                        {selectProjectLoading &&
                        currentProjectIdAction === value ? (
                          <CircularProgress
                            className={classes.buttonLoading}
                            color="secondary"
                          />
                        ) : null}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        disabled={selectProjectLoading || deleteProjectLoading}
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
                  </React.Fragment>
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
        title="Projects"
      />
    </Paper>
  )
}

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Dashboard)
