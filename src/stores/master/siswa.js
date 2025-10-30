import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/notifs'

export const useMsiswaStore = defineStore('msiswa', {
  state: () => ({
    items: [],
    loading: false,
    dialog: false,
    params: {
      q: '',
    },
    form: {
      id: '',
      nis: '',
      namalengkap: '',
      namapanggilan: '',
      tempatlahir: '',
      tgllahir: date.formatDate(new Date(), 'YYYY-MM-DD'),
      kelamin: '',
      anakke: '',
      tinggibadan: '',
      beratbadan: '',
      hobi: '',
      namaayah: '',
      pekerjaanayah: '',
      tempatlahirayah: '',
      tgllahirayah: date.formatDate(new Date(), 'YYYY-MM-DD'),
      pendidikanayah: '',
      nohpayah: '',
      alamatayah: '',
      namaibu: '',
      pekerjaanibu: '',
      tempatlahiribu: '',
      tgllahiribu: date.formatDate(new Date(), 'YYYY-MM-DD'),
      pendidikanibu: '',
      nohpibu: '',
      alamatibu: '',
    },
    tgllahirdisplay: date.formatDate(new Date(), 'DD-MM-YYYY'),
    isError: false,
  }),
  actions: {
    getlist() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('/master/siswa/get-siswa', params)
          .then((response) => {
            this.items = response.data?.data
            this.loading = false
            resolve(response.data)
          })
          .catch((error) => {
            this.loading = false
            reject(error)
          })
      })
    },
    simpan() {
      this.loading = true
      this.isError = false
      return new Promise((resolve, reject) => {
        api
          .post('/master/siswa/simpan', this.form)
          .then(({ data }) => {
            const newData = data?.data
            if (this.form.id === '') {
              this.items.unshift(newData)
            } else {
              this.items = this.items.map((item) => {
                if (item.id === newData.id) {
                  return newData
                }
                return item
              })
            }
            this.initReset()
            notifSuccess(data?.message)
            this.loading = false
            resolve(data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    initReset() {
      this.form.id = ''
      this.form.nama = ''
      this.form.nik = ''
    },
  },
})
