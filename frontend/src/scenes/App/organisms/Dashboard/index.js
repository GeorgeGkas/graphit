/**
 * Import globals.
 */
import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

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
import { operations as editorOperations } from '../Editor/duck'
import { operations as profileOperations } from '../AppBar/duck'

/**
 * Import components.
 */
import close from './images/close.svg'
import CloseButton from './atoms/CloseButton'

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
    zIndex: 99999,
  },
  table: {
    height: '70vh',
  },
}))

/**
 * Connect component to Redux.
 */
const mapStateToProps = state => ({
  profile: state.user.profile,
  selectedProjectId: state.user.selectedProjectId,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...editorOperations,
      ...profileOperations,
    },
    dispatch,
  )

/**
 * Component.
 */
const Dashboard = ({
  futureExist,
  initEditorHistory,
  loadState,
  pastExist,
  profile,
  selectProject,
  selectedProjectId,
  toggleDashboard,
}) => {
  const classes = useStyles()
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    const getProjectList = async () => {
      try {
        const list = await fetchProjectList(profile.id)
        setProjectList(list)
      } catch (e) {
        toast.error(e.message)
      }
    }

    getProjectList()
  }, [profile])

  const loadProject = async projectId => {
    try {
      const project = await fetchProject(projectId)
      if (
        (!pastExist && !futureExist) ||
        // eslint-disable-next-line no-restricted-globals
        confirm('Are you sure you want to quit as there are unsaved documents?')
      ) {
        initEditorHistory()
        loadState(project)
        selectProject(projectId)
        toggleDashboard()
      }
    } catch (e) {
      toast.error(e.message)
    }
  }

  const deleteProject = async projectId => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm('Are you sure you want to delete this project?')) return

      await fetchDeleteProject(projectId)

      setProjectList(projectList.filter(project => project._id !== projectId))
      toast.success('Successfully deleted the project.')

      if (selectedProjectId === projectId) {
        initEditorHistory()
        selectProject('')
      }
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
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
          <CloseButton onClick={toggleDashboard}>
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
            label: 'Last modified',
            name: 'modified',
            options: {
              searchable: false,
            },
          },
          {
            name: '_id',
            options: {
              display: 'false',
              searchable: false,
              sort: false,
            },
          },
          {
            name: '',
            options: {
              customBodyRender: value => (
                <IconButton onClick={() => loadProject(value)}>
                  <RemoveRedEyeIcon />
                </IconButton>
              ),
              searchable: false,
              sort: false,
            },
          },
        ]}
        data={projectList.map(project => ({
          '': project._id,
          _id: project._id,
          algorithm: project.algorithm,
          modified: new Date(Date.parse(project.updatedAt)).toDateString(),
          name: project.name,
        }))}
        options={{
          customToolbarSelect: (selectedRows, displayData) => {
            const id = displayData[selectedRows.data[0].dataIndex].data[3]
            return (
              <IconButton
                className={classes.delete}
                onClick={() => deleteProject(id)}
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
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
