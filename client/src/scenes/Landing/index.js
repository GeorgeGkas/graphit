import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import graphImage from './images/graph.svg'

const useStyles = makeStyles(() => ({
  callToActionButton: {
    background:
      'linear-gradient(90deg, rgba(38,198,218,1) 0%, rgba(0,172,193,1) 50%, rgba(38,198,218,1) 100%)',
    borderBottom: '4px solid rgb(0,131,143)',
    borderRadius: '40px',
    display: 'block',
    margin: '0 auto',
    padding: '5%',
    textAlign: 'center',
    width: '80%',
  },
  callToActionButtonText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'capitalize',
  },
  centralize: {
    display: 'block',
    margin: '0 auto',
  },
  description: {
    display: 'block',
    margin: '0 auto',
    width: '70%',
  },
  firstHalf: {
    margin: '0 auto',
    width: '60%',
  },
  footer: {
    bottom: '24px',
    position: 'absolute',
    width: '100%',
  },
  footerProfileLink: {
    color: 'inherit',
    fontWeight: '700',
    textDecoration: 'none',
  },
  fullHeight: {
    minHeight: '100vh',
  },
}))

const Landing = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div>
      <Grid
        container
        alignItems="center"
        className={classes.fullHeight}
        direction="row"
        justify="center"
        spacing={0}
      >
        <Grid item md={6} sm={7} xs={10}>
          <div className={classes.firstHalf}>
            <Typography gutterBottom align="center" component="h1" variant="h3">
              {t('common.project_name')}
            </Typography>
            <Typography
              paragraph
              align="center"
              className={classes.description}
              variant="body1"
            >
              {t('landing.description')}
            </Typography>
            <div style={{ paddingTop: '24px' }}>
              <Button
                className={classes.callToActionButton}
                component={Link}
                to="/app"
              >
                <Typography className={classes.callToActionButtonText}>
                  {t('landing.callToAction')}
                </Typography>
              </Button>
            </div>
          </div>
        </Grid>

        <Hidden smDown>
          <Grid item md={6}>
            <img
              alt="graph"
              className={classes.centralize}
              height="50%"
              src={graphImage}
              width="50%"
            />
          </Grid>
        </Hidden>
      </Grid>

      <Typography align="center" className={classes.footer} variant="body2">
        {t('landing.footer')}
        <a
          className={classes.footerProfileLink}
          href="https://github.com/georgegkas"
          rel="noopener noreferrer"
          target="_blank"
        >
          @georgegkas
        </a>
      </Typography>
    </div>
  )
}

export default Landing
