<template>
    <div>
        <b-row>
            <b-col cols="8">
                <h2 class="page-title">Formulario de Solicitud de Material</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-row></b-row>
                <b-row></b-row>
                <h2 class="page-title">Datos del solicitante</h2>
                <b-row>
                    <b-col cols="6" md="6">
                        <b-form-group id="input-group-dni" label-for="input-dni">
                            <b-form-input id="input-dni"  disabled>{{id_user}}
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" md="6">
                        <b-form-group id="input-group-dni" label="Tipo de Transacción:">
                            <b-form-select >
                                <b-form-select-option></b-form-select-option>
                                <b-form-select-option>Traspaso</b-form-select-option>
                                <b-form-select-option>Deshecho</b-form-select-option>
                                <b-form-select-option>Merma</b-form-select-option>
                                <b-form-select-option>Venta</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6" md="6">
                        <b-form-group id="input-group-dni" label="Almacen de origen:">
                            <b-form-select >
                                <b-form-select-option></b-form-select-option>
                                <b-form-select-option>LPZ-Murillo Periferica</b-form-select-option>
                                <b-form-select-option>SCV - Veliz</b-form-select-option>
                                <b-form-select-option>ALM - Vacio</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" md="6">
                        <b-form-group id="input-group-dni" label="Destino :">
                            <b-form-select >
                                <b-form-select-option></b-form-select-option>
                                <b-form-select-option>LPZ-Murillo Periferica</b-form-select-option>
                                <b-form-select-option>SCV - Veliz</b-form-select-option>
                                <b-form-select-option>ALM - Vacio</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" md="6">
                        <h2 class="page-title">Busca y selecciona el material</h2>
                        <b-button  variant="inverse" class="mr-xs" size="xl" >Buscar</b-button>
                        <h5 class="page-title" style="margin-top:15px">Elementos en la tabla:</h5>
                    </b-col>
                </b-row>
                <div class="table-responsive">
                    <table class="table table-hover"> 
                        <thead>
                            <tr>
                                <th id="" class="hidden-sm-down">#</th>
                                <th id="" class="hidden-sm-down">SKU</th>
                                <th id="" class="hidden-sm-down">Descripción</th>
                                <th id="" class="hidden-sm-down">Cantidad</th>
                                <th id="" class="hidden-sm-down">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <b-row>
                    <b-col>
                        <b-form-group id="input-group-dni" label="Observaciones:" label-for="input-dni">
                            <b-form-textarea id="input-dni">
                            </b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>
                <div class="mt-3"></div>
                <b-button type="submit" variant="inverse" >Enviar</b-button>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import Vue from 'vue'
import config from '../../config'
import Widget from '@/components/Widget/Widget'
import Sparklines from '../../components/Sparklines/Sparklines'

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueHtml2pdf from 'vue-html2pdf'
//import html2pdf from 'html2pdf.js'
import moment from 'moment'
moment.locale('es')
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default{
    name:'Formulario_Solicitud_Material',
    components:{
        Widget,
        Sparklines,
        DatePicker,
        VueHtml2pdf,
        vueDropzone: vue2Dropzone,
    },
    data(){
        return{
         ip: config.ip,
         user:{},
         id_user:"hhh",
        };
    },
    methods:{
       
        
    },
    computed:{

    },
    created(){   
        
        console.log("console",this.id_user)
        axios.get
    }

    
}
</script>
