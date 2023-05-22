import PropTypes from 'prop-types'
import { auth } from '../config/firebase-config'



function Header({ text, bgColor, textColor }) {
    const headerStyles= {
        backgroundColor: bgColor, 
        color: textColor
    }

  return (
    <header style={headerStyles}>
      <div className="container">
      <div to='/'><h2>
          {text}
          </h2>
          </div>
      </div>
      <span className='positionFixed'>{auth.currentUser === null ? 'signed out' : `signed in as ${auth.currentUser.email}`}</span>
    </header>
  )
}

Header.defaultProps = {
    text: 'Feedback UI',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95'
}

Header.propTypes = {
    text : PropTypes.string,
    bgColor : PropTypes.string,
    textColor: PropTypes.string
}

export default Header

