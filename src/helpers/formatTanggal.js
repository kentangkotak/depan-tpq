export function formatTanggal(tanggal, english = false, includeTime = false) {
  if (!tanggal) return '-'

  // konversi ke Date
  const date = new Date(tanggal)
  if (isNaN(date)) return '-'

  const bulanID = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  const bulanEN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const bulan = english ? bulanEN[date.getMonth()] : bulanID[date.getMonth()]
  const hari = date.getDate()
  const tahun = date.getFullYear()

  // Format waktu opsional (HH:mm:ss)
  let hasil = `${hari} ${bulan} ${tahun}`

  if (includeTime) {
    const jam = String(date.getHours()).padStart(2, '0')
    const menit = String(date.getMinutes()).padStart(2, '0')
    const detik = String(date.getSeconds()).padStart(2, '0')
    hasil += ` ${jam}:${menit}:${detik}`
  }

  return hasil
}
