import defaultTheme from '../constants/themes/defaultTheme.json'
import pinkTheme from '../constants/themes/pinkTheme.json'

const themeReducer = (state = defaultTheme, action) => {
  switch (action.type) {
    case 'SET_THEME':
      switch (action.payload) {
        case 'default':
          return defaultTheme
        case 'pink':
          return pinkTheme
      }
      break
    default:
      return state
  }
}

export default themeReducer
