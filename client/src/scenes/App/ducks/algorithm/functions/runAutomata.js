import React from 'react'
import { toast } from 'react-toastify'

import cloneDeep from 'lodash/fp/cloneDeep'
import filter from 'lodash/fp/filter'
import find from 'lodash/fp/find'
import values from 'lodash/fp/values'
import resolveGraph from './resolveGraph'

import Notification from '../../../../../organisms/Notification'

export default function automata(graph, input) {
  /**
   * Get the initial state.
   */
  const initial = find(['properties.initial', true])(graph.nodes)

  /**
   * Get the sub-graph (in case of a graph forest),
   * that has root the initial node.
   */
  const resolvedGraph = resolveGraph(graph, initial)

  /**
   * Run Automata in resolved graph.
   */

  let currentStates = []
  const steps = []

  currentStates.push(initial)

  for (const char of input) {
    const step = {
      highlighted_edges: [],
      highlighted_nodes: [],
      selected_edges: [],
      selected_nodes: [],
      unvisited: [],
    }

    const nextStates = []
    for (const state of currentStates) {
      followCharTransitions(resolvedGraph, state, nextStates, step, char)
    }

    for (const state of nextStates) {
      followEpsilonsTransitions(resolvedGraph, state, nextStates, step)
    }

    currentStates = cloneDeep(nextStates)

    steps.push(step)
  }

  if (!!find(['properties.final', true])(currentStates)) {
    toast.dismiss()
    toast(
      <Notification
        disableClickAwayListener
        message={`Input "${input}" is valid`}
      />,
    )
  } else {
    toast.dismiss()
    toast(
      <Notification
        disableClickAwayListener
        message={`Input "${input}" is invalid`}
      />,
    )
  }

  return steps
}

function followEpsilonsTransitions(graph, initial, nextStates, step) {
  const S = []
  S.push(initial)

  while (S.length) {
    const state = S.shift()
    step.selected_nodes.push(state.id)

    const transitions = filter(['ui.connects.from', state.id])(
      values(graph.edges),
    )

    for (const transition of transitions) {
      if (transition.properties.input.split(',').includes('@')) {
        step.selected_edges.push(transition.id)
        if (!nextStates.some(state => state.id === transition.ui.connects.to)) {
          const next = graph.nodes[transition.ui.connects.to]
          S.push(next)
          nextStates.push(next)
        }
      }
    }
  }
}

function followCharTransitions(graph, state, nextStates, step, char) {
  const transitions = filter(['ui.connects.from', state.id])(
    values(graph.edges),
  )

  for (const transition of transitions) {
    if (!nextStates.some(state => state.id === transition.ui.connects.to)) {
      if (transition.properties.input.split(',').includes(char)) {
        const next = graph.nodes[transition.ui.connects.to]
        nextStates.push(next)
        step.selected_edges.push(transition.id)
        if (!step.selected_nodes.includes(state.id)) {
          step.selected_nodes.push(state.id)
        }
      }
    }
  }
}
