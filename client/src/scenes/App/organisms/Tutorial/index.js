import Typography from '@material-ui/core/Typography'
import BrushIcon from '@material-ui/icons/BrushSharp'
import CategoryIcon from '@material-ui/icons/CategorySharp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftSharp'
import ChevronRightIcon from '@material-ui/icons/ChevronRightSharp'
import DeviceHubIcon from '@material-ui/icons/DeviceHubSharp'
import GridOnIcon from '@material-ui/icons/GridOnSharp'
import PlayArrowIcon from '@material-ui/icons/PlayArrowSharp'
import RedoIcon from '@material-ui/icons/RedoSharp'
import SkipNextIcon from '@material-ui/icons/SkipNextSharp'
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousSharp'
import StopIcon from '@material-ui/icons/StopSharp'
import UndoIcon from '@material-ui/icons/UndoSharp'
import ZoomInIcon from '@material-ui/icons/ZoomInSharp'
import ZoomOutIcon from '@material-ui/icons/ZoomOutSharp'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import ReactTour from 'reactour'
import { bindActionCreators } from 'redux'

import { operations as tutorialOperations } from '../../ducks/tutorial'

const mapStateToProps = state => ({
  isTourOpen: state.tutorial.visible,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(tutorialOperations, dispatch)

const Tutorial = ({ isTourOpen, setTutorialVisibility }) => {
  const { t } = useTranslation()
  const closeTutorial = () => setTutorialVisibility(false)

  const steps = [
    {
      content: (
        <>
          <Typography gutterBottom variant="body1">
            {t('app.tutorial.step1.welcome')}
          </Typography>
          <Typography gutterBottom variant="h6">
            {t('common.project_name')}
          </Typography>
          <Typography gutterBottom variant="body1">
            {t('app.tutorial.step1.body')}
          </Typography>
        </>
      ),
      selector: '#root',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          <Typography gutterBottom variant="h6">
            {t('common.project_name')}
          </Typography>
          {t('app.tutorial.step2.body')}
        </Typography>
      ),
      selector: '#root',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step3.body')}
        </Typography>
      ),
      selector: '#interactive_editor',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step4.body')}
        </Typography>
      ),
      selector: '#editor_bar',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step5.first')} <strong>undo</strong> <RedoIcon />{' '}
          {t('app.tutorial.step5.second')} <strong>redo</strong> <UndoIcon />{' '}
          {t('app.tutorial.step5.third')}
        </Typography>
      ),
      selector: '#editor_bar_undo_redo_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step6.first')} <strong>zoom in</strong>{' '}
          <ZoomInIcon /> {t('app.tutorial.step6.second')}{' '}
          <strong>zoom out</strong> <ZoomOutIcon />{' '}
          {t('app.tutorial.step6.third')}
        </Typography>
      ),
      selector: '#editor_bar_zoom_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step7.first')} <strong>grid</strong> <GridOnIcon />{' '}
          {t('app.tutorial.step7.second')}
        </Typography>
      ),
      selector: '#editor_bar_grid_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step8.body')}
        </Typography>
      ),
      selector: '#editor_bar_editor_mode_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step9.first')} <strong>selector</strong>{' '}
          <BrushIcon /> {t('app.tutorial.step9.second')} <strong>edit</strong>{' '}
          {t('app.tutorial.step9.third')} <strong>delete</strong>{' '}
          {t('app.tutorial.step9.fourth')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_editor_select_mode_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step10.first')} <strong>nodes</strong>{' '}
          <CategoryIcon /> {t('app.tutorial.step10.second')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_editor_nodes_mode_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step11.first')} <strong>edges</strong>{' '}
          <DeviceHubIcon /> {t('app.tutorial.step11.second')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_editor_edges_mode_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step13.body')}
        </Typography>
      ),
      selector: '#editor_bar_algorithm_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step14.first')} <strong>play</strong>{' '}
          <PlayArrowIcon /> {t('app.tutorial.step14.second')}{' '}
          <strong>stop</strong> <StopIcon /> {t('app.tutorial.step14.third')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_algorithm_play_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step15.first')} <strong>first step</strong>{' '}
          <SkipPreviousIcon /> {t('app.tutorial.step15.second')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_algorithm_first_step_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step16.first')} <strong>back step</strong>{' '}
          <ChevronLeftIcon /> {t('app.tutorial.step16.second')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_algorithm_back_step_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step17.first')} <strong>next step</strong>{' '}
          <ChevronRightIcon /> {t('app.tutorial.step17.second')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_algorithm_next_step_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step18.first')} <strong>last step</strong>{' '}
          <SkipNextIcon /> {t('app.tutorial.step18.second')}
        </Typography>
      ),
      position: 'bottom',
      selector: '#editor_bar_algorithm_last_step_section',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step19.first')}{' '}
          <strong>{t('app.appbar.menu.file')}</strong>{' '}
          {t('app.tutorial.step19.second')}
        </Typography>
      ),
      selector: '#file_dropdown_menu',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step20.body')}
        </Typography>
      ),
      selector: '#google_signin_button',
    },
    {
      content: (
        <Typography gutterBottom variant="body1">
          {t('app.tutorial.step21.first')}{' '}
          <Typography gutterBottom variant="button">
            {' '}
            <strong>{t('app.appbar.menu.help')}</strong>
          </Typography>{' '}
          {t('app.tutorial.step21.second')}
        </Typography>
      ),
      selector: '#help_button',
    },
    {
      content: (
        <>
          <Typography gutterBottom variant="body1">
            <strong>{t('app.tutorial.step22.first')}</strong>
          </Typography>
          <Typography gutterBottom variant="body1">
            <em>
              {t('app.tutorial.step22.second')}{' '}
              <Typography gutterBottom variant="button">
                ✗
              </Typography>{' '}
              {t('app.tutorial.step22.third')}
            </em>
          </Typography>
        </>
      ),
      selector: '#root',
    },
  ]

  return (
    <ReactTour
      disableDotsNavigation
      disableInteraction
      isOpen={isTourOpen}
      showNavigation={false}
      startAt={0}
      steps={steps}
      onRequestClose={closeTutorial}
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tutorial)
