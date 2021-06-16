<template>
  <div>
    <div v-if="!login">
      <article class="login-section w-100 d-flex justify-content-center align-items-center" style="height: 100vh">

          <div class="container text-center">
          <p style="font-size:20px">Para ingresar a la aplicación debe iniciar sesión.</p>
            <button type="button" class="btn btn-info btn-round btn-lg mt-2" data-toggle="modal" data-target="#loginModal">
              <i class="fas fa-user"></i> Login 
            </button>  
          </div>

          <!-- Modal Pin -->
          <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header border-bottom-0">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-title text-center">
                    <h4>Login</h4>
                  </div>
                  <div class="d-flex flex-column text-center">
                      <div class="text-center text-muted delimiter">Por favor ingrese su pin</div>
                      <div class="form-group input-group-lg">
                        <input id="pin-input" type="password" class="form-control text-center" placeholder="PIN" v-model="pin" autofocus>
                      </div>
                      <button id="btn-verify-pin" @click.prevent="verifyPin()" type="button" class="btn btn-info btn-block btn-round btn-lg"><i class="fas fa-sign-in-alt"></i> Entrar </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </article>
    </div>

    <div v-if="login">
      <nav class="navbar navbar-turnero">
        <div class="d-flex align-items-center" style="height: 100%">
            <img style="height: 45px;" src="https://panelweb.derkayvargas.com/imagenes/logos/logo-dyv.png">
        </div>
        
        <div class="clock" style="width: 40%; display: flex;">
          <div class="content-clock">
            <div id="clock">
              <span class="time">{{ time }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center" style="height: 100%">
            <img style="height: 35px;" src="https://www.crm.derkayvargas.com/imagenes/logo_toyota.png">
        </div>
      </nav>

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      time: '',
      date: '',
      week: ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'],
      timerID :'',
      login: false,
      pin: ''
    }
  },
  mounted(){
    this.timerID = setInterval(this.updateTime, 1000);
    this.updateTime();

    //ABRIR MODAL Y HACER FOCO
    $('#loginModal').modal('show');
    $('#loginModal').on('shown.bs.modal', function() {
      $(this).find('[autofocus]').focus();
    });

    // VERIFY PIN on ENTER
    var input = document.getElementById("pin-input");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
        event.preventDefault();
        document.getElementById("btn-verify-pin").click();
      }
    });

  },
  methods:{
    zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    },
    updateTime() {
        var cd = new Date();
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
        this.date = this.week[cd.getDay()] +' '+
              this.zeroPadding(cd.getFullYear(), 4) +
              '-' + this.zeroPadding(cd.getMonth()+1, 2) + 
              '-' + this.zeroPadding(cd.getDate(), 2); 
    },
    verifyPin(){
      if (this.pin == 2020){
        this.login = true;
        $('#loginModal').modal('hide');
      }
    }
  }
}
</script>

<style>

  body{
    font-family: 'Montserrat', sans-serif;
  }

  .navbar-turnero{
    background-color: #fff4f4;
    height: 65px;
    -webkit-box-shadow: 3px 3px 26px 2px rgba(0,0,0,0.38);
    -moz-box-shadow: 3px 3px 26px 2px rgba(0,0,0,0.38);
    box-shadow: 3px 3px 26px 2px rgba(0,0,0,0.38);

  }
  .navbar-brand {
    float: left;
    font-size: 20px;
    line-height: 20px;
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-left: 15px;
  }
  .navbar {
    margin-bottom: 0px;
  }

  .mto-express{
    /*background-color: #0d0dc5;*/
    /*color: #9bdeff;*/
    color: #0d0dc5
  }

  /**********************
    RELOJ
  **********************/
  .clock{
    padding-top: 5px
  }
  .content-clock{
    height: 100%;
    width: 300px;
  }
  #clock {
    font-family: sans-serif;
    color: #0f181b;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0 0 20px rgba(189, 188, 188),  0 0 20px rgba(10, 175, 230, 0);
  }
  .date {
    /*letter-spacing: 0.1em;*/
    background: radial-gradient(ellipse at center, #00c7ff 0%, #fff4f4 70%);
    font-size: 15px;
    margin: 0;
    padding: 0;
  }
  .time {
    letter-spacing: 0.05em;
    font-size: 38px;
    padding: 5px 0;
    margin: 0;
    padding: 0;
    /*font-family: 'Prompt', sans-serif;*/
  }


  /**********************
    LOADER
  **********************/
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #d2b2b5;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  @media (min-width: 576px) {
  .modal-dialog {
    max-width: 400px;
  }
  .modal-dialog .modal-content {
    padding: 1rem;
  }
}
.modal-header .close {
  margin-top: -1.5rem;
}

.form-title {
  margin: -2rem 0rem 2rem;
}

.btn-round {
  border-radius: 3rem;
}

.delimiter {
  padding: 1rem;
}

.social-buttons .btn {
  margin: 0 0.5rem 1rem;
}

.signup-section {
  padding: 0.3rem 0rem;
}


.login-section .btn-info{
  background-color: #d20b12;
  border-color: #dc3545;
}

</style>
