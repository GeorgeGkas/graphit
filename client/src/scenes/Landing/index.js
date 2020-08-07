import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { withFirebase } from '../../providers/Firebase'
import Books from './images/Books.svg'
import CloudDownload from './images/Cloud-Download.svg'
import CloudStorage from './images/Cloud-Storage.svg'
import Eye from './images/Eye.svg'
import Funnel from './images/Funnel.svg'
import Grid1 from './images/Grid-1.svg'
import Grid2 from './images/Grid-2.svg'
import logo from './images/logo.svg'
import Stars from './images/Stars.svg'
import Tools from './images/Tools.svg'

const useStyles = makeStyles(theme => ({
  logoWrapper: {},
  header: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    width: '80%',
    padding: '50px 0 100px 0',
  },
  actionButtonsWrapper: {
    textAlign: 'right',
  },
  callToActionButton: {
    background: '#3386F2',
    borderRadius: 0,
    padding: '15px 30px',
    width: '250px',
    height: '60px',
    '&:hover': {
      opacity: 0.8,
      background: '#3386F2',
    },
  },
  callToActionButtonText: {
    color: '#fff',
    fontFamily: 'Amaranth, sans-serif',
    textTransform: 'none',
  },
  watchTutorialButtonsWrapper: {
    textAlign: 'left',
  },
  watchTutorialButton: {
    background: '#fff',
    borderRadius: 0,
    border: '2px solid #000',
    padding: '15px 30px',
    width: '250px',
    height: '60px',
    '&:hover': {
      opacity: 0.8,
      background: '#eee',
    },
  },
  watchTutorialButtonText: {
    color: '#000',
    fontFamily: 'Amaranth, sans-serif',
    textTransform: 'none',
  },
  grid2Image: {
    marginTop: '70%',
  },
  secondSectionHeaderWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  secondSectionHeader: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '31px',
    width: '30%',
    fontWeight: 700,
    paddingBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '50px',
    },
  },
  thirdSectionWrapper: {
    width: '100%',
    paddingLeft: '6%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      width: '80%',
      textAlign: 'center',
    },
  },
  thirdSectionContent: {},
  thirdSectionImage: {
    marginLeft: '-20px',
  },
  thirdSectionTitle: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    marginTop: '-20px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      margin: '-20px auto 0 auto',
    },
  },
  thirdSectionDescription: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    width: '75%',
    letterSpacing: '1px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      margin: '0 auto',
    },
  },
  fourthSectionWrapper: {
    width: '80%',
    margin: '3% auto',
    border: '1px solid rgba(0, 0, 0, .1)',
    padding: '2%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '100px',
    },
  },
  fourthSectionHeaderWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  fourthSectionHeader: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '31px',
    width: '45%',
    margin: '0 auto',
    fontWeight: 700,
    paddingBottom: '30px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '50px',
    },
  },
  fourthSectionItemHeader: {
    fontFamily: 'Amaranth, sans-serif',
    fontWeight: 700,
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  fourthSectionItemDescription: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    letterSpacing: '1px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  columnReverseSm: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  fifthSectionHeaderWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  fifthSectionHeader: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '31px',
    width: '45%',
    fontWeight: 700,
    paddingTop: '50px',
    width: '80%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '80px',
      width: '100%',
      margin: '0 auto',
    },
  },
  funnelWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  funnelStepsContainer: {
    padding: '20% 0 20% 22%',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 0',
    },
  },
  funnelImage: {
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      height: '70%',
      margin: '0 auto',
      display: 'block',
    },
  },
  funnelStepsFirst: {
    marginBottom: '7%',
  },
  funnelStepsSecond: {
    marginBottom: '7%',
  },
  funnelStepsThird: {
    marginBottom: '7%',
  },
  funnelStepsFirstTitle: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    marginLeft: '-25px',
  },
  funnelStepsSecondTitle: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    marginLeft: '-25px',
  },
  funnelStepsThirdTitle: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    marginLeft: '-25px',
  },
  funnelStepsFirstDescription: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    width: '60%',
    letterSpacing: '1px',
  },
  funnelStepsSecondDescription: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    width: '60%',
    letterSpacing: '1px',
  },
  funnelStepsThirdDescription: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    width: '60%',
    letterSpacing: '1px',
  },
  sixthSectionWrapper: {
    background: '#3386F2',
    color: '#fff',
    marginTop: '100px',
  },
  sixthSectionContainer: {
    margin: '0 auto',
    padding: '80px 0',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  starsImage: {
    marginTop: '-25%',
    width: '90%',
    float: 'right',
  },
  sixthSectionTitle: {
    fontFamily: 'Amaranth, sans-serif',
    fontSize: '31px',
    fontWeight: 700,
  },
  sixthSectionDescription: {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '16px',
    letterSpacing: '1px',
  },
  sixthSectionFirstItem: {
    paddingLeft: '10%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  footer: {
    padding: '20px 0',
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '14px',
    letterSpacing: '1px',
  },
  copyrightYear: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '10px',
    },
  },
  creator: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '10px',
    },
  },
  privacy: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      paddingBottom: '10px',
    },
  },
}))

