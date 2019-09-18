/**
 * Export all the Duck Operations which will be used in Redux
 * store.
 */

/* eslint-disable import/prefer-default-export */
import { operations as editorOperations } from '../scenes/App/organisms/Editor/duck'
import { operations as algorithmOperations } from '../scenes/App/organisms/EditorBar/duck'
import { operations as userOperations } from '../scenes/App/organisms/AppBar/duck'

export { editorOperations, algorithmOperations, userOperations }
