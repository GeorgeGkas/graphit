import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { Wrapper } from './styles'
import arrowRight from './images/arrow_right.svg'
import Arrow from './atoms/Arrow'
import Selected from './atoms/Selected'
import Highlighted from './atoms/Highlighted'

const Presentation = ({ isSelected, isHighlighted, name, distance }) => (
  <Wrapper>
    <Container style={{ display: 'flex', padding: '15px' }}>
      <Box width={0.5 / 3} style={{ marginLeft: '-10px' }}>
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
  </Wrapper>
)

export default Presentation
