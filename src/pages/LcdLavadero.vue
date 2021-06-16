<template>
	<div class="pt-4">
    <div class="">

      <div v-if="turnos == null" class="w-100 d-flex justify-content-center align-items-center" style="height: 70vh">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      
      <ul class="list-group list-group-flush">
        <li v-for="(turno, indice) in turnos" 
          class="list-group-item"
          :id="turno.id">
            <div class="row">
                <div class="col-xs-8 col-sm-8">
                  <div class="col-sx-12">
                    <span :class="'fs65 badge '+turno.css_class">
                      <i class="fa fa-car"></i> {{ turno.unidad.modelo.modelo }}  {{ turno.unidad.color.color }}
                      <i class="fa fa-window-maximize"></i> {{ turno.unidad.patente }}
                    </span>
                  </div>
                </div>
                <div class="col-xs-4 col-sm-4 text-right">
                    <div class="d-flex" style="flex-direction: column;">
                      <div class="w-100">
                        <span :class="'fs65 badge '+turno.css_class">
                          <i class="fa fa-clock-o" aria-hidden="true"></i> {{ displayFormatoHora(turno.hora_prometida) }}
                        </span>
                      </div>
                    </div>
                </div>
                <div class="col-12">
                  <div class="w-100" v-show="turno.observacion != null">
                      <span class="badge fs21 mt-1" style="color: #fd7e14"><i> <i class="fas fa-info-circle"></i> {{ turno.observacion }}</i></span>
                    </div>
                </div>
            </div>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
import moment from 'moment';
export default {
  components:{},
  data () {
    return {
      turnos : null,
    }
  },
  mounted(){
    this.getTurnos();

    Echo.channel('movimientos-channel')
      .listen( 'TurnoTuvoMovimiento', (response) => {
        this.getTurnos();
    });
  },
  methods:{
    getTurnos(){
      axios
        .get('https://crm.derkayvargas.com/api/servicios_tablero/turnos',{
            params: {
              estados: [4, 8] // 4 y 8 Estan en lavadero
            }
        })
        .then(res => {
          $('.container-loader').hide();
            this.turnos = res.data
        })
        .catch( err =>{
          alert('Ups!, Algo salió mal.'+ err)
        })
    },
    displayFormatoHora: function(time) {
      return moment(time, 'h:mm:ss').format("HH:mm");
    },
  }
}
</script>

<style>
	.pt-4{
  		padding-top: 2rem
  	}
    .fs21{
      font-size: 21px
    }
    .fs65{
      font-size: 65px
    }
    .badge {
    font-weight: normal;
}
</style>