<template>	
	<div class="pt-5">
		<div class="container d-flex justify-content-center">
			<ul class="list-group list-group-flush w-50">
			  <li class="list-group-item" style="font-size: 20px"><router-link class="" :to="{ name: 'lcd_turnos'}"><i class="fas fa-tv"></i> LCD Turnos</router-link></li>
			  <li class="list-group-item" style="font-size: 20px"><router-link class="" :to="{ name: 'lcd_lavadero'}"><i class="fas fa-tv"></i> LCD Lavadero</router-link></li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
  components:{},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
}
</script>

<style>
	.pt-4{
  		padding-top: 2rem
  	}
</style>