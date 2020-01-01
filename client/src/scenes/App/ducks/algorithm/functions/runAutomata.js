import i18next from 'i18next'
import cloneDeep from 'lodash/fp/cloneDeep'
import filter from 'lodash/fp/filter'
import find from 'lodash/fp/find'
import values from 'lodash/fp/values'
import React from 'react'
import { toast } from 'react-toastify'

import Notification from '../../../../../organisms/Notification'
import resolveGraph from './resolveGraph'

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
  let nextStates = []
  const steps = []

  let step = {
    highlighted_edges: [],
    highlighted_nodes: [],
    selected_edges: [],
    selected_nodes: [],
    unvisited: [],
  }

  currentStates.push(initial)

  for (const state of currentStates) {
    followEpsilonsTransitions(resolvedGraph, state, nextStates, step)
  }

  currentStates = [initial, ...cloneDeep(nextStates)]
  nextStates = []
  steps.push(step)

  for (const char of input) {
    step = {
      highlighted_edges: [],
      highlighted_nodes: [],
      selected_edges: [],
      selected_nodes: [],
      unvisited: [],
    }

    for (const state of currentStates) {
      followCharTransitions(resolvedGraph, state, nextStates, step, char)
    }

    for (const state of nextStates) {
      followEpsilonsTransitions(resolvedGraph, state, nextStates, step)
    }

    currentStates = cloneDeep(nextStates)
    nextStates = []
    steps.push(step)
  }

  if (!!find(['properties.final', true])(currentStates)) {
    toast.dismiss()
    toast(
      <Notification
        disableClickAwayListener
        message={`${i18next.t(
          'ducks.algorithm.functions.runAutomata.valid.first',
        )} "${input}" ${i18next.t(
          'ducks.algorithm.functions.runAutomata.valid.second',
        )}`}
      />,
    )
  } else {
    toast.dismiss()
    toast(
      <Notification
        disableClickAwayListener
        message={`${i18next.t(
          'ducks.algorithm.functions.runAutomata.invalid.first',
        )} "${input}" ${i18next.t(
          'ducks.algorithm.functions.runAutomata.invalid.second',
        )}`}
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

    if (step.selected_nodes.includes(state.id)) {
      continue
    }

    step.selected_nodes.push(state.id)

    const transitions = filter(['ui.connects.from', state.id])(
      values(graph.edges),
    )

    for (const transition of transitions) {
      if (transition.properties.input.split(',').includes('@')) {
        if (!nextStates.some(state => state.id === transition.ui.connects.to)) {
          const next = graph.nodes[transition.ui.connects.to]
          S.push(next)
          nextStates.push(next)
        }

        if (!step.selected_edges.includes(transition.id)) {
          step.selected_edges.push(transition.id)
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
    if (transition.properties.input.split(',').includes(char)) {
      if (!nextStates.some(state => state.id === transition.ui.connects.to)) {
        const next = graph.nodes[transition.ui.connects.to]
        nextStates.push(next)
      }

      if (!step.selected_edges.includes(transition.id)) {
        step.selected_edges.push(transition.id)
      }
    }
  }
}
