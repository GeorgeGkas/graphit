import React from 'react'
import { Box, Flex } from 'reflexbox'
import { makeStyles } from '@material-ui/core/styles'
import close from './images/close.svg'
import CloseButton from './atoms/CloseButton'
import Paper from '@material-ui/core/Paper'
import MUIDataTable from 'mui-datatables'
import IconButton from '@material-ui/core/IconButton'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '65%',
    position: 'absolute',
    zIndex: 99999,
    left: '50%',
    marginLeft: '-32.5%',
    borderRadius: 0,
    height: '100vh',
  },
  delete: {
    marginRight: theme.spacing(3),
  },
  table: {
    height: '70vh',
  },
}))

const Presentation = ({
  profile,
  toggleDashboard,
  projectList,
  fetchAndLoadOnlineState,
  deleteProject,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Flex style={{ borderBottom: '1px solid #ddd' }}>
        <Box width={1 / 10} p="15px" style={{ textAlign: 'center' }}>
          <img
            width={42}
            height={42}
            alt=""
            src={profile.imageUrl}
            style={{ borderRadius: '50%' }}
          />
        </Box>
        <Box width={8 / 10} p="15px" style={{ lineHeight: '42px' }}>
          {profile.name}
        </Box>
        <Box width={1 / 10}>
          <CloseButton onClick={toggleDashboard}>
            <img alt="" src={close} />
          </CloseButton>
        </Box>
      </Flex>

      <MUIDataTable
        className={classes.table}
        title="Projects"
        columns={[
          {
            name: 'name',
            label: 'Name',
            options: {
              searchable: true,
            },
          },
          {
            name: 'algorithm',
            label: 'Algorithm',
            options: {
              searchable: false,
            },
          },
          {
            name: 'modified',
            label: 'Last modified',
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
              searchable: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                <IconButton onClick={() => fetchAndLoadOnlineState(value)}>
                  <RemoveRedEyeIcon />
                </IconButton>
              ),
            },
          },
        ]}
        data={projectList.map(project => ({
          _id: project._id,
          '': project._id,
          name: project.name,
          algorithm: project.algorithm,
          modified: new Date(Date.parse(project.updatedAt)).toDateString(),
        }))}
        options={{
          selectableRows: 'single',
          selectableRowsHeader: false,
          print: false,
          download: false,
          filter: false,
          sort: true,
          viewColumns: false,
          search: true,
          elevation: 0,
          searchPlaceholder: 'Search by project name',
          responsive: 'scrollMaxHeight',
          customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            const id = displayData[selectedRows.data[0].dataIndex].data[3]
            return (
              <IconButton className={classes.delete}>
                <DeleteIcon onClick={() => deleteProject(id)} />
              </IconButton>
            )
          },
        }}
      />
    </Paper>
  )
}

export default Presentation
