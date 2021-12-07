<template>
<div class="dirreccion-page"><b-row>
    <b-col cols="8">
      <h2 class="page-title">Area - <span class="fw-semi-bold">Dirección</span></h2>
    </b-col>
    <b-col cols="4">
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
            <b-form-input id="search-input" placeholder="Buscar" v-model="searchInput" v-if="typeInput!='todo'" v-on:keyup.enter="searchData" />
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-col>
  </b-row> 
    <b-row>
      <b-col>
        <Widget
          customHeader
        >
        <b-row v-show="showTable">
          <b-col cols="10">
            <h5 class="page-title">Lista de - <span class="fw-semi-bold">Expedientes</span></h5>
            <a href="#" class="active-a" id="area-1" @click="loadArea(1)"> Mesa de Partes</a>
            <a href="#" class="disabled-a" id="area-2" @click="loadArea(2)">  / Hidrocarburo</a>
            <a href="#" class="disabled-a" id="area-3" @click="loadArea(3)">  / Minería</a>
            <a href="#" class="disabled-a" id="area-4" @click="loadArea(4)">  / Energía</a>
            <a href="#" class="disabled-a" id="area-5" @click="loadArea(5)">  / Legal</a>
            <a href="#" class="disabled-a" id="area-6" @click="loadArea(6)">  / Dirección</a>
            <!-- <b-breadcrumb :items="items"></b-breadcrumb> -->
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
        <br>
         <div class="data-loader" v-if="loadingTable">
          <i class="la la-spinner la-spin" ></i>
        </div>
          <p class="text-center" v-if="expedientes.length == 0 && loadingTable==false">No hay registros</p>
          <div  v-show="showTable" class="table-resposive table-hover">
            <table class="table" v-if="expedientes.length != 0">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th class="hidden-sm-down">Asunto</th>
                  <th class="hidden-sm-down">N° de Registro</th>
                  <th class="hidden-sm-down">Fecha</th>
                  <th class="hidden-sm-down">Documento</th>
                  <th class="hidden-sm-down" v-if="id_area == 2 || id_area == 3 || id_area == 4">Documento Observado</th>
                  <th class="hidden-sm-down" v-if="id_area == 5 || id_area == 6">Documento Aprobado</th>
                  <th class="hidden-sm-down" v-if="id_area != 5 && id_area != 2 && id_area != 6 && id_area != 3 
                  && id_area != 4 && user.id_area_trabajo == 8 || user.id_area_trabajo == 6">Asignar</th>
                  <th class="hidden-sm-down" v-if="id_area != 1 && id_area != 5 && id_area != 6 
                  && user.id_area_trabajo == 8 || user.id_area_trabajo == 6">Revertir</th>
                  <th class="hidden-sm-down">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in expedientes" :key="row.id_expediente">
                  <td>{{row.id_expediente}}</td>
                  <td>{{row.c_asunto_exp}}</td>
                  <td >
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
                    {{formatDate(row.d_tramite_exp)}}
                  </td>
                  <td class="text-semi-muted">
                    <div style="width: 150px;white-space: normal;overflow: hidden;text-overflow: Ellipsis" v-for="file in row.arc_exp" :key="file.id_archivos_exp">
                      <a target="_blank" :href="ip+'/public/'+file.c_archivo_exp">
                      {{file.c_archivo_exp}}</a>
                    </div>
                  </td>
                  <td class="text-semi-muted" v-if="id_area == 2 || id_area == 3 || id_area == 4">
                    <div style="width: 150px;white-space: normal;overflow: hidden;text-overflow: Ellipsis" v-for="file in row.arc_exp_obs" :key="file.id_archivos_aprob_exp">
                      <a target="_blank" :href="ip+'/public/'+file.c_informe_obs">
                      {{file.c_informe_obs}}</a>
                    </div>
                  </td>
                  <td class="text-semi-muted" v-if="id_area == 5 || id_area == 6">
                    <div style="width: 150px;white-space: normal;overflow: hidden;text-overflow: Ellipsis" v-for="file in row.arc_exp_aprob" :key="file.id_archivos_aprob_exp">
                        <a target="_blank" :href="ip+'/public/'+file.c_informe_tecnico">
                        {{file.c_informe_tecnico}}</a><br>
                        <!-- <a target="_blank" :href="ip+'/public/'+file.c_autodirectoral">
                        {{file.c_autodirectoral}}</a><br>
                        <a target="_blank" :href="ip+'/public/'+file.c_decla_impac_amb">
                        {{file.c_decla_impac_amb}}</a> -->
                      </div>
                  </td>
                  <td class="text-semi-muted" v-if="id_area != 5 && id_area != 2 && id_area != 3 && id_area != 4 
                  && id_area != 6 && user.id_area_trabajo == 8 || user.id_area_trabajo == 6">
                    <b-button variant="inverse" v-if="row.id_area_trabajo != 1 && row.id_area_trabajo != 5 
                    && row.id_area_trabajo != 6 && row.id_estado_exp != 6" disabled> {{getAreaNombre(row.id_area_trabajo)}}</b-button>
                    <b-dropdown v-if="row.id_area_trabajo == 1 || row.id_area_trabajo == 6 && row.id_estado_exp != 6
                    && row.id_estado_exp != 3 && row.id_estado_exp != 4" variant="inverse" class="mr-xs" 
                    size="sm" text="Seleccionar" right>
                      <b-dropdown-item-button @click="openModalArea(row.id_expediente,2)">Hidrocarburo</b-dropdown-item-button>
                      <b-dropdown-item-button @click="openModalArea(row.id_expediente,3)">Minería</b-dropdown-item-button>
                      <b-dropdown-item-button @click="openModalArea(row.id_expediente,4)">Energía</b-dropdown-item-button>
                    </b-dropdown>
                     <b-modal :id="'modal-area-'+row.id_expediente" title="Asignar Area" header-bg-variant="dark" body-bg-variant="light"
                    header-text-variant="white" :hide-footer="true">
                    Seleccione un usuario para asignar
                    <b-form-select v-model="id_user_assign" :options="optionsUser"></b-form-select>
                    <br><br>
                    <div class="text-right">
                      <b-button class="mr-1" v-if="!loadingModal" variant="secondary"  @click="hideModalArea(row.id_expediente);">Cancelar</b-button>
                      <b-button v-if="!loadingModal" variant="success" @click="assignArea(row.id_expediente);">Asignar</b-button>
                        <div class="data-loader">
                        <i class="la la-spinner la-spin" v-if="loadingModal"></i>
                      </div>
                    </div>
                    
                  </b-modal>
                  </td>
                  <td v-if="id_area != 1 && id_area != 5 && id_area != 6 && user.id_area_trabajo == 8 
                  || user.id_area_trabajo == 6">
                     <b-button v-if="row.b_reasignar == true && row.id_area_trabajo !=5 && row.id_area_trabajo !=6
                     && row.id_estado_exp != 3 && row.id_estado_exp != 4 && row.id_estado_exp != 6" variant="danger" 
                     size="sm" @click="openModalRevert(row.id_expediente)">
                      <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
                    </b-button>

                    <b-modal :id="'modal-revert-'+row.id_expediente" title="Revertir Expediente" header-bg-variant="dark" body-bg-variant="light"
                    header-text-variant="white" :hide-footer="true">
                    ¿Desea revertir la asignación del expediente? <br>
                    <div class="text-right">
                      <b-button v-if="!loadingModalRevert" variant="secondary"  @click="hideModalRevert(row.id_expediente);">No</b-button>
                      <b-button v-if="!loadingModalRevert" variant="danger" @click="revertRow(row.id_expediente);">Si</b-button>
                       <div class="data-loader">
                        <i class="la la-spinner la-spin" v-if="loadingModalRevert"></i>
                      </div>
                    </div>
                  </b-modal>
                  </td>
                  <td>
                    <b-badge variant="danger" pill v-if="row.id_estado_exp == 1">Pendiente</b-badge>
                    <b-badge variant="warning" pill  v-if="row.id_estado_exp == 2">Asignado</b-badge>
                    <b-badge variant="success" pill v-if="row.id_estado_exp == 3">Aprobado</b-badge>
                    <b-badge variant="danger" pill v-if="row.id_estado_exp == 4">Observado</b-badge>
                    <b-badge variant="success" pill  v-if="row.id_estado_exp == 6">Completado</b-badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-show="expedientes.length != 0" class="mt-3">
            <!-- <h6 class="text-right">Pagi</h6> -->
            <b-pagination v-model="page" :total-rows="allRows" 
            :per-page="perpage" align="right" @input =" loadPage(page)" first-number
            last-number>
            </b-pagination>
          </div>
        </Widget>
      </b-col>
    </b-row>
