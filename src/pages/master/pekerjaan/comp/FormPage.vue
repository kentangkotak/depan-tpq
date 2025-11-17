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
                >TAMBAH PEKERJAAN ORANG TUA</span
              >
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-form @submit="onSubmit">
        <q-card-section style="max-height: 100vh" class="scroll">
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="store.form.nama"
                round
                dense
                outlined
                label="Nama Pekerjaan Orang Tua"
                :rules="[(val) => !!val || 'Wajib Diisi...!!!']"
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
import { useMpekerjaanStore } from 'src/stores/master/pekerjaan'

const store = useMpekerjaanStore()
const emits = defineEmits(['back'])

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

if (props.data) {
  store.form.id = props.data?.id
  store.form.nama = props.data?.pekerjaan
}
function onSubmit() {
  store.simpan()
}
</script>
