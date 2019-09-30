/**
 * Import globals.
 */
import React from 'react'

/**
 * Import UI framework modules.
 */
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

/**
 * Import components.
 */
import arrowRight from './images/arrowRight.svg'
import Arrow from './atoms/Arrow'
import Highlighted from './atoms/Highlighted'
import Selected from './atoms/Selected'

/**
 * Component.
 */
const DistanceEntry = ({ distance, isHighlighted, isSelected, name }) => (
  <Container style={{ display: 'flex', fontSize: '16px', padding: '15px' }}>
    <Box style={{ marginLeft: '-10px' }} width={0.5 / 3}>
      {isSelected ? <Selected /> : isHighlighted ? <Highlighted /> : ''}
    </Box>
    <Box width={1.5 / 3}>
      <span>{name}</span>
      <Arrow alt="" src={arrowRight} />
    </Box>
    <Box style={{ textAlign: 'center' }} width={1 / 3}>
      {distance === Infinity ? '∞' : distance}
    </Box>
  </Container>
)

export default DistanceEntry
