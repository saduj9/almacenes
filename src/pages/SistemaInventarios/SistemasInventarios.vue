<template>
    <div>
        <b-row>
            <b-cols cols="8">
                <h2 class="page-title">Vuela:<span class="fw-semi-bold">Sistema de Inventarios</span></h2>
            </b-cols>
        </b-row>
        <b-row>
            <b-cols cols="8">
                <h3 class="page-title">Formulario de manejo de Solicitudes</h3>
            </b-cols>
        </b-row>
        <div class="text-right">
            <h3 class="page-title"><span class="fw-semi-bold">Nombre de usuario</span></h3>
        </div>
        <b-row>
            <b-cols cols="8">
                <h4 class="page-title">Solicitudes pendientes de autorizar</h4>
            </b-cols>
        </b-row>
        <b-row>
            <b-col cols="12" md="12">
                <b-form-group  label="¿Cual es la solicitud que deseas modificar o autorizar?" >
                  <b-form-input></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="table-responsive">
            <table class="table table-hover"> 
                <thead>
                    <tr>
                        <th id="" class="hidden-sm-down">#</th>
                        <th id="" class="hidden-sm-down">Marca Temporal</th>
                        <th id="" class="hidden-sm-down">Solicitante</th>
                        <th id="" class="hidden-sm-down">Tipo de Hecho</th>
                        <th id="" class="hidden-sm-down">Almacén</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
         </div>
    </div>
</template>