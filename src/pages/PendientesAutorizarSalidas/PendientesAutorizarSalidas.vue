<template>
    <div>
        <b-row>
            <b-cols cols="8">
                <h2 class="page-title">Vuela:<span class="fw-semi-bold">Sistema de Inventarios</span></h2>
            </b-cols>
        </b-row>
        <b-row>
            <b-cols cols="8">
                <h3 class="page-title">Formulario de Autorización de Salidas</h3>
            </b-cols>
        </b-row>
        <div class="text-right">
            <h3 class="page-title"><span class="fw-semi-bold">Nombre de usuario</span></h3>
        </div>
        <b-row>
            <b-cols cols="2">
                <b-form-input style="text-align:center" placeholder="Almacen" disabled></b-form-input>
            </b-cols>
            <b-cols cols="8">
                <b-form-select v-model="selected" :options="options" ></b-form-select>
            </b-cols>
        </b-row>
        <b-row >
            <b-cols cols="8" >
                <h4 class="page-title" style="margin-top:15px">Solicitudes pendientes de autorizar</h4>
            </b-cols>
        </b-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>