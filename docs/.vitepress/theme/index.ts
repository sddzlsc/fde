import DefaultTheme from 'vitepress/theme'
import SelfCheck from './SelfCheck.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SelfCheck', SelfCheck)
  }
}
