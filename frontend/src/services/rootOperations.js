/**
 * Export all the Duck Operations which will be used in Redux
 * store.
 */

import { operations as algorithmOperations } from '../scenes/App/organisms/EditorBar/duck'
import { operations as editorOperations } from '../scenes/App/organisms/Editor/ducks/editor'
import { operations as graphOperations } from '../scenes/App/organisms/Editor/ducks/graph'
import { operations as userOperations } from '../scenes/App/organisms/AppBar/duck'

export {
  algorithmOperations,
  editorOperations,
  graphOperations,
  userOperations,
}
