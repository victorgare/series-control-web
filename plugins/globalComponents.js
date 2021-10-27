import Badge from '../components/Badge'
import BaseAlert from '../components/BaseAlert'
import BaseButton from '../components/BaseButton'
import BaseCheckbox from '../components/BaseCheckbox'
import BaseDropdown from '../components/BaseDropdown'
import BaseHeader from '../components/BaseHeader'
import BaseInput from '../components/BaseInput'
import BaseNav from '../components/BaseNav'
import BasePagination from '../components/BasePagination'
import BaseProgress from '../components/BaseProgress'
import BaseSwitch from '../components/BaseSwitch'
import BaseRadio from '../components/BaseRadio'
import BaseTable from '../components/BaseTable'
import Card from '../components/Cards/Card'
import Modal from '../components/Modal'
import StatsCard from '../components/StatsCard'
import TabPane from '../components/Tabs/TabPane'
import Tabs from '../components/Tabs/Tabs'
import BaseNuxtLink from '../components/BaseNuxtLink'
// import { ElTooltip, ElPopover } from "element-plus";

const GlobalComponents = {
    install(app) {
        app.component('Badge', Badge)
        app.component('BaseAlert', BaseAlert)
        app.component('BaseButton', BaseButton)
        app.component('BaseCheckbox', BaseCheckbox)
        app.component('BaseDropdown', BaseDropdown)
        app.component('BaseHeader', BaseHeader)
        app.component('BaseInput', BaseInput)
        app.component('BaseNav', BaseNav)
        app.component('BasePagination', BasePagination)
        app.component('BaseProgress', BaseProgress)
        app.component('BaseSwitch', BaseSwitch)
        app.component('BaseRadio', BaseRadio)
        app.component('BaseTable', BaseTable)
        app.component('Card', Card)
        app.component('Modal', Modal)
        app.component('StatsCard', StatsCard)
        app.component('TabPane', TabPane)
        app.component('Tabs', Tabs)
        app.component('BaseNuxtLink', BaseNuxtLink)
        // app.use(ElTooltip);
        // app.use(ElPopover);
    },
}

export default GlobalComponents