</div>
  
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import config from '../../config'
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'
import moment from 'moment'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

export default {
  name: 'Direccion',
  components: {
    Widget,
    Sparklines
  },
  data() {
    return {

      items: [
          {
            text: 'Admin',
            click: function (){console.log('h224')}
          },
          {
            text: 'Manage',
            href: '#'
          },
          {
            text: 'Library',
            active: true
          }
        ],

      ip: config.ip,
      page: 1,
      perpage: 10,
      allRows: 0,
      loadingTable: true,
      loadingModalRevert: false,
      loadingModal: false,
      showTable: false,
      showEnergia: false,
      showMineria: false,
      showHidrocarburo: false,
      showSearch: false,
      expedientes: [],
      expMineria: [],
      expEnergia: [],
      epxHidrocarburo: [],
      id_area: 1,
      cod_area: 0,
      area: '',
      typeInput: null,
      searchInput: '',
      user: {},
      optionsUser: [],
      id_user:null,
      id_user_assign: 1,
      formSearch: {
        searchInput: null,
        typeInput: null
      },
       optionsPerPage: [
        {text: '10',value: 10},
        {text: '20', value: 20},
        {text: '30',value: 30}
      ],
    };
  },
  methods: {
   
    loadUsers(id_area){
      axios.get(config.hostname+'personal/'+id_area)
      .then( (response) =>{
        this.optionsUser = [];
        response.data.personal.forEach(
          e=>{
            this.optionsUser.push(
              {
                text: e.c_nombres_personal + e.c_appat_personal + e.c_apmat_personal,
                value: e.id_usuario
              })
          }
        );
      })
      .catch( (error) =>{
        console.log(error);
      });
    },
    getAreaNombre(id){
      switch (id){
        case 1 : return 'Mesa de partes';break;
        case 2 : return 'Hidrocarburo';break;
        case 3: return 'Minería';break;
        case 4: return 'Energía';break;
        default: return '';break;
      } 
    },
    openModalRevert(id){
       this.$root.$emit('bv::show::modal', 'modal-revert-'+id);
    },
    hideModalRevert(id){
      this.$root.$emit('bv::hide::modal', 'modal-revert-'+id);
    },
    revertRow(id){
      this.loadingModalRevert = true;
      axios.put(config.hostname+'expediente/revertir_expediente',
      {
      "id_expediente": id,
      },{
        headers: {
          'token':window.localStorage.getItem('token'),
        }
      })
      .then( (response) =>{
        if(response.data.status === 'success'){
          if(config.hosts == true){
            axios.put(config.hostname_bd+'expediente/revertir_expediente',
            {
            "id_expediente": id,
            },{
              headers: {
                'token':window.localStorage.getItem('token'),
              }
            }).then( (response) =>{
              if(response.data.status === 'success'){
                this.loadingModalRevert = false;
                this.expedientes = response.data.data;
                this.$toasted.success(response.data.message, {
                  duration: 1500,
                  position: 'top-center'
                });
                this.hideModalRevert();
                this.loadArea(this.id_area);
              }else{
                this.loadingModalRevert = false;
                this.$toasted.error(response.data.message, {
                  duration: 1500,
                  position: 'top-center'
                });
              }
            })
            .catch( (error)=>{
              this.loadingModalRevert = false;
              this.$toasted.error('Error', {
                duration: 1500,
                position: 'top-center'
              });
            });
          }else{
            this.loadingModalRevert = false;
            this.expedientes = response.data.data;
            this.$toasted.success(response.data.message, {
              duration: 1500,
              position: 'top-center'
            });
            this.hideModalRevert();
            this.loadArea(this.id_area);
          }
        }
        else{
          this.loadingModalRevert = false;
          this.$toasted.error(response.data.message, {
            duration: 1500,
            position: 'top-center'
          });
        }
      })
      .catch( (error) =>{
        this.loadingModalRevert = false;
        this.$toasted.error('Error', {
          duration: 1500,
          position: 'top-center'
        });
      });
    },
    searchData(){
      if(this.typeInput === "todo"){
        this.loadArea(this.id_area);
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
          "id_area_trabajo":this.id_area,
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
      axios.get(config.hostname+'expediente/obtener_expediente_area/6/'+this.page+'/'+this.perpage+'/'+this.id_user)
      .then( (response) =>{
        this.loadingTable = false;
        this.showTable = true;
        this.allRows = Number(response.data.total);
        this.expedientes = response.data.direccion;
        this.expMineria = response.data.mineria;
        this.expEnergia = response.data.energia;
        this.epxHidrocarburo = repsonse.data.hidrocarburo;
      })
      .catch( (error) =>{
        console.log(error);
      });
    },
    disableA(){
      document.getElementById('area-1').className='disabled-a';
      document.getElementById('area-2').className='disabled-a';
      document.getElementById('area-3').className='disabled-a';
      document.getElementById('area-4').className='disabled-a';
      document.getElementById('area-5').className='disabled-a';
      document.getElementById('area-6').className='disabled-a';
    },
    activeA(id){
      document.getElementById(id).className='active-a';
    },
    loadArea(id){
      this.loadingTable = true;
      this.expedientes = [];
      axios.get(config.hostname+'expediente/obtener_expediente_area/6/'+this.page+'/'+this.perpage+'/'+this.id_user)
      .then( (response) =>{
        if(response.data.status === 'success'){
          this.loadingTable = false;
          this.showTable = true;
          this.showSearch = false;
          if(id == 1){
            this.id_area = 1;
            console.log(this.id_area);
            this.expedientes = response.data.mesa_de_partes;
            this.allRows = response.data.mesa_de_partes.length;
            this.disableA();
            this.activeA('area-1');
          }
          else if(id == 2){
            this.id_area = 2;
            console.log(this.id_area);
            this.expedientes = response.data.hidrocarburo;
            this.allRows = Number(response.data.total_hidrocarburo);
            this.disableA();
            this.activeA('area-2');
          }
          else if(id == 3){
            this.id_area = 3;
            console.log(this.id_area);
            this.expedientes = response.data.mineria;
            this.allRows = Number(response.data.total_mineria);
            this.disableA();
            this.activeA('area-3');
          }
          else if(id == 4){
            this.id_area = 4;
            console.log(this.id_area);
            this.expedientes = response.data.energia;
            this.allRows = Number(response.data.total_energia);
            this.disableA();
            this.activeA('area-4');
          }
          else if(id == 5){
            this.id_area = 5;
            console.log(this.id_area);
            this.expedientes = response.data.legal;
            this.allRows = Number(response.data.total_legal);
            this.disableA();
            this.activeA('area-5');
          }
          else if(id == 6){
            this.id_area = 6;
            this.expedientes = response.data.direccion;
            this.allRows = Number(response.data.total_direccion);
            this.disableA();
            this.activeA('area-6');
          }
        }
        else{
          this.loadingTable = false;
          this.showTable = true;
          this.expedientes = [];
          this.$toasted.error('Error al cargar los expedientes', {
            duration: 1500,
            position: 'top-center'
          });
        }
      })
      .catch( (error) =>{
        this.loadingTable = false;
        this.showTable = true;
        this.$toasted.error('Error al cargar los expedientes', {
          duration: 1500,
          position: 'top-center'
        });
      });
    },
    loadPerPage(perpage){
      this.page = 1;
      if(this.showSearch == true){
        axios.post(config.hostname+'expediente/buscar_expediente',
        {
          "search": this.formSearch.searchInput,
          "origen": this.formSearch.typeInput,
          "id_area_trabajo":this.id_area,
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
        axios.get(config.hostname+'expediente/obtener_expediente_area/6/1/'+perpage+'/'+this.id_user)
        .then( (response) =>{
          this.loadingTable = false;
          this.showTable = true;
          if(this.id_area == 1){
            this.expedientes = response.data.mesa_de_partes;
            this.allRows = Number(response.data.total_partes);
          }
          if(this.id_area == 2){
            this.expedientes = response.data.hidrocarburo;
            this.allRows = Number(response.data.total_hidrocarburo);
          }
          else if(this.id_area == 3){
            this.expedientes = response.data.mineria;
            this.allRows = Number(response.data.total_mineria);
          }
          else if(this.id_area == 4){
            this.expedientes = response.data.energia;
            this.allRows = Number(response.data.total_energia);
          }
          else if(this.id_area == 5){
            this.expedientes = response.data.legal;
            this.allRows = Number(response.data.total_legal);
          }
          else if(this.id_area == 6){
            this.expedientes = response.data.direccion;
            this.allRows = Number(response.data.total_direccion);
          }
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
          "id_area_trabajo":this.id_area,
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
        axios.get(config.hostname+'expediente/obtener_expediente_area/6/'+page+'/'+this.perpage+'/'+this.id_user)
        .then( (response) =>{
          this.loadingTable = false;
          this.showTable = true;
          setTimeout(function(){document.body.scrollTop = 0; }, 50);
          if(this.id_area == 1){
            this.expedientes = response.data.mesa_de_partes;
            this.allRows = Number(response.data.total_partes);
          }
          if(this.id_area == 2){
            this.expedientes = response.data.hidrocarburo;
            this.allRows = Number(response.data.total_hidrocarburo);
          }
          if(this.id_area == 3){
            this.expedientes = response.data.mineria;
            this.allRows = Number(response.data.total_mineria);
          }
          if(this.id_area == 4){
            this.expedientes = response.data.energia;
            this.allRows = Number(response.data.total_energia);
          }
          if(this.id_area == 5){
            this.expedientes = response.data.legal;
            this.allRows = Number(response.data.total_legal);
          }
          if(this.id_area == 6){
            this.expedientes = response.data.direccion;
            this.allRows = Number(response.data.total_direccion);
          }
        })
        .catch( (error) =>{
          console.log(error);
        });
      }
      
    },
    formatDate(value){
      if (value) {
        return moment(String(value)).format('L')
      }
    },
    openModalArea(id,area){
      this.loadUsers(area);
      this.cod_area = area
      switch(area){
        case 2: this.area = 'Hidrocarburo';break;
        case 3: this.area = 'Minería';break;
        case 4: this.area = 'Energia';break;
      }
      this.$root.$emit('bv::show::modal', 'modal-area-'+id)
    },
    hideModalArea(id){
      this.$root.$emit('bv::hide::modal', 'modal-area-'+id);
    },
    assignArea(id){
      this.loadingModal = true;
      axios.put(config.hostname+'expediente/cambiar_area_expediente',
      {
      "id_expediente": id,
      "id_area_trabajo": this.cod_area
      })
      .then( (response) =>{
        if(response.data.status === 'success'){
          if(config.hosts == true){
            axios.put(config.hostname_bd+'expediente/cambiar_area_expediente',
            {
              "id_expediente": id,
              "id_area_trabajo": this.cod_area,
              "id_usuerio": this.id_user_assign
            }).then( (response)=>{
              if(response.data.status === 'success'){
                this.loadingModal = false;
                this.expedientes = response.data.data;
                this.$toasted.success(response.data.message, {
                  duration: 1750,
                  position: 'top-center'
                });
                this.hideModalArea(id);
                this.loadArea(this.id_area);
              }
              else{
                this.loadingModal = false;
                this.$toasted.error(response.data.message, {
                  duration: 1750,
                  position: 'top-center'
                });
                this.hideModalArea(id);
              }
            })
          }
          else{
            this.loadingModal = false;
            this.expedientes = response.data.data;
            this.$toasted.success(response.data.message, {
              duration: 1750,
              position: 'top-center'
            });
            this.hideModalArea(id);
            this.loadArea(this.id_area);
          }  
        }else{
          this.loadingModal = false;
          this.$toasted.error(response.data.message, {
            duration: 1750,
            position: 'top-center'
          });
          this.hideModalArea(id);
        }
      })
      .catch( (error) =>{
        this.loadingModal = false;
        this.$toasted.error('Error', {
          duration: 1750,
          position: 'top-center'
        });
        this.hideModalArea(id);
      });
    },
  },
  computed: {
    
  },
  created(){
    this.loadArea(1);
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.id_user = this.user.id_usuario;
  }
};
</script>

<style src="./Direccion.scss" lang="scss" scoped />