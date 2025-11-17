<template>
  <div align="center">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="q-pa-none q-gutter-sm bg-white flex items-center justify-between">
            <div class="col-6 q-pa-none text-h6 text-weight-bold">
              <q-icon name="people" /> Daftar Pekerjaan Orang Tua
            </div>
            <div class="col q-pa-none">
              <q-input
                dense
                outlined
                v-model="store.params.q"
                clearable
                @update:model-value="store.getlist()"
              >
                <template v-slot:prepend>
                  <q-icon name="search" size="xs" />
                </template>
              </q-input>
            </div>
            <div class="col-auto">
              <q-btn
                icon="add"
                class="text-yellow-8"
                tooltip="Tambah Data"
                color="grey-10"
                round
                size="sm"
                @click="emits('add')"
              />
            </div>
          </div>
          <q-separator class="q-mt-xs full-width" />
          <div v-if="store.loading" class="q-pa-md">
            <q-spinner-dots color="primary" size="3em" />
          </div>
          <div v-else>
            <transition-group name="list" tag="div">
              <q-list v-for="(item, index) in store.items" :key="index" class="full-width">
                <q-item clickable v-ripple class="q-mb-sm">
                  <q-item-section top class="text-left">
                    <q-item-label lines="1">
                      Pekerjaan :
                      <q-badge color="red" outline>
                        {{ item.pekerjaan }}
                      </q-badge>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side style="width: 60px">
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        size="xs"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="emits('hapus', item)"
                      />
                      <q-btn size="xs" flat dense round icon="edit" @click="emits('edit', item)" />
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator class="q-mt-xs full-width" />
              </q-list>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMpekerjaanStore } from 'src/stores/master/pekerjaan'

const store = useMpekerjaanStore()
const emits = defineEmits(['add', 'edit', 'hapus'])
</script>

<style></style>
