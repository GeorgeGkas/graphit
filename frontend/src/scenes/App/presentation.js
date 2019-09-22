import React from 'react'
import Editor from './organisms/Editor'
import Dijkstra from './organisms/Dijkstra'
import Overlay from '../../atoms/Overlay'
import Dashboard from './organisms/Dashboard'
import AppBar from './organisms/AppBar'
import EditorBar from './organisms/EditorBar'
import Slide from '@material-ui/core/Slide'
import PropertiesEditor from './organisms/PropertiesEditor'

const Presentation = ({
  grid,
  toggleGrid,
  zoom,
  open,
  isMultiSelect,
  selectedNode,
  editorActionType,
  selectedArrow,
  dashboard,
  toggleDashboard,
  saveInCloud,
  updateInCloud,
}) => (
  <React.Fragment>
    {dashboard ? (
      <React.Fragment>
        <Dashboard toggleDashboard={toggleDashboard} />
        <Overlay />
      </React.Fragment>
    ) : null}

    <div style={{ position: 'relative' }}>
      <AppBar
        open={open}
        saveInCloud={saveInCloud}
        updateInCloud={updateInCloud}
        toggleDashboard={toggleDashboard}
      />
      <EditorBar toggleGrid={toggleGrid} grid={grid} zoom={zoom} />
    </div>

    <Editor grid={grid} />

    {editorActionType === 'select' &&
    !isMultiSelect &&
    (selectedArrow.length ^ selectedNode.length) === 1 ? (
      <PropertiesEditor />
    ) : null}

    <Slide
      direction="left"
      in={editorActionType === 'isPlaying'}
      mountOnEnter
      unmountOnExit
    >
      <Dijkstra />
    </Slide>
  </React.Fragment>
)

export default Presentation