const Landing = ({ firebase }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Grid container style={{ overflow: 'hidden' }}>
        <Grid container justify="center" direction="row">
          <Grid item md={3}>
            <img alt="" src={Grid2} />
          </Grid>
          <Grid item md={6}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.logoWrapper}
            >
              <img alt="logo" src={logo} width="75" height="75" />
            </Grid>
            <Grid container alignItems="center" justify="center">
              <Typography
                gutterBottom
                align="center"
                component="h1"
                className={classes.header}
              >
                {t('landing.slogan')}
              </Typography>
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="row"
              spacing={3}
            >
              <Grid item md={6} className={classes.actionButtonsWrapper}>
                <Button
                  className={classes.callToActionButton}
                  component={Link}
                  onClick={() =>
                    firebase.analytics.logEvent('call_to_action_button')
                  }
                  to="/app"
                >
                  <Typography className={classes.callToActionButtonText}>
                    {t('landing.button_open_editor')}
                  </Typography>
                </Button>
              </Grid>
              <Grid item md={6} className={classes.watchTutorialButtonsWrapper}>
                <Button
                  className={classes.watchTutorialButton}
                  component={Link}
                  onClick={() =>
                    firebase.analytics.logEvent('call_to_action_button')
                  }
                  to="/app"
                >
                  <Typography className={classes.watchTutorialButtonText}>
                    {t('landing.button_watch_tutorial')}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <img alt="" src={Grid1} className={classes.grid2Image} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.secondSectionHeaderWrapper}>
        <Typography className={classes.secondSectionHeader} align="left">
          {t('landing.section1_title')}
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        direction="row"
        className={classes.thirdSectionWrapper}
      >
        <Grid item md={4} className={classes.thirdSectionContent}>
          <div>
            <img
              alt=""
              src={Eye}
              width="150"
              height="150"
              className={classes.thirdSectionImage}
            />
          </div>
          <div>
            <Typography
              align="left"
              className={classes.thirdSectionTitle}
              gutterBottom
            >
              {t('landing.section1_item1_title')}
            </Typography>
          </div>
          <div>
            <Typography paragraph className={classes.thirdSectionDescription}>
              {t('landing.section1_item1_description')}
            </Typography>
          </div>
        </Grid>
        <Grid item md={4} className={classes.thirdSectionContent}>
          <div>
            <img
              alt=""
              src={Books}
              width="150"
              height="150"
              className={classes.thirdSectionImage}
            />
          </div>
          <div>
            <Typography
              align="left"
              className={classes.thirdSectionTitle}
              gutterBottom
            >
              {t('landing.section1_item2_title')}
            </Typography>
          </div>
          <div>
            <Typography paragraph className={classes.thirdSectionDescription}>
              {t('landing.section1_item2_description')}
            </Typography>
          </div>
        </Grid>
        <Grid item md={3} className={classes.thirdSectionContent}>
          <div>
            <img
              alt=""
              src={Tools}
              width="150"
              height="150"
              className={classes.thirdSectionImage}
            />
          </div>
          <div>
            <Typography
              align="left"
              className={classes.thirdSectionTitle}
              gutterBottom
            >
              {t('landing.section1_item3_title')}
            </Typography>
          </div>
          <div>
            <Typography paragraph className={classes.thirdSectionDescription}>
              {t('landing.section1_item3_description')}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <div className={classes.fourthSectionWrapper}>
        <Grid container className={classes.fourthSectionHeaderWrapper}>
          <Typography className={classes.fourthSectionHeader} align="left">
            {t('landing.section2_title')}
          </Typography>
        </Grid>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          spacing={3}
        >
          <Grid item md={6} sm={12}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="row"
            >
              <Grid
                item
                md={5}
                sm={12}
                style={{
                  textAlign: 'center',
                }}
              >
                <img alt="" src={CloudStorage} width="200" height="200" />
              </Grid>
              <Grid item md={7} sm={12}>
                <Typography
                  align="left"
                  className={classes.fourthSectionItemHeader}
                  gutterBottom
                >
                  {t('landing.section2_item1_title')}
                </Typography>
                <Typography
                  align="left"
                  className={classes.fourthSectionItemDescription}
                >
                  {t('landing.section2_item1_description')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} sm={12}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="row"
              className={classes.columnReverseSm}
            >
              <Grid item md={7} sm={12}>
                <Typography
                  align="left"
                  className={classes.fourthSectionItemHeader}
                  gutterBottom
                >
                  {t('landing.section2_item2_title')}
                </Typography>
                <Typography
                  align="left"
                  className={classes.fourthSectionItemDescription}
                >
                  {t('landing.section2_item2_description')}
                </Typography>
              </Grid>
              <Grid item md={5} sm={12}>
                <img alt="" src={CloudDownload} width="200" height="200" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.fifthSectionHeaderWrapper}>
        <Typography className={classes.fifthSectionHeader} align="left">
          {t('landing.section3_title')}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.funnelWrapper}
      >
        <Grid item md={5} xs={12} style={{ alignSelf: 'center' }}>
          <img alt="" src={Funnel} className={classes.funnelImage} />
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="stretch"
            className={classes.funnelStepsContainer}
          >
            <Grid item xs={12} className={classes.funnelStepsFirst}>
              <Typography
                gutterBottom
                align="left"
                className={classes.funnelStepsFirstTitle}
              >
                {t('landing.section3_step1_title')}
              </Typography>
              <Typography
                gutterBottom
                className={classes.funnelStepsFirstDescription}
              >
                {t('landing.section3_step1_description')}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.funnelStepsSecond}>
              <Typography
                gutterBottom
                className={classes.funnelStepsSecondTitle}
              >
                {t('landing.section3_step2_title')}
              </Typography>
              <Typography
                gutterBottom
                className={classes.funnelStepsSecondDescription}
              >
                {t('landing.section3_step2_description')}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.funnelStepsThird}>
              <Typography
                gutterBottom
                className={classes.funnelStepsThirdTitle}
              >
                {t('landing.section3_step3_title')}
              </Typography>
              <Typography
                gutterBottom
                className={classes.funnelStepsThirdDescription}
              >
                {t('landing.section3_step3_description')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.sixthSectionWrapper}>
        <Grid
          container
          justify="flex-start"
          direction="row"
          className={classes.sixthSectionContainer}
        >
          <Grid item md={5} className={classes.sixthSectionFirstItem}>
            <Typography gutterBottom className={classes.sixthSectionTitle}>
              {t('landing.section4_title')}
            </Typography>
            <Typography paragraph className={classes.sixthSectionDescription}>
              {t('landing.section4_description')}{' '}
              <a
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
                href="mailto:georgegkas@gmail.com"
              >
                georgegkas@gmail.com
              </a>
              .
            </Typography>
          </Grid>
          <Grid item md={7}>
            <img alt="" src={Stars} className={classes.starsImage} />
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.footer} direction="row">
        <Grid item xs={12} sm={2}>
          <Typography className={classes.copyrightYear}>
            © {new Date().getFullYear()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className={classes.creator}>
            graphIT by{' '}
            <a
              style={{ color: '#000', textDecoration: 'none', fontWeight: 700 }}
              href="https://github.com/georgegkas"
            >
              georgegkas
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography className={classes.privacy}>
            <Link
              to="/privacy"
              style={{ color: '#000', textDecoration: 'none', fontWeight: 700 }}
            >
              {t('landing.privacy_policy')}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default withFirebase(Landing)
