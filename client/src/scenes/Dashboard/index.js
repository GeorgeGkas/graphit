/**
 * Import globals.
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

/**
 * Import UI framework modules.
 */
import Box from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import IconButton from '@material-ui/core/IconButton'
import MUIDataTable from 'mui-datatables'
import Paper from '@material-ui/core/Paper'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeSharp'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import ducks.
 */
import { operations as graphOperations } from '../App/organisms/Editor/ducks/graph'
import { operations as profileOperations } from '../App/organisms/AppBar/duck'

/**
 * Import components.
 */
import ConfirmDialog from '../../organisms/ConfirmDialog'
import close from './images/close.svg'
import CloseButton from './atoms/CloseButton'
import Notification from '../../organisms/Notification'

/**
 * Import services.
 */
import fetchDeleteProject from './services/fetchDeleteProject'
import fetchProject from './services/fetchProject'
import fetchProjectList from './services/fetchProjectList'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
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
  futureExist: state.graph.future.length,
  pastExist: state.graph.past.length,
  profile: state.user.profile,
  selectedProjectId: state.user.selectedProjectId,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...graphOperations,
      ...profileOperations,
    },
    dispatch,
  )

/**
 * Component.
 */
const Dashboard = ({
  futureExist,
  initGraphHistory,
  loadGraph,
  pastExist,
  profile,
  selectProject,
  selectedProjectId,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const [projectList, setProjectList] = useState([])

  const [loadDialogVisible, makeLoadDialogVisible] = useState(false)
  const toggleLoadDialog = () => makeLoadDialogVisible(!loadDialogVisible)

  const [selectedProjectToLoad, setSelectedProjectToLoad] = useState('')
  const [selectedProjectToDelete, setSelectedProjectToDelete] = useState('')

  const [deleteDialogVisible, makeDeleteDialogVisible] = useState(false)
  const toggleDeleteDialog = () => makeDeleteDialogVisible(!deleteDialogVisible)

  useEffect(() => {
    const getProjectList = async () => {
      toast(<Notification message="Fetching projects..." />)
      const res = await fetchProjectList(profile.token)

      if (res.status === 200) {
        toast(<Notification message="Projects fetched successfully" />)
        const list = res.data.data
        setProjectList(list)
      } else {
        toast(<Notification message="Could not fetch project list" />)
      }
    }

    getProjectList()
  }, [profile])

  const loadSelectedProject = async () => {
    toast(<Notification message="Fetching project..." />)
    const res = await fetchProject(selectedProjectToLoad, profile.token)

    if (res.status === 200) {
      toast(<Notification message="Project fetched successfully" />)
      const project = JSON.parse(res.data.data.graph)
      selectProject(selectedProjectToLoad)
      loadGraph(project)
      history.push('/app')
    } else {
      toast(<Notification message="Could not fetch project" />)
    }
  }

  const deleteSelectedProject = async () => {
    toast(<Notification message="Deleting project..." />)
    const res = await fetchDeleteProject(selectedProjectToDelete, profile.token)

    if (res.status === 204) {
      toast(<Notification message="Project deleted successfully" />)
      setProjectList(
        projectList.filter(project => project.id !== selectedProjectToDelete),
      )

      if (selectedProjectId === selectedProjectToDelete) {
        initGraphHistory()
        selectProject('')
      }
    } else {
      toast(<Notification message="Could not delete project" />)
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Box display="flex" style={{ borderBottom: '1px solid #ddd' }}>
          <Box p="15px" style={{ textAlign: 'center' }} width={1 / 10}>
            <img
              alt=""
              height={42}
              src={profile.imageUrl}
              style={{ borderRadius: '50%' }}
              width={42}
            />
          </Box>
          <Box p="15px" style={{ lineHeight: '42px' }} width={8 / 10}>
            {profile.name}
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
                  setSelectedProjectToLoad(value)
                  return (
                    <IconButton
                      onClick={() => {
                        if (futureExist || pastExist) {
                          toggleLoadDialog()
                        } else {
                          loadSelectedProject()
                        }
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  )
                },
                searchable: false,
                sort: false,
              },
            },
          ]}
          data={projectList.map(project => ({
            '': project.id,
            algorithm: project.algorithm,
            created: new Date(Date.parse(project.createdAt)).toDateString(),
            id: project.id,
            name: project.name,
          }))}
          options={{
            customToolbarSelect: (selectedRows, displayData) => {
              return (
                <IconButton
                  className={classes.delete}
                  onClick={() => {
                    setSelectedProjectToDelete(
                      displayData[selectedRows.data[0].dataIndex].data[3],
                    )
                    toggleDeleteDialog()
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )
            },
            download: false,
            elevation: 0,
            filter: false,
            print: false,
            responsive: 'scrollMaxHeight',
            search: true,
            searchPlaceholder: 'Search by project name',
            selectableRows: 'single',
            selectableRowsHeader: false,

            sort: true,
            viewColumns: false,
          }}
          title="Projects"
        />
      </Paper>

      <ConfirmDialog
        confirmAction={() => {
          loadSelectedProject()
          toggleLoadDialog()
          history.push('/app')
        }}
        confirmDialogVisible={loadDialogVisible}
        confirmMessage={
          'All unsaved changes will be deleted if you confirm this action.'
        }
        confirmTitle="Load project?"
        handleClose={toggleLoadDialog}
      />

      <ConfirmDialog
        confirmAction={() => {
          deleteSelectedProject()
          toggleDeleteDialog()
        }}
        confirmDialogVisible={deleteDialogVisible}
        confirmMessage={'This action cannot be undone.'}
        confirmTitle="Delete project?"
        handleClose={toggleDeleteDialog}
      />
    </React.Fragment>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
