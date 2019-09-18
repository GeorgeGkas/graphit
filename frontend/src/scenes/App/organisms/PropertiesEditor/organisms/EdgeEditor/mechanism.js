import React from 'react'
import { connect } from 'react-redux'
import Presentation from './presentation'
import { bindActionCreators } from 'redux'
import { operations } from '../../../Editor/duck'

const mapStateToProps = state => ({
  selectedArrow:
    state.editor.present.connected[state.editor.present.selectedArrow[0]],
})

const mapDispatchToProps = dispatch => bindActionCreators(operations, dispatch)

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Mechanism extends React.Component {
  constructor(props) {
    super(props)

    this.validateWeightInput = this.validateWeightInput.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      validWeight: true,
      edgeWeight: this.props.selectedArrow.weight,
    }
  }

  validateWeightInput(e) {
    this.setState({
      edgeWeight: e.target.value,
      validWeight: /^(-)?(\d)+$/.test(e.target.value),
    })
  }

  submitForm() {
    this.props.updateArrowWeight({
      id: this.props.selectedArrow.id,
      weight: this.state.edgeWeight,
    })

    this.props.handleClose()
  }

  render() {
    return (
      <Presentation
        {...this.props}
        validateWeightInput={this.validateWeightInput}
        validWeight={this.state.validWeight}
        submitForm={this.submitForm}
      />
    )
  }
}

export default Mechanism
