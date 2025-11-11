<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 items-center">
          <div class="row">
            <div class="col-1">
              <q-btn
                icon="arrow_back"
                @click="emits('back')"
                class="bg-black text-yellow-8"
                size="sm"
                round
              />
            </div>
            <div class="col-11 text-center">
              <span class="text-weight-bold underline text-h6 q-ml-sm q-mt-sm text-center"
                >TAMBAH SISWA</span
              >
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-form @submit="onSubmit">
        <q-card-section style="max-height: 100vh" class="scroll">
          <div class="text-weight-bold" style="text-decoration: underline">
            A. IDENTITAS PENDAFTAR
          </div>
          <br />
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="store.form.namalengkap"
                round
                dense
                outlined
                label="Nama Lengkap"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="store.form.namapanggilan"
                round
                dense
                outlined
                label="Nama Panggilan"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="store.form.tempatlahir"
                round
                dense
                outlined
                label="Tempat Lahir"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-6">
              <date-input
                v-model="store.form.tgllahir"
                label="Tanggal Lahir"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-select
                v-model="store.form.kelamin"
                :options="['Laki-laki', 'Perempuan']"
                round
                dense
                outlined
                label="Kelamin"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.anakke"
                type="number"
                round
                dense
                outlined
                label="Anak Keberapa"
                :rules="[
                  (val) => !!val || 'Wajib Diisi...!!!',
                  (val) => val > 0 || 'Harus lebih besar dari 0',
                ]"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.tinggibadan"
                type="number"
                round
                dense
                outlined
                label="Tinggi Badan"
                :rules="[
                  (val) => !!val || 'Wajib Diisi...!!!',
                  (val) => val > 0 || 'Harus lebih besar dari 0',
                ]"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.beratbadan"
                type="number"
                round
                dense
                outlined
                label="Berat Badan"
                :rules="[
                  (val) => !!val || 'Wajib Diisi...!!!',
                  (val) => val > 0 || 'Harus lebih besar dari 0',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="store.form.hobi"
                round
                dense
                outlined
                label="Hobi"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
          </div>
          <div class="text-weight-bold" style="text-decoration: underline">
            B. IDENTITAS ORANG TUA/WALI
          </div>
          <br />
          <div class="row q-col-gutter-sm">
            <div class="col-3">
              <q-input
                v-model="store.form.namaayah"
                round
                dense
                outlined
                label="Nama Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-select
                v-model="store.form.pekerjaanayah"
                :options="pekerjaan"
                option-label="pekerjaan"
                option-value="id"
                emit-value
                map-options
                round
                dense
                outlined
                label="Pekerjaan Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.tempatlahirayah"
                round
                dense
                outlined
                label="Tempat Lahir Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <date-input
                v-model="store.form.tgllahirayah"
                label="Tanggal Lahir Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-select
                v-model="store.form.pendidikanayah"
                :options="pendidikan"
                round
                dense
                outlined
                label="Pendidikan Terakhir Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.nohpayah"
                round
                dense
                outlined
                label="No. HP Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="store.form.alamatayah"
                round
                dense
                outlined
                label="Alamat Ayah"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-3">
              <q-input
                v-model="store.form.namaibu"
                round
                dense
                outlined
                label="Nama Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-select
                v-model="store.form.pekerjaanibu"
                :options="pekerjaan"
                option-label="pekerjaan"
                option-value="id"
                emit-value
                map-options
                round
                dense
                outlined
                label="Pekerjaan Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.tempatlahiribu"
                round
                dense
                outlined
                label="Tempat Lahir Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <date-input
                v-model="store.form.tgllahiribu"
                label="Tanggal Lahir Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-select
                v-model="store.form.pendidikanibu"
                :options="pendidikan"
                round
                dense
                outlined
                label="Pendidikan Terakhir Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-3">
              <q-input
                v-model="store.form.nohpibu"
                round
                dense
                outlined
                label="No. HP Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="store.form.alamatibu"
                round
                dense
                outlined
                label="Alamat Ibu"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
              />
            </div>
          </div>
          <!-- <div class="text-weight-bold" style="text-decoration: underline">
            C. Program Yang Diambil
          </div>
          <br /> -->
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-span class="text-bold">Jenjang Pendidikan</q-span>
              <q-radio
                v-for="opt in ['TPQ', 'Pasca TPQ', 'Private']"
                :key="opt"
                v-model="store.form.program"
                :val="opt"
                :label="opt.charAt(0).toUpperCase() + opt.slice(1)"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
              />
            </div>
            <div class="col-6 flex justify-end">
              <q-uploader
                ref="uploaderRef"
                style="max-width: 300px"
                label="Masukkan Foto Siswa"
                max-file-size="524288"
                accept=".jpg, .jpeg"
                @added="onFileAdded"
                @rejected="onRejected"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn label="Simpan" color="blue-14" type="submit" :loading="store.loading" glossy />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { useMsiswaStore } from 'src/stores/master/siswa'
import DateInput from 'src/components/DateInput.vue'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const store = useMsiswaStore()
const emits = defineEmits(['back'])
const pendidikan = ['Tidak Sekolah', 'SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']

const $q = useQuasar()

const uploaderRef = ref(null)

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  pekerjaan: {
    type: Array,
    default: () => [],
  },
})

function onRejected() {
  // Notify plugin needs to be installed
  // https://v2.quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: 'negative',
    message: `File Harus Berformat jpg atau jpeg dan Maksimal 512 Kb`,
  })
}

if (props.data) {
  store.form.id = props.data?.id
  store.form.nama = props.data?.name
  store.form.nik = props.data?.nik
}

function onFileAdded(files) {
  store.uploadedFiles = files
}

function onSubmit() {
  store.simpan()
}
</script>
