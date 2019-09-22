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
  isMultiSelect,
  selectedNode,
  editorActionType,
  selectedArrow,
  dashboard,
  toggleDashboard,
}) => (
  <React.Fragment>
    {dashboard ? (
      <React.Fragment>
        <Dashboard toggleDashboard={toggleDashboard} />
        <Overlay />
      </React.Fragment>
    ) : null}

    <div style={{ position: 'relative' }}>
      <AppBar toggleDashboard={toggleDashboard} />
      <EditorBar toggleGrid={toggleGrid} grid={grid} />
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
