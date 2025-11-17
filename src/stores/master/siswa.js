import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifError, notifSuccess } from 'src/modules/notifs'

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
      program: '',
    },
    tgllahirdisplay: date.formatDate(new Date(), 'DD-MM-YYYY'),
    isError: false,
    uploadedFiles: [],
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
    // simpan() {
    //   this.loading = true
    //   this.isError = false
    //   return new Promise((resolve, reject) => {
    //     api
    //       .post('/master/siswa/simpan', this.form)
    //       .then(({ data }) => {
    //         const newData = data?.data
    //         if (this.form.id === '') {
    //           this.items.unshift(newData)
    //         } else {
    //           this.items = this.items.map((item) => {
    //             if (item.id === newData.id) {
    //               return newData
    //             }
    //             return item
    //           })
    //         }
    //         this.initReset()
    //         notifSuccess(data?.message)
    //         this.loading = false
    //         resolve(data)
    //       })
    //       .catch((err) => {
    //         this.loading = false
    //         reject(err)
    //       })
    //   })
    // },
    async simpan() {
      this.loading = true
      this.isError = false
      try {
        const formData = new FormData()

        for (const key in this.form) {
          formData.append(key, this.form[key])
        }

        // Tambah file dari uploader
        if (this.uploadedFiles.length > 0) {
          formData.append('foto', this.uploadedFiles[0]) // ambil file pertama
        }

        const { data } = await api.post('/master/siswa/simpan', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        const newData = data.data
        if (!this.form.id) {
          this.items.unshift(newData)
        } else {
          this.items = this.items.map((i) => (i.id === newData.id ? newData : i))
        }
        this.initReset()
        notifSuccess(data.message)
      } catch (err) {
        this.isError = true
        notifError(err.response?.data?.message || 'Gagal menyimpan data')
        throw err
      } finally {
        this.loading = false
      }
    },
    initReset() {
      this.form.id = ''
      this.form.nama = ''
      this.form.nis = ''
      ;((this.form.namalengkap = ''),
        (this.form.namapanggilan = ''),
        (this.form.tempatlahir = ''),
        (this.form.tgllahir = date.formatDate(new Date(), 'YYYY-MM-DD')),
        (this.form.kelamin = ''),
        (this.form.anakke = ''),
        (this.form.tinggibadan = ''),
        (this.form.beratbadan = ''),
        (this.form.hobi = ''),
        (this.form.namaayah = ''),
        (this.form.pekerjaanayah = ''),
        (this.form.tempatlahirayah = ''),
        (this.form.tgllahirayah = date.formatDate(new Date(), 'YYYY-MM-DD')),
        (this.form.pendidikanayah = ''),
        (this.form.nohpayah = ''),
        (this.form.alamatayah = ''),
        (this.form.namaibu = ''),
        (this.form.pekerjaanibu = ''),
        (this.form.tempatlahiribu = ''),
        (this.form.tgllahiribu = date.formatDate(new Date(), 'YYYY-MM-DD')),
        (this.form.pendidikanibu = ''),
        (this.form.nohpibu = ''),
        (this.form.alamatibu = ''),
        (this.form.program = ''))
    },
  },
})
