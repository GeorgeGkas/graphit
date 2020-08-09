import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  content: {
    padding: '24px',
  },
  footer: {
    padding: '10px 10px 10px 27px',
  },
  stepLabel: {
    '& .MuiStepIcon-root': {
      color: '#3386F2',
    },
    '& .MuiStepIcon-text': {
      fontWeight: 700,
    },
    '& .MuiStepLabel-active': {
      fontWeight: 700,
    },
    '& .MuiStepLabel-alternativeLabel': {
      fontFamily: 'Amaranth, sans-serif',
      fontSize: '14px',
    },
  },
  buttonBack: {
    fontFamily: 'Amaranth, sans-serif',
    padding: '10px 30px',
    border: '2px solid #000',
    '&:disabled': {
      border: 0,
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    borderRadius: 0,
    marginRight: theme.spacing(1),
    '& .MuiButton-label': {
      textTransform: 'none',
    },
  },
  buttonSkip: {
    '& .MuiButton-label': {
      textTransform: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    fontFamily: 'Amaranth, sans-serif',
    marginRight: theme.spacing(1),
    float: 'right',
    background: '#3386F2',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    padding: '10px 30px',
    '&:hover': {
      background: '#1976D2',
      boxShadow: 'none',
    },
  },
  buttonNext: {
    fontFamily: 'Amaranth, sans-serif',
    marginRight: theme.spacing(1),
    background: '#3386F2',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    padding: '10px 30px',
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      boxShadow: 'none',
    },
  },
}))

const CustomStepper = ({
  onComplete = _ => _,
  onCompleteEndFail = () => null,
  onCompleteEndSuccess = () => null,
  onCompleteStart = () => null,
  steps,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

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

      if (steps[activeStep].onNextFinish) {
        setActiveStep(() => steps.length)
      } else {
        let newSkippedStepsSet = skippedStepsSet
        if (isStepSkippable(activeStep)) {
          newSkippedStepsSet = new Set(skippedStepsSet.values())
          newSkippedStepsSet.delete(activeStep)
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setSkippedStepsSet(newSkippedStepsSet)
      }
    } catch (e) {
      if (typeof steps[activeStep].onError === 'function') {
        await steps[activeStep].onError(e)
      }
    }
  }

  const handlePreviousStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSkippableStep = async () => {
    if (!isStepOptional(steps[activeStep])) {
      throw new Error(t('stepper.prohibit_optional_step_skip'))
    }

    if (typeof steps[activeStep].onSkip === 'function') {
      await steps[activeStep].onSkip()
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
      <Stepper alternativeLabel activeStep={activeStep} connector={<></>}>
        {steps.map((step, index) => {
          const stepProps = {}
          const labelProps = {}
          if (
            isStepSkippable(index) &&
            !(typeof step.onNextFinish === 'function' && step.onNextFinish())
          ) {
            stepProps.completed = false
          }
          return (
            <Step key={step.title} {...stepProps}>
              <StepLabel className={classes.stepLabel} {...labelProps}>
                {step.title}
              </StepLabel>
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
              <Grid container direction="row">
                <Grid item md={1}>
                  <Button
                    className={classes.buttonBack}
                    disabled={activeStep === 0}
                    onClick={handlePreviousStep}
                  >
                    {t('stepper.back')}
                  </Button>
                </Grid>
                <Grid item md={9}>
                  {isStepOptional(steps[activeStep]) && (
                    <Button
                      className={classes.buttonSkip}
                      color="primary"
                      variant="contained"
                      onClick={handleSkippableStep}
                    >
                      {t('stepper.skip')}
                    </Button>
                  )}
                </Grid>
                <Grid item md={2}>
                  <Button
                    className={classes.buttonNext}
                    color="primary"
                    disabled={steps[activeStep].nextStepDisabledIf}
                    variant="contained"
                    onClick={handleNextStep}
                  >
                    {activeStep === steps.length - 1 ||
                    (typeof steps[activeStep].onNextFinish === 'function' &&
                      steps[activeStep].onNextFinish())
                      ? t('stepper.finish')
                      : t('stepper.next')}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomStepper
