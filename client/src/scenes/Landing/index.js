import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import purple from '@material-ui/core/colors/purple'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { withFirebase } from '../../providers/Firebase'
import downloadImage from './images/download.svg'
import editorImage from './images/editor.svg'
import graphImage from './images/graph.svg'
import groupImage from './images/group.svg'
import networkImage from './images/network.svg'
import serverImage from './images/server.svg'

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
  firstSection: {
    background: '#fff',
    padding: '100px 0',
  },
  footer: {
    bottom: '24px',
    width: '100%',
  },
  footerContainer: {
    borderTop: '1px solid ' + grey['300'],
    paddingTop: '3%',
  },
  footerProfileLink: {
    color: 'inherit',
    fontWeight: '700',
    textDecoration: 'none',
  },
  fullHeight: {
    minHeight: '100vh',
  },
  hiddenImage: {
    display: 'block',
    margin: '0 auto',
    paddingBottom: '20px',
  },
  item: {
    padding: '3%',
    textAlign: 'center',
  },
  itemDescription: {
    fontWeight: '500',
  },
  itemImageContainer: {
    paddingBottom: '10%',
  },
  secondSection: {
    background: purple['700'],
    color: '#fff',
    padding: '50px 0',
  },
  thirdSection: {
    color: grey['900'],
    padding: '50px 0',
  },
  thirdSectionTitle: {
    fontWeight: '500',
    paddingTop: '50px',
  },
  wrapper: {
    paddingBottom: '3%',
  },
}))

const Landing = ({ firebase }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid
      container
      alignItems="center"
      className={classes.wrapper}
      direction="column"
      justify="center"
    >
      <Grid
        container
        alignItems="center"
        className={classes.firstSection}
        direction="row"
        justify="center"
        spacing={0}
      >
        <Hidden mdUp>
          <Grid item md={6}>
            <img
              alt="graph"
              className={classes.hiddenImage}
              height="50%"
              src={graphImage}
              width="50%"
            />
          </Grid>
        </Hidden>
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
                onClick={() =>
                  firebase.analytics.logEvent('call_to_action_button')
                }
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
      <Grid
        container
        alignItems="center"
        className={classes.secondSection}
        direction="row"
        justify="center"
        spacing={0}
      >
        <Grid item className={classes.item} md={4} sm={7} xs={10}>
          <div className={classes.itemImageContainer}>
            <img alt="" height="25%" src={networkImage} width="25%" />
          </div>
          <Typography
            paragraph
            align="center"
            className={classes.itemDescription}
            variant="body1"
          >
            {t('landing.featured_visualizers')}
          </Typography>
        </Grid>
        <Grid item className={classes.item} md={4} sm={7} xs={10}>
          <div className={classes.itemImageContainer}>
            <img alt="" height="25%" src={groupImage} width="25%" />
          </div>
          <Typography
            paragraph
            align="center"
            className={classes.itemDescription}
            variant="body1"
          >
            {t('landing.featured_forall')}
          </Typography>
        </Grid>
        <Grid item className={classes.item} md={4} sm={7} xs={10}>
          <div className={classes.itemImageContainer}>
            <img alt="" height="25%" src={editorImage} width="25%" />
          </div>
          <Typography
            paragraph
            align="center"
            className={classes.itemDescription}
            variant="body1"
          >
            {t('landing.featured_editor')}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        paragraph
        align="center"
        className={classes.thirdSectionTitle}
        variant="h5"
      >
        {t('landing.featured_organized')}
      </Typography>
      <Grid
        container
        alignItems="center"
        className={classes.thirdSection}
        direction="row"
        justify="center"
        spacing={0}
      >
        <Grid item className={classes.item} md={6} sm={7} xs={10}>
          <div className={classes.itemImageContainer}>
            <img alt="" height="20%" src={serverImage} width="20%" />
          </div>
          <Typography
            paragraph
            align="center"
            className={classes.itemDescription}
            variant="body1"
          >
            {t('landing.featured_storage')}
          </Typography>
        </Grid>
        <Grid item className={classes.item} md={6} sm={7} xs={10}>
          <div className={classes.itemImageContainer}>
            <img alt="" height="20%" src={downloadImage} width="20%" />
          </div>
          <Typography
            paragraph
            align="center"
            className={classes.itemDescription}
            variant="body1"
          >
            {t('landing.featured_download')}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        className={classes.footerContainer}
        direction="row"
        justify="center"
        spacing={0}
      >
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
      </Grid>
    </Grid>
  )
}

export default withFirebase(Landing)
