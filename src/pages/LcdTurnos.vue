<template>
	<div class="bg-01 pt-4">
      <div class="container-100">
        <div class="row">
          <div class="col-md-6">

             <div id="carousel-tablero-turnos" class="carousel slide" data-ride="carousel" data-interval="10100">
                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active">
                    <img src="https://crm.derkayvargas.com/imagenes/servicios/posventa/01.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption"></div>
                  </div>
                  <div class="carousel-item">
                    <img src="https://crm.derkayvargas.com/imagenes/servicios/posventa/02.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption"></div>
                  </div>
                  <div class="carousel-item">
                    <img src="https://crm.derkayvargas.com/imagenes/servicios/posventa/03.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption"></div>
                  </div>
                  <div class="carousel-item">
                    <img src="https://crm.derkayvargas.com/imagenes/servicios/posventa/04.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption"></div>
                  </div>
                </div>
              </div>

          </div>
          <div class="col-md-6">
             <table class="table center-align " id="tabla-turnos">
                <thead style="font-size: 40px;">
                  <tr>
                    <th class="col-md-10">Titular</th>
                    <th class="col-md-2" style="text-align: center;">Box</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  <template v-for="(turno, index) in turnos" >
                  <tr v-bind:id="turno.id">
                    <td class="col-md-10">
                        <span style="font-size: 40px;">{{ turno.titular }}</span>
                        <p style="font-size: 34px; font-style: oblique;">
                          {{ turno.modelo }} - {{ turno.patente }}
                        </p>
                    </td>
                    <td class="col-md-2" align="center">
                      <span style="font-size: 50px;">{{ turno.numero_box }}</span>
                    </td>
                  </tr>
                  </template>
                </tbody>
              </table>
          </div>

          <div id="stopwatch" class="stopwatch-container">
            <!-- Descargado de https://notificationsounds.com -->
            <audio class="d-none" id="stopwatchSound" controls>
              <source src="../../dist/notification1.mp3" type="audio/mpeg">
            </audio>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
	import Swal from 'sweetalert2'
export default {
  components:{},
  data () {
    return {
      turnos: [],
      turnosQueue: [],
      turnosQueue2: [],
      erraj: '',
      errax: '',
    }
  },
  mounted(){
    
    $('.carousel').carousel();

    Echo.channel('turnos-channel')
    .listen( 'TurnoHaSidoLlamado', (response) => {
      this.addTurno(response.turno[0]);
    })
    .listen('TurnoMarcadoComoPendiente', (response) => {
      this.turnos = response.turno;
    });

    axios
      .get('https://crm.derkayvargas.com/api/servicios/tablero/turnos')
      .then(response => {
          this.turnos = response.data
          console.log(this.turnos)
    	 })
    	.catch( err =>{
    		alert('Ups! algo salió mal')
    	})

  },
  methods:{
  	addTurno(turno){
          turno.avatar = turno.avatar.replace("public", "https://crm.derkayvargas.com/storage");
          if (this.turnosQueue.length == 0) {
            this.turnosQueue.push(turno);
            this.showEfect() }
          else {
            this.turnosQueue.push(turno);
          }

          var t = this.turnos.filter(function(elem){
              return turno.id != elem.id;
          });
          this.turnos = t;
          this.turnos.unshift(turno);
    },
    showEfect(){
      this.turnosQueue.forEach(function(item, index, turnosQueue) {
         setTimeout(function(){
          Swal.fire({
                timer:7500,
                showConfirmButton: false,
                width: '70%',
                html:
                      `
                      <div class="alert-llamado">
                        <div class="row justify-content-center align-items-center" style="font-size:60px">
                          <i class="fa fa-user-o"></i> 
                          ${item.titular}
                        </div>
                        <br>
                        <div class="row justify-content-center align-items-center" style="font-size:60px">
                          <i class="fa fa-car mr-2" ></i>
                          ${item.patente}
                        </div>
                        <br>
                        <div class="d-flex justify-content-center align-items-center" style="font-size:65px;">
                          <img src="${item.avatar}" style="height: 100px; width: 100px; border-radius: 50%">
                          <div style="font-size:50px">${item.nombre}</div> 
                        </div>
                        <div class="row justify-content-center" style="font-size:60px">
                            Box
                            <span class="ml-3 badge badge-red">${item.numero_box}</span>
                        </div>
                        <br>
                      </div>`
          });
          $("#stopwatchSound")[0].play();
          turnosQueue.splice(index, 1);
         }, index*5000);
      });
    }
  }
}
</script>

<style>
 	.container-100{
        margin: 0 auto;
        width: 100%;
        padding-right: 15px;
    	padding-left: 15px;
    }

	.bg-01{
        background-color: #e0d8da;
  	}

  	.pt-4{
  		padding-top: 2rem
  	}

	#tabla-turnos {
        background: #df0a1c;
        -webkit-box-shadow: 3px 3px 26px 2px rgba(0,0,0,0.38);
        -moz-box-shadow: 3px 3px 26px 2px rgba(0,0,0,0.38);
        box-shadow: 3px 3px 26px 2px rgba(0,0,0,0.38);
        color: white;
        font-family: 'Prompt', sans-serif;
        line-height: 1.3;
      }

      .alert-llamado{
        /*font-family: 'Prompt', sans-serif;*/
        padding: 20px;
        margin-top: -10px;
        border: 1px #ada5a5 groove;
        border-radius: 5px;
      }
      .swal2-content {
        padding: 0px !important;
      }
      .badge-red{
        background-color: #df0a1c;
        color: white
      }
</style>