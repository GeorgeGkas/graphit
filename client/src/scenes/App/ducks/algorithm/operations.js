import React from 'react'

import concat from 'lodash/fp/concat'
import find from 'lodash/fp/find'
import filter from 'lodash/fp/filter'
import includes from 'lodash/fp/includes'
import keys from 'lodash/fp/keys'
import map from 'lodash/fp/map'
import matchesProperty from 'lodash/fp/matchesProperty'
import minBy from 'lodash/fp/minBy'
import reduce from 'lodash/fp/reduce'
import uniq from 'lodash/fp/uniq'
import uniqBy from 'lodash/fp/uniqBy'
import values from 'lodash/fp/values'
import { toast } from 'react-toastify'
import * as actions from './actions'
import { operations as editorOperations } from '../editor'

import Notification from '../../../../organisms/Notification'

const {
  firstIteration: firstIterationAction,
  lastIteration: lastIterationAction,
  nextIteration: nextIterationAction,
  previousIteration: previousIterationAction,
  startPlaying: startPlayingAction,
  stopPlaying: stopPlayingAction,
} = actions

const dijkstra = (graph, initial) => {
  const steps = []
  const Q = new Set()
  const dist = new Map()
  const prev = new Map()

  for (const node of values(graph.nodes)) {
    dist.set(node.id, Infinity)
    prev.set(node.id, null)
    Q.add(node.id)
  }

  dist.set(initial.id, 0)

  steps.push({
    distances: Object.fromEntries(dist),
    highlighted_edges: [],
    highlighted_nodes: [],
    selected_edges: [],
    selected_nodes: [],
    unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
      map('id')(values(graph.nodes)),
    ),
  })

  while (Q.size) {
    const u = minBy(id => dist.get(id), Array.from(Q))

    Q.delete(u)

    const outerEdges = filter(matchesProperty('ui.connects.from', u))(
      values(graph.edges),
    )
    const neighbors = map(edge => graph.nodes[edge.ui.connects.to])(outerEdges)

    steps.push({
      distances: Object.fromEntries(dist),
      highlighted_edges: [],
      highlighted_nodes: [],
      selected_edges: [],
      selected_nodes: [u],
      unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
        map('id')(values(graph.nodes)),
      ),
    })

    if (outerEdges.length) {
      steps.push({
        distances: Object.fromEntries(dist),
        highlighted_edges: map('id')(outerEdges),
        highlighted_nodes: map('id')(neighbors),
        selected_edges: [],
        selected_nodes: [u],
        unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
          map('id')(values(graph.nodes)),
        ),
      })
    }

    for (const v of neighbors) {
      const edge = find(
        edge => edge.ui.connects.from === u && edge.ui.connects.to === v.id,
      )(outerEdges)

      const alt = dist.get(u) + edge.properties.weight

      if (alt < dist.get(v.id)) {
        dist.set(v.id, alt)
        prev.set(v.id, u)
      }
    }
  }

  steps.push({
    distances: Object.fromEntries(dist),
    highlighted_edges: [],
    highlighted_nodes: [],
    selected_edges: reduce((arr, [current, previous]) => {
      const edgeId = find(
        edge =>
          edge.ui.connects.from === previous && edge.ui.connects.to === current,
      )(graph.edges)

      if (!edgeId) {
        return arr
      }

      return [...arr, edgeId.id]
    })([])([...prev.entries()]),
    selected_nodes: uniq(
      concat(
        map('ui.connects.from')(graph.edges),
        map('ui.connects.to')(graph.edges),
      ),
    ),
    unvisited: reduce((obj, id) => ({ ...obj, [id]: Q.has(id) }))({})(
      map('id')(values(graph.nodes)),
    ),
  })

  return steps
}

/**
 * Run DFS algorithm on a graph forest and retrieve the sub graph
 * that has initial as root.
 */
const resolveGraph = (graph, initial) => {
  const S = []
  const resolvedGraph = {
    edges: {},
    nodes: {},
  }

  S.push(initial)

  while (S.length) {
    const v = S.pop()

    if (!includes(v.id, keys(resolvedGraph.nodes))) {
      resolvedGraph.nodes[v.id] = v

      const outerEdges = reduce((edges, edge) => ({
        ...edges,
        [edge.id]: edge,
      }))({})(
        filter(matchesProperty('ui.connects.from', v.id))(values(graph.edges)),
      )

      const neighbors = map(edge => graph.nodes[edge.ui.connects.to])(
        outerEdges,
      )

      resolvedGraph.edges = { ...resolvedGraph.edges, ...outerEdges }

      for (const w of neighbors) {
        S.push(w)
      }
    }
  }

  return resolvedGraph
}

const startPlaying = () => (dispatch, getState) => {
  /**
   * Get the initial node.
   */
  const initials = filter(matchesProperty('properties.initial', true))(
    getState().graph.present.nodes,
  )
  if (!initials.length) {
    toast.dismiss()
    toast(<Notification message="Please set an initial node" />)
    return
  } else if (initials.length > 1) {
    toast.dismiss()
    toast(<Notification message="Please select only one initial node" />)
    return
  }

  const initial = initials.pop()

  /**
   * Get the sub-graph (in case of a graph forest),
   * that has root the initial node.
   */
  const resolvedGraph = resolveGraph(getState().graph.present, initial)
  const nodes = values(resolvedGraph.nodes)
  if (uniqBy('properties.name', nodes).length !== nodes.length) {
    toast.dismiss()
    toast(<Notification message="Duplicate node names are prohibited" />)
    return
  }

  /**
   * Run Dijkstra's algorithm in resolved graph.
   */
  const dijkstraResults = dijkstra(resolvedGraph, initial)

  /**
   * Initialize the runner.
   */
  dispatch(editorOperations.updateCurrentEditorAction('isPlaying'))

  /**
   * Start the runner.
   */
  dispatch(startPlayingAction(dijkstraResults))
}

const stopPlaying = () => dispatch => {
  dispatch(stopPlayingAction())
  dispatch(editorOperations.updateCurrentEditorAction('select'))
}

const nextIteration = () => dispatch => {
  dispatch(nextIterationAction())
}

const lastIteration = () => dispatch => {
  dispatch(lastIterationAction())
}

const firstIteration = () => dispatch => {
  dispatch(firstIterationAction())
}

const previousIteration = () => dispatch => {
  dispatch(previousIterationAction())
}

export {
  firstIteration,
  lastIteration,
  nextIteration,
  previousIteration,
  startPlaying,
  stopPlaying,
}
