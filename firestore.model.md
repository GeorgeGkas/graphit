```ts
/**
 * Collection `projects`.
 */
interface projects {
  /**
   * The algorithm that graph corresponds to.
   */
  algorithm: string

  /**
   * UUID of the authenticated user who created
   * the document. (retrieved by calling `getIdToken()`)
   */
  author: string

  /**
   * Timestamp created by calling `toISOString()`
   * on a Date instance.
   */
  createdAt: string

  /**
   * JSON stringified value of the graph.
   */
  graph: string

  /**
   * User defined document name.
   */
  name: string
}
```
