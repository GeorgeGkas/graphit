/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Import components.
 */
import GoogleIcon from './atoms/GoogleIcon'
import { withAuthentication } from '../../../../../../providers/Auth'

const useStyles = makeStyles(() => ({
  signin: {
    '&,&:hover,&:active,&:focus': {
      backgroundColor: '#fff',
    },
    '&:hover': {
      opacity: 0.9,
    },
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: 2,
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
    color: 'rgba(0, 0, 0, .54)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeight: '500',
    padding: '6px 10px',
    textTransform: 'capitalize',
    transition:
      'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
}))

/**
 * Component.
 */
const GoogleSignIn = ({ auth, buttonText, onFailure, onSuccess, render }) => {
  const classes = useStyles()

  const doGoogleSignIn = async () => {
    try {
      await auth.signIn()
      onSuccess()
    } catch (e) {
      onFailure(e)
    }
  }

  if (render) {
    return render(doGoogleSignIn)
  } else {
    return (
      <Button
        className={classes.signin}
        variant="contained"
        onClick={doGoogleSignIn}
      >
        <GoogleIcon />
        {buttonText}
      </Button>
    )
  }
}

export default withAuthentication(GoogleSignIn)
