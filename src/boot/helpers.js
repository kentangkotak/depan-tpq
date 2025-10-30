import { formatTanggal } from 'src/helpers/formatTanggal'

export default ({ app }) => {
  app.config.globalProperties.$formatTanggal = formatTanggal
}
