import React from 'react'
import { connect } from 'react-redux'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { operations } from '../../../Editor/duck'

const mapStateToProps = state => ({
  selectedNode:
    state.editor.present.nodes[state.editor.present.selectedNode[0]],
  initialNode: state.editor.present.initialNode,
})

const mapDispatchToProps = dispatch => bindActionCreators(operations, dispatch)

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Mechanism extends React.Component {
  constructor(props) {
    super(props)

    this.validateNameInput = this.validateNameInput.bind(this)
    this.setAsInitialNode = this.setAsInitialNode.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      validName: true,
      nodeName: this.props.selectedNode.name,
      initial: this.props.initialNode === this.props.selectedNode.id,
      initialStateChanged: false,
    }
  }

  validateNameInput(e) {
    this.setState({
      nodeName: e.target.value,
      validName: /^[A-Za-z0-9]$/.test(e.target.value),
    })
  }

  setAsInitialNode() {
    this.setState({
      initial: !this.state.initial,
      initialStateChanged: true,
    })
  }

  submitForm() {
    if (this.state.nodeName !== this.props.selectedNode.name) {
      this.props.updateNodeName({
        id: this.props.selectedNode.id,
        name: this.state.nodeName,
      })
    }

    if (this.state.initialStateChanged) {
      this.props.setInitialNode(
        this.state.initial ? this.props.selectedNode.id : null,
      )
    }

    this.props.handleClose()
  }

  render() {
    return (
      <Presentation
        {...this.props}
        validateNameInput={this.validateNameInput}
        validName={this.state.validName}
        isInitial={this.state.initial}
        setAsInitialNode={this.setAsInitialNode}
        submitForm={this.submitForm}
      />
    )
  }
}

export default Mechanism
