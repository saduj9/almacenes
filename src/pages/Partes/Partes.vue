<template>
<div class="partes-page">
    <b-row>
    <b-col cols="8">
      <h2 class="page-title">Orden de de <span class="fw-semi-bold">compra</span></h2>
    </b-col>
    <!-- <b-col cols="4" v-if="showTable">
       <b-form class="d-sm-down-none ml-5" >
        <b-form-group>
          <b-input-group >
            <template v-slot:prepend>
              <b-button class="btn-buscar" @click="searchData"> 
                <b-input-group-text class="bordes"><i class='fi flaticon-search-2'/></b-input-group-text>
              </b-button>
            </template>
             <b-form-select 
              id="inline-form-custom-select-pref"
              class="sm"
              :options="[
              {text: 'Buscar por :', value: null},
              { text: 'Asunto', value: 'asunto' }, 
              {text: 'Codigo',value: 'exp'},
              {text: 'Todo',value: 'todo'}]"
              v-model="typeInput"
              :value="null"
            ></b-form-select> 
            <b-form-input id="search-input" placeholder="Buscar" v-model="searchInput" v-if="typeInput!='todo'"  v-on:keyup.enter="searchData"/>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-col> -->
  </b-row>
    <b-row>
      <b-col>
        <Widget
          customHeader
        >
        <b-row v-show="showTable">
          <b-col cols="10">
            <h5 class="page-title">Lista de - <span class="fw-semi-bold">Expedientes</span></h5>
          </b-col>
          <b-col cols="2" v-show="expedientes.length != 0">
            <b-row>
              <b-col class="text-right pr-3 mt-2">
                <p>Cantidad:</p>
              </b-col>
              <b-col class="text-left pl-0">
                <b-form-group id="input-group-perpage"  label-for="input-perpage">
                <b-form-select
                  @change="loadPerPage(perpage)"
                  id="input-perpage"
                  v-model="perpage"
                  :options="optionsPerPage"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
           
        <h5 v-show="!showTable" class="page-title">Generar <span class="fw-semi-bold">orden de compra</span></h5>
        <div class="data-loader">
          <i class="la la-spinner la-spin" v-if="loadingTable"></i>
        </div>
        <div v-show="showTable">
          <p class="text-center" v-if="expedientes.length == 0">No hay registros</p>
          <div class="table-resposive" >
            <table class="table table-hover" v-if="expedientes.length != 0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>Asunto</th>
                  <th class="hidden-sm-down">N° de Registro</th>
                  <th class="hidden-sm-down">Fecha</th>
                  <th class="hidden-sm-down">Documento</th>
                  <th class="hidden-sm-down">Estado</th>
                  <th class="hidden-sm-down">Editar</th>
                  <th class="hidden-sm-down">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in expedientes" :key="row.id_expediente">
                  <td>{{row.id_expediente}}</td>
                  <td class="width-150">
                    {{row.c_asunto_exp}}
                  </td>
                  <td>
                    <p class="mb-0">
                      <small>
                        <span class="fw-semi-bold">Codigo:</span>
                        <span class="text-muted">&nbsp; {{row.c_cod_exp}}</span>
                      </small>
                    </p>
                    <p>
                      <small>
                        <span class="fw-semi-bold">Serie:</span>
                        <span class="text-muted">&nbsp; {{row.id_tipo_doc_exp}}</span>
                      </small>
                    </p>
                  </td>
                  <td class="text-semi-muted">
                    {{format_date(row.d_tramite_exp)}}
                  </td>
                  <td class="text-semi-muted">
                    <div style="width: 150px;white-space: normal;overflow: hidden;text-overflow: Ellipsis"
                     v-for="file in row.arc_exp" :key="file.id_archivos_exp">
                        <a target="_blank" :href="ip+'/public/'+file.c_archivo_exp">
                        {{file.c_archivo_exp}}</a>
                      </div>
                  </td>
                  <td class="width-150">
                    <b-badge variant="warning" pill>Pendiente</b-badge>
                  </td>
                  <td>
                    <b-button variant="gray" size="sm" @click="openModalEdit(row.id_expediente,row)">
                      <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                    </b-button>
                     <b-modal :id="'modal-edit-'+row.id_expediente" title="Editar Expediente" header-bg-variant="dark" body-bg-variant="light" 
                     header-text-variant="white" :hide-footer="true">
                      
                      <b-form v-if="show">
                        
                        <b-form-group id="input-group-codeDoc" label="Codigo del documento:" label-for="input-codeDoc">
                        <b-form-input
                          id="input-codeDoc"
                          v-model="form.codeDoc"
                          placeholder="Ingrese el codigo del documento"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-hrc" label="Nota:" label-for="input-hrc">
                        <b-form-input
                          id="input-hrc"
                          v-model="form.hrcDoc"
                          placeholder="Ingrese el codigo HRC"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-6" label="Tipo de Documento:" label-for="input-6">
                          <b-form-select
                            id="input-6"
                            v-model="form.tipoDoc"
                            :options="typeDoc"
                            ></b-form-select>
                        </b-form-group>    

                        <b-form-group id="input-group-5" label="Asunto:" label-for="input-5">
                          <b-form-input
                            id="input-5"
                            v-model="form.issueDoc"
                            placeholder="Ingrese el asunto del documento"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-3" label="Fecha del documento:" label-for="input-3">
                          <div>
                            <date-picker v-model="form.timeDoc" valueType="format" placeholder="Seleccione una fecha">
                            </date-picker>
                          </div>
                        </b-form-group>

                      </b-form>
                      <div class="text-right">
                        <b-button v-if="!loadingModal" variant="secondary" @click="hideModalEdit(row.id_expediente);">Cancelar</b-button>
                        <b-button class="ml-1" v-if="!loadingModal" variant="info" @click="editRow(row.id_expediente);">Editar</b-button>
                        <div class="data-loader">
                          <i class="la la-spinner la-spin" v-if="loadingModal"></i>
                        </div>
                      </div>
                      
                    </b-modal>  
                  </td>
                  <td  style="text-muted">

                    <!-- <b-form-checkbox :checked="row.id_expediente" @change="openModalDelete(row.id_expediente)" name="check-button" switch>
                    </b-form-checkbox> -->

                    <b-button variant="danger" size="sm" @click="openModalDelete(row.id_expediente)">
                      <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                    <b-modal :id="'modal-delete-'+row.id_expediente" title="Eliminar Expediente" header-bg-variant="dark" body-bg-variant="light"
                    header-text-variant="white" :hide-footer="true">
                    ¿Desea enviar el expediente al historial? <br>
                    <div class="text-right">
                      <b-button v-if="!loadingModal" variant="secondary"  @click="hideModalDelete(row.id_expediente);">No</b-button>
                      <b-button v-if="!loadingModal" class="ml-1" variant="danger" @click="deleteRow(row.id_expediente);">Si</b-button>
                       <div class="data-loader">
                        <i class="la la-spinner la-spin" v-if="loadingModal"></i>
                      </div>
                    </div>
                  </b-modal>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <!--<b-button variant="default" class="mr-3" size="sm" >Send to...</b-button>-->
              <b-button variant="inverse" class="mr-xs" size="sm" @click="register">Agregar</b-button>
            </div>
          </div>
          <div v-show="expedientes.length != 0" class="mt-3">
            <!-- <h6 class="text-right">Pagi</h6> -->
            <b-pagination v-show="showTable" v-model="page" :total-rows="allRows" 
            :per-page="perpage" align="right" @input =" loadPage(page)" first-number
            last-number>
            </b-pagination>
          </div>
        </div>
        <div v-show="showRegister" >
            <!-- <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show"> -->
             <b-form @submit.prevent="exportToPDF" @reset="onReset" v-if="show">
               <!-- <b-row>
                 <b-col cols="8">
                  <b-form-group id="input-group-dni" label="DNI O RUC:" label-for="input-dni">
                  <b-form-input
                  id="input-dni"
                  v-model="form.dniDoc"
                  placeholder="Ingrese el DNI O RUC"
                  ></b-form-input>
                  </b-form-group>
                 </b-col>
                 <b-col cols="2" style="padding:0px;">
                   <div class="data-loader"  v-if="loadingDni">
                      <i class="la la-spinner la-spin"></i>
                    </div>
                    <b-button v-if="!loadingDni" variant="inverse" class="mr-xs" style="margin-top:28px" size="xl" @click="getAdministrado">
                    Obtener</b-button>
                 </b-col>
                 <b-col cols="2"  style="padding-left:0px;">
                  <b-form-group id="input-group-admincode" label="Codigo administrado" label-for="input-admincode">
                  <b-form-input
                  id="input-admincode"
                  v-model="form.adminCode"
                  placeholder="" disabled
                  ></b-form-input>
                </b-form-group>
                 </b-col>
               </b-row> -->
                
               <b-row>
                 <b-col cols="8" md="8">
                  <b-form-group id="input-group-dni" label="SKU Producto:" label-for="input-dni">
                  <b-form-input
                  id="input-dni"
                  v-model="formOrden.producto"
                  placeholder="Ingrese SKU del producto"
                  ></b-form-input>
                  </b-form-group>
                 </b-col>
                 <b-col cols="2" md="1" style="padding:0px;">
                   <div class="data-loader"  v-if="loadingDni">
                      <i class="la la-spinner la-spin"></i>
                    </div>
                    <b-button v-if="!loadingDni" variant="inverse" class="mr-xs" style="margin-top:28px" size="xl" @click="getAdministrado">
                    Buscar</b-button>
                 </b-col>
                 <b-col cols="12" md="3">
                  <b-form-group id="input-group-admincode" label="Nombre Producto" label-for="input-admincode">
                  <b-form-input
                  id="input-admincode"
                  v-model="form.adminCode"
                  placeholder="" disabled
                  ></b-form-input>
                </b-form-group>
                 </b-col>
               </b-row>

              <b-form-group id="input-group-6" label="Proveedor:" label-for="input-6">
                   <b-form-select
                    id="input-6"
                    v-model="formOrden.proveedor"
                    :options="proveedorList"
                    
                    ></b-form-select>
                </b-form-group>    

                <b-form-group id="input-group-6" label="Facturar a:" label-for="input-6">
                   <b-form-select
                    id="input-6"
                    v-model="formOrden.facturar"
                    :options="facturarList"
                    
                    ></b-form-select>
                </b-form-group>    

               <b-form-group id="input-group-2" label="Descripcion :" label-for="input-2">
                  <b-form-textarea
                    id="input-2"
                    v-model="formOrden.descripcion"
                    placeholder=""
                    rows="4"
                    max-rows="5"
                  ></b-form-textarea>
                </b-form-group>

                <b-form-group id="input-group-2" label="Proyecto :" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="formOrden.proyecto"
                    placeholder=""
                  ></b-form-input>
                </b-form-group>

                <!-- <b-form-group id="input-group-2" label="Codigo del documento:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.codeDoc"
                    placeholder="Ingrese el codigo del documento"
                  ></b-form-input>
                </b-form-group> -->

                <b-form-group id="input-group-2" label="Nota:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="formOrden.nota"
                    placeholder=""
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-6" label="Área solicitante:" label-for="input-6">
                   <b-form-select
                    id="input-6"
                    v-model="formOrden.origen"
                    :options="origenList"
                    
                    ></b-form-select>
                </b-form-group>    

                <b-row>
                  <b-col cols="12" md="3">
                     <b-form-group id="input-group-3" label="Fecha:" label-for="input-3">
                    <div>
                    <date-picker v-model="formOrden.fecha" valueType="format" placeholder="Seleccione una fecha">
                    </date-picker>
                  </div>
                  </b-form-group>
                  </b-col>
                  <b-col cols="12" md="3">
                    <b-form-group id="input-group-6" label="Forma de pago:" label-for="input-6">
                   <b-form-select
                    id="input-6"
                    v-model="form.tipoDoc"
                    :options="pagoList"
                    ></b-form-select>
                </b-form-group>    
                  </b-col>
                  <b-col cols="12" md="3">
                    <b-form-group id="input-group-6" label="Moneda :" label-for="input-6">
                   <b-form-select
                    id="input-6"
                    v-model="form.tipoDoc"
                    :options="monedaList"
                    ></b-form-select>
                </b-form-group>    
                  </b-col>

                  <b-col cols="12" md="3">
                    <b-form-group id="input-group-6" label="Condiciones de entrega :" label-for="input-6">
                   <b-form-select
                    id="input-6"
                    v-model="form.tipoDoc"
                    :options="entregaList"
                    ></b-form-select>
                </b-form-group>    
                  </b-col>
                </b-row>
               

                <!-- <b-form-group id="input-group-nro" label="Número de Documento:" label-for="input-nro">
                   <b-form-input
                    id="input-nro"
                    v-model="form.nroDoc"
                    placeholder="Ingrese el nro de documento"
                    
                    ></b-form-input>
                </b-form-group>    
              
                <b-form-group id="input-group-5" label="Asunto:" label-for="input-5">
                  <b-form-input
                    id="input-5"
                    v-model="form.issueDoc"
                    placeholder="Ingrese el asunto del documento"
                    
                  ></b-form-input>
                </b-form-group> -->
                <!-- <b-form-group id="input-group-3" label="Fecha del orden:" label-for="input-3">
                  <div>
                    <date-picker v-model="form.timeDoc" valueType="format" placeholder="Seleccione una fecha">
                    </date-picker>
                  </div>
                </b-form-group> -->
                <!-- <b-form-group id="input-group-4" label="Carga de documento:" label-for="input-4">
                  <div class="text-right">
                    <b-button @click="removeAllFiles" variant="danger">Quitar todo</b-button>
                    <input type="file" @change="onFileSelected"> 
                    <vue-dropzone ref="dropzoneCreate" id="dropzoneCreate" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
                  </div>
                </b-form-group> -->
                <div class="mt-3"></div>
                <b-button type="submit" variant="inverse" v-if="!loadingForm">Enviar</b-button>
                <b-button type="reset" variant="default" v-if="!loadingForm">cancelar</b-button>
                <div class="data-loader">
                  <i class="la la-spinner la-spin" v-if="loadingForm"></i>
                </div>
              </b-form>
        </div>
          
        </Widget>
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
import html2pdf from 'html2pdf.js'
import moment from 'moment'
moment.locale('es')
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default {
  name: 'Partes',
  components: {
    Widget,
    Sparklines,
    DatePicker,
    VueHtml2pdf,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      ip: config.ip,
      user:{},
      id_user:null,
      page: 1,
      perpage: 10,
      allRows: 0,
      selectedFile: null,
      loadingDni: false,
      loadingTable: true,
      showTable: false,
      showRegister: true,
      showSearch: false,
      loadingForm: false,
      loadingModal: false,
      expedientes: [],
      typeDoc:[{text:'La Paz Murillo',value:1},{text:'Almacen 2',value:2}],
      proveedorList:[{text:'La Paz Murillo',value:1},{text:'Almacen 2',value:2}],
      facturarList:[{text:'DigitalWork SA',value:1}],
      origenList:[{text:'SANTA CRUZ',value:1}],
      pagoList:[{text:'Efectivo',value:1},{text:'Credito',value:2}],
      monedaList:[{text:'Bolivianos',value:1},{text:'Dolares',value:2}],
      entregaList:[{text:'Presencial',value:1},{text:'Virtual',value:2}],
      typeInput: null,
      searchInput: '',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 500,
        maxFiles: 4,
        acceptedFiles:".pdf, .txt, .jpg, .png, .docx, .doc, .xls, .xlsx, .jpeg, .ppt, .pptx, .dwg, .dxf",
        headers: { "My-Awesome-Header": "header value" }
      },
      formOrden: {
        producto:null,
        proveedor: null,
        facturar: null,
        descripcion: null,
        proyecto: null,
        nota: null,
        origen: null,
        fecha: null,
        pago: null,
        moneda: null
      },
      form: {
        nameDoc: null,
        nameAdmin: '',
        dniDoc: null,
        adminCode: '',
        codeDoc: null,
        hrcDoc: null,
        timeDoc: null,
        tipoDoc: null,
        nroDoc: null,
        issueDoc: null,
        files: []
      },
      formSearch: {
        searchInput: null,
        typeInput: null
      },
      htmlToPdfOptions: {
          margin: 0,
      
          filename: `hehehe.pdf`,
      
          image: {
              type: 'jpeg', 
              quality: 0.98
          },
      
          enableLinks: false,
      
          html2canvas: {
              scale: 1,
              useCORS: true
          },
      
          jsPDF: {
              unit: 'in',
              format: 'a4',
              orientation: 'portrait'
          }
      },
      show: true, 
      optionsPerPage: [
        {text: '10',value: 10},
        {text: '20', value: 20},
        {text: '30',value: 30}
      ],
      tiposDoc: [
        { text: 'Seleccionar', value: null },
        { text: 'Carta', value: 1 },
        { text: 'Escritos', value: 2 },  
        { text: 'Proyecto', value: 3 }, 
        { text: 'Otros', value: 4 }
      ],
    };
  },
  methods: {
    afterComplete(file) {
      // console.log(file);
      this.form.files.push(file);
    },
    onFileSelected(event){
      // console.log(event);
      this.form.files.push(event.target.files[0]);
      // this.selectedFile = event.target.files[0];
    },
    format_date(value){
      if (value) {
        return moment(String(value)).format('L')
      }
    },
    format_file(value){
      if(value){
        return value.c_archivo_exp
      }
    },
    searchData(){
      if(this.typeInput === "todo"){
        this.load();
      }
      else if(this.searchInput ==null || this.searchInput == "" ||
      this.typeInput == null || this.typeInput == ""){
        this.$toasted.error('Ingrese los campos de búsqueda', {
          duration: 1500,
          position: 'top-center'
        });
      }
      else{
        this.loadingTable = true;
        this.showTable = false;
        axios.post(config.hostname+'expediente/buscar_expediente',
        {
          "search": this.searchInput,
          "origen": this.typeInput,
          "id_area_trabajo":1,
          "page":1,
          "perpage":this.perpage
        })
        .then( (response) =>{
          if(response.data.data.length == 0){
            this.$toasted.error('No se encontraron resultados', {
              duration: 1500,
              position: 'top-center'
            });
            this.loadingTable = false;
            this.showTable = true;
          }
          else{
            this.$toasted.success('Resultados', {
              duration: 1500,
              position: 'top-center'
            });
            this.expedientes = response.data.data;
            this.allRows = Number(response.data.total);
            this.loadingTable = false;
            this.showTable = true;
            this.formSearch.typeInput = this.typeInput;
            this.formSearch.searchInput = this.searchInput;
            this.showSearch = true;
          }
          
        })
        .catch( (error) =>{
          console.log(error);
        });
      }
    },
    load(){
      this.loadingTable = true;
      this.showTable = false;
      axios.get(config.hostname+'expediente/obtener_expediente_area/1/'+this.page+'/'+this.perpage+'/'+this.id_user)
      .then( (response) =>{
        this.loadingTable = false;
        this.showTable = true;
        this.expedientes = response.data.data;
        this.allRows = Number(response.data.total);
        this.showSearch = false;
      })
      .catch( (error) =>{
        this.loadingTable = false;
        this.showTable = true;
        console.log(error);
      });
    },
    exportToPDF () {
				html2pdf(this.$refs.document, {
					margin: 1,
					filename: 'document.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
				})
			},
    loadPerPage(perpage){
      if(this.showSearch == true){
        this.page = 1;
        axios.post(config.hostname+'expediente/buscar_expediente',
        {
          "search": this.formSearch.searchInput,
          "origen": this.formSearch.typeInput,
          "id_area_trabajo":1,
          "page":this.page,
          "perpage":perpage
        })
        .then( (response) =>{
          if(response.data.data.length == 0){
            this.$toasted.error('No se encontraron resultados', {
              duration: 1500,
              position: 'top-center'
            });
          }
          else{
            setTimeout(function(){document.body.scrollTop = 0; }, 50);
            this.expedientes = response.data.data;
            this.allRows = Number(response.data.total);
          }
        })
        .catch( (error) =>{
          console.log(error);
        });
      }else{
        this.page = 1;
        axios.get(config.hostname+'expediente/obtener_expediente_area/1/1/'+perpage+'/'+this.id_user)
        .then( (response) =>{
          this.expedientes = response.data.data;
        })
        .catch( (error) =>{
          console.log(error);
        });
      }
    },
    loadPage(page){
      if(this.showSearch == true){
        axios.post(config.hostname+'expediente/buscar_expediente',
        {
          "search": this.formSearch.searchInput,
          "origen": this.formSearch.typeInput,
          "id_area_trabajo":1,
          "page":page,
          "perpage":this.perpage
        })
        .then( (response) =>{
          if(response.data.data.length == 0){
            this.$toasted.error('No se encontraron resultados', {
              duration: 1500,
              position: 'top-center'
            });
          }
          else{
            setTimeout(function(){document.body.scrollTop = 0; }, 50);
            this.expedientes = response.data.data;
            this.allRows = Number(response.data.total);
          }
        })
        .catch( (error) =>{
          console.log(error);
        });
      }else{
        axios.get(config.hostname+'expediente/obtener_expediente_area/1/'+page+'/'+this.perpage+'/'+this.id_user)
        .then( (response) =>{
          setTimeout(function(){document.body.scrollTop = 0; }, 50);
          this.expedientes = response.data.data;
          this.allRows = Number(response.data.total);
        })
        .catch( (error) =>{
          console.log(error);
        });
      }
    },
    removeAllFiles() {
      this.form.files = [];
      this.$refs.dropzoneCreate.removeAllFiles();
    },
    register(){
      this.form.codeDoc = null;
      this.form.timeDoc = null;
      this.form.checked = null;
      this.form.tipoDoc = null;
      this.form.issueDoc = null;
      this.form.fileDoc = null;
      this.showTable = false;
      this.showRegister = true
    },
    openModalDelete(id) {
      this.$root.$emit('bv::show::modal', 'modal-delete-'+id)
    },
    hideModalDelete(id) {
      this.$root.$emit('bv::hide::modal', 'modal-delete-'+id);
    },
    openModalEdit(id,row) {
      this.$root.$emit('bv::show::modal', 'modal-edit-'+id)
      this.form.issueDoc = row.c_asunto_exp; 
      this.form.codeDoc = row.c_cod_exp;
      this.form.hrcDoc = row.c_cod_hrc;
      this.form.timeDoc = row.d_tramite_exp;
      this.form.tipoDoc = row.id_tipo_doc_exp;
    },
    hideModalEdit(id) {
      this.$root.$emit('bv::hide::modal', 'modal-edit-'+id);
    },
    deleteRow(id){
      this.loadingModal = true;
      axios.put(config.hostname+'expediente/eliminar_expediente', 
        {
          "id_expediente": id
        },
        {
          headers: {
            'token':window.localStorage.getItem('token')
          }
        })
      .then( (response) =>{
        if(response.data.status === 'success'){
          if(config.hosts == true){
            axios.put(config.hostname_bd+'expediente/eliminar_expediente', 
            {
              "id_expediente": id
            },
            {
              headers: {
                'token':window.localStorage.getItem('token')
              }
            }).then( (response) =>{
              if(response.data.status === 'success'){
                this.loadingModal = false;
                this.$toasted.success(response.data.message, {
                  duration: 1500,
                  position: 'top-center'
                });
                this.load();
                this.hideModalDelete(id);
              }
              else{
                this.loadingModal = false;
                this.$toasted.error(response.data.message, {
                  duration: 1500,
                  position: 'top-center'
                });
              }
            })
          }
          else{
            this.loadingModal = false;
            this.$toasted.success(response.data.message, {
              duration: 1500,
              position: 'top-center'
            });
            this.load();
            this.hideModalDelete(id);
          }
        }
        else{
          this.loadingModal = false;
          this.$toasted.error(response.data.message, {
            duration: 1500,
            position: 'top-center'
          });
        }
      })
      .catch((error) =>{
        this.$toasted.error('Error', {
            duration: 1500,
            position: 'top-center'
        });
        this.loadingModal = false;
      });
    },
    editRow(id){
      if(
      this.form.codeDoc == null || this.form.codeDoc == "" ||
      this.form.tipoDoc == null || this.form.tipoDoc == "" ||
      this.form.issueDoc == null || this.form.issueDoc == "" ||
      this.form.timeDoc == null || this.form.timeDoc == ""){
        this.$toasted.error('Rellene todos los campos requeridos', {
          duration: 1000,
          position: 'top-center'
        });
      }
      else{
        this.$toasted.error('¿Está seguro de modificar el expediente?', {
          position: 'top-center',
          action : [
            {
              text : 'Si',
              onClick : (e, toastObject) => {
                toastObject.goAway(0);
                this.loadingModal = true;
                axios.put(config.hostname+'expediente/actualizar_expediente', {
                  "id_expediente":id,
                  "id_administrado":1, 
                  "id_tipo_doc_exp":this.form.tipoDoc,
                  "id_estado_exp":1, 
                  "id_area_trabajo":1, 
                  "c_cod_exp": this.form.codeDoc, 
                  "c_asunto_exp": this.form.issueDoc, 
                  "d_tramite_exp": this.form.timeDoc, 
                  "id_usuario_c": 1, 
                  "d_c_exp": this.form.timeDoc, 
                  "id_usuario_u":1, 
                  "d_u_exp": this.form.timeDoc,
                  "id_usuario_h":1,
                  "c_cod_hrc": this.form.hrcDoc,
                  "d_h_exp": this.form.timeDoc,
                  "b_exp":true,
                  "b_obs_exp":true
                },{})
                .then( (response) =>{
                  if(response.data.status === 'success'){
                    if(config.hosts == true){
                      axios.put(config.hostname_bd+'expediente/actualizar_expediente', {
                      "id_expediente":id,
                      "id_administrado":1, 
                      "id_tipo_doc_exp":this.form.tipoDoc,
                      "id_estado_exp":1, 
                      "id_area_trabajo":1, 
                      "c_cod_exp": this.form.codeDoc, 
                      "c_asunto_exp": this.form.issueDoc, 
                      "d_tramite_exp": this.form.timeDoc, 
                      "id_usuario_c": 1, 
                      "d_c_exp": this.form.timeDoc, 
                      "id_usuario_u":1, 
                      "d_u_exp": this.form.timeDoc,
                      "id_usuario_h":1,
                      "d_h_exp": this.form.timeDoc,
                      "b_exp":true,
                      "b_obs_exp":true
                      },{}).then( (response) =>{
                        if(response.data.status === 'success'){
                          this.loadingModal = false;
                          this.$toasted.success(response.data.message, {
                            duration: 1500,
                            position: 'top-center'
                          });
                          this.load();
                          this.hideModalEdit(id);
                        }
                        else{
                          this.loadingModal = false;
                          this.$toasted.error(response.data.message, {
                            duration: 1500,
                            position: 'top-center'
                          });
                          this.hideModalEdit(id);
                        }
                      });
                    }
                    else{
                      this.loadingModal = false;
                      this.$toasted.success(response.data.message, {
                        duration: 1500,
                        position: 'top-center'
                      });
                      this.load();
                      this.hideModalEdit(id);
                    }
                  }
                  else{
                    this.loadingModal = false;
                    this.$toasted.error(response.data.message, {
                      duration: 1500,
                      position: 'top-center'
                    });
                    this.hideModalEdit(id);
                  }
                })
                .catch((error) =>{
                  this.loadingModal = false;
                  this.$toasted.error('Error', {
                      duration: 1500,
                      position: 'top-center'
                  });
                });
              }
            },
            {
              text : 'No',
              onClick : (e, toastObject) => {
                this.hideModalEdit(id); 
                toastObject.goAway(0);
              }
            }
          ]
        });
      }
    },
    onSubmit() {
      
      // if(
      // // this.form.codeDoc == null || this.form.codeDoc == "" ||
      // this.form.adminCode == null || this.form.adminCode == "" || 
      // this.form.tipoDoc == null || this.form.tipoDoc == "" ||
      // this.form.issueDoc == null || this.form.issueDoc == "" ||
      // this.form.timeDoc == null || this.form.timeDoc == "" || this.form.files.length == 0
      // || this.form.files == []){
      //   this.$toasted.error('Rellene todos los campos requeridos', {
      //     duration: 1000,
      //     position: 'top-center'
      //   });
      // }
      // else{
      //   this.loadingForm = true;
      //   var fd = new FormData();
      //   this.form.files.forEach(
      //     e=> fd.append('files_expediente',e),
      //   );
      //   fd.append('id_administrado',this.form.adminCode);
      //   fd.append('id_tipo_doc_exp',this.form.tipoDoc);
      //   fd.append('id_estado_exp',1);
      //   fd.append('id_area_trabajo',1);
      //   // fd.append('c_cod_exp',this.form.codeDoc);
      //   fd.append('c_cod_hrc',this.form.hrcDoc);
      //   fd.append('c_asunto_exp',this.form.issueDoc);
      //   fd.append('d_tramite_exp',this.form.timeDoc);
      //   fd.append('id_usuario_c',1);
      //   fd.append('d_c_exp',this.form.timeDoc);
      //   fd.append('id_usuario_u',1);
      //   fd.append('d_u_exp',this.form.timeDoc);
      //   fd.append('id_usuario_h',1);
      //   fd.append('d_h_exp',this.form.timeDoc);
      //   fd.append('b_exp',true);
      //   fd.append('b_obs_exp',true);
      //   axios.post(config.hostname+'expediente/registrar_expediente',fd,
      //   {
      //     headers: {
      //       'Content-Type':'multipart/form-data; '
      //     }
      //   })
      //   .then( (response) =>{
      //     if(response.data.status === 'success'){
      //       if(config.hosts == true){
      //         axios.post(config.hostname_bd+'expediente/registrar_expediente',fd,
      //         {
      //           headers: {
      //             'Content-Type':'multipart/form-data; '
      //           }
      //         }).then( (response) =>{
      //           if(response.data.status === 'success'){
      //               this.loadingForm = false;
      //               this.form.dniDoc = '';
      //               this.form.adminCode = '';
      //               this.form.nameAdmin = '';
      //               this.form.hrcDoc = '';
      //               this.form.dniDoc = '';
      //               this.form.timeDoc = null;
      //               this.form.issueDoc = '';
      //               this.form.tipoDoc= null;
      //               this.form.files = [];
      //               this.$toasted.success(response.data.message, {
      //                 duration: 1500,
      //                 position: 'top-center'
      //               });
      //               this.load();
      //               this.showTable = true;
      //               this.showRegister = false;
      //               this.$refs.dropzoneCreate.removeAllFiles();
      //           }
      //           else{
      //             this.loadingForm = false;
      //             this.$toasted.error(response.data.message, {
      //                 duration: 1500,
      //                 position: 'top-center'
      //               });
      //             }
      //         })
      //         .catch( (error) =>{
      //           this.loadingForm = false;
      //           this.$toasted.error('Error', {
      //               duration: 1500,
      //               position: 'top-center'
      //           });
      //         });
      //       }
      //       else{
      //         this.loadingForm = false;
      //         this.form.dniDoc = '';
      //         this.form.adminCode = '';
      //         this.form.nameAdmin = '';
      //         this.form.hrcDoc = '';
      //         this.form.dniDoc = '';
      //         this.form.timeDoc = null;
      //         this.form.issueDoc = '';
      //         this.form.tipoDoc= null;
      //         this.form.files = [];
      //         this.$toasted.success(response.data.message, {
      //           duration: 1500,
      //           position: 'top-center'
      //         });
      //         this.load();
      //         this.showTable = true;
      //         this.showRegister = false;
      //         this.$refs.dropzoneCreate.removeAllFiles();
      //       }
      //     }
      //     else{
      //       this.loadingForm = false;
      //       this.$toasted.error(response.data.message, {
      //         duration: 1500,
      //         position: 'top-center'
      //       });
      //       this.form.files = [];
      //       this.form.adminCode = '';
      //       this.form.nameAdmin = '';
      //       this.showTable = true;
      //       this.showRegister = false;
      //       this.$refs.dropzoneCreate.removeAllFiles();
      //     }
      //   })
      //   .catch( (error) =>{
      //     this.loadingForm = false;
      //     this.$toasted.error('Error', {
      //         duration: 1500,
      //         position: 'top-center'
      //     });
      //   });
      // }
      // //event.preventDefault()
    },
    onReset(event) {
      // event.preventDefault()
      // Reset our form values
      this.form.nameDoc = ''
      this.form.codeDoc = ''
      this.form.timeDoc = null
      this.form.dniDoc = '';
      this.form.adminCode = '';
      this.form.files = [];
      this.show = true,
      this.showTable = true,
      this.showRegister = false
      // this.$nextTick(() => {
      //   this.show = true,
      //   this.showTable = true,
      //   this.showRegister = false
      // })
    },
    getAdministrado(){
      this.loadingDni = true;
      setTimeout(()=>{   
          this.$toasted.error('Error al buscar el SKU', {
          duration: 1500,
          position: 'top-center'
          });
      this.loadingDni = false;}, 300);
      // this.loadingDni = false;
      // this.loadingDni = true;
      // axios.get(config.hostname+'adminstrado/obtener/'+this.form.dniDoc)
      // .then( (response) =>{
      //   if(response.data.status === 'success'){
      //     this.loadingDni = false;
      //     var apat;
      //     var amat;
      //     if(response.data.data.c_appat_adm != null){
      //         apat = response.data.data.c_appat_adm + ' ';
      //     }else{
      //       apat = '';
      //     }
      //     if(response.data.data.c_apmat_adm != null){
      //         amat = response.data.data.c_apmat_adm + ' ';
      //     }else{
      //       amat = '';
      //     }
      //     this.form.nameAdmin = apat + amat + response.data.data.c_nomb_adm ;
      //     this.form.adminCode = response.data.data.id_administrado;
      //     this.$toasted.success(response.data.message, {
      //     duration: 1500,
      //     position: 'top-center'
      //     });
      //   }
      //   else{
      //     this.$toasted.error(response.data.message, {
      //     duration: 1500,
      //     position: 'top-center'
      //     });
      //     this.loadingDni = false;
      //     this.form.dniDoc = response.data.data.id_administrado;
      //   }
      // })
      // .catch( (error) =>{
      //   this.loadingDni = false;
      //   console.log(error);
      // });
    },
    parseDate(date) {
      const dateSet = date.toDateString().split(' ');
      return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
    },
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      this[checkbox][id] = ev.target.checked;
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    },
    getRandomData() {
      const result = [];

      for (let i = 0; i <= 8; i += 1) {
        result.push(Math.floor(Math.random() * 20) + 1);
      }

      return [{data: result}];
    },
    getRandomColor() {
      const {primary, success, info, danger} = this.appConfig.colors;
      const colors = [info, primary, danger, success];
      return {colors: [colors[Math.floor(Math.random() * colors.length)]]}
    },
    loadTypeDoc(){
      axios.get(config.hostname+'maestro/obtener_tipo_doc_exp')
      .then( (response) =>{
        this.typeDoc = response.data.data;
        this.typeDoc.forEach(function (element) {
          element.text = element.c_nomb_tipo_doc_exp;
          element.value = element.id_tipo_doc_exp;
        });
      })
      .catch( (error) =>{
        console.log(error);
      });
    },
  },
  computed: {
  
  },
  created() {
    // this.loadTypeDoc();
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.id_user = this.user.id_usuario;
    if (window.localStorage.getItem('authenticated') === 'true') {
     axios.get(config.hostname+'expediente/obtener_expediente_area/1/'+this.page+'/'+this.perpage+'/'+this.id_user)
      .then( (response) =>{
        this.expedientes = response.data.data;
        this.allRows = Number(response.data.total);
        this.loadingTable = false;
        this.showTable = false;
      })
      .catch( (error) =>{
        console.log(error);
      });
    }
    else{
      this.$router.push('/login');
    }
  }
};
</script>

<style src="./Partes.scss" lang="scss" scoped />
