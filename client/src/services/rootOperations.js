/**
 * Export all the Duck Operations which will be used in Redux
 * store.
 */

import { operations as algorithmOperations } from '../scenes/App/ducks/algorithm'
import { operations as editorOperations } from '../scenes/App/ducks/editor'
import { operations as graphOperations } from '../scenes/App/ducks/graph'
import { operations as projectsOperations } from '../ducks/projects'

export {
  algorithmOperations,
  editorOperations,
  graphOperations,
  projectsOperations,
}
