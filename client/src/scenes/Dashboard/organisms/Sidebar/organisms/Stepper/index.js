/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Construct component styles.
 */
const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  content: {
    padding: '24px',
  },
  footer: {
    padding: '24px',
  },
  root: {
    width: '90%',
  },
}))

/**
 * Component.
 */
const CustomStepper = ({
  onComplete = _ => _,
  onCompleteEndFail = () => null,
  onCompleteEndSuccess = () => null,
  onCompleteStart = () => null,
  steps,
}) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skippedStepsSet, setSkippedStepsSet] = React.useState(
    new Set(steps.map((step, index) => (step.optional ? index : undefined))),
  )
  skippedStepsSet.delete(undefined)

  const [finalReactComponent, setFinalReactComponent] = React.useState(
    onCompleteStart,
  )

  React.useEffect(() => {
    if (activeStep === steps.length) {
      const asyncOnComplete = async () => {
        try {
          await onComplete()
          setFinalReactComponent(onCompleteEndSuccess)
        } catch (e) {
          setFinalReactComponent(onCompleteEndFail)
        }
      }

      asyncOnComplete()
    }
  }, [activeStep])

  const getActiveStepContent = () => steps[activeStep].content

  const isStepOptional = step => {
    return step.optional
  }

  const isStepSkippable = stepIndex => {
    return skippedStepsSet.has(stepIndex)
  }

  const handleNextStep = async () => {
    try {
      if (typeof steps[activeStep].onNext === 'function') {
        await steps[activeStep].onNext()
      }

      let newSkippedStepsSet = skippedStepsSet
      if (isStepSkippable(activeStep)) {
        newSkippedStepsSet = new Set(skippedStepsSet.values())
        newSkippedStepsSet.delete(activeStep)
      }

      setActiveStep(prevActiveStep => prevActiveStep + 1)
      setSkippedStepsSet(newSkippedStepsSet)
    } catch (e) {
      if (typeof steps[activeStep].onError === 'function') {
        await steps[activeStep].onError(e)
      }
    }
  }

  const handlePreviousStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSkippableStep = () => {
    if (!isStepOptional(steps[activeStep])) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkippedStepsSet(prevSkippedStepsSet => {
      const newSkippedStepsSet = new Set(prevSkippedStepsSet.values())
      newSkippedStepsSet.add(activeStep)
      return newSkippedStepsSet
    })
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(step)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkippable(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={step.title} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          finalReactComponent
        ) : (
          <>
            <div className={classes.content}>{getActiveStepContent()}</div>
            <div className={classes.footer}>
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handlePreviousStep}
              >
                Back
              </Button>
              {isStepOptional(steps[activeStep]) && (
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={handleSkippableStep}
                >
                  Skip
                </Button>
              )}

              <Button
                className={classes.button}
                color="primary"
                disabled={steps[activeStep].nextStepDisabledIf}
                variant="contained"
                onClick={handleNextStep}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomStepper
