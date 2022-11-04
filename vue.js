

const app= Vue.createApp({

data() {

    return {

    events: [],
    pastEvents: [],
    UpcomingEvents:[],
    TITLE:'',
    palabraBuscada: '',
    filterEvents:[],
    categorias: [],
    categoriasSeleccionadas: [],

   id: new URLSearchParams(location.search).get("id"),

   eventoId:[],

    fecha:'',

    urlApi : 'https://amazing-events.herokuapp.com/api/events'




    }

},



created() {

  this.loadData(this.urlApi);
  titulo = document.querySelector(".active");
  

  },



mounted() {},


methods: {
    loadData(url){
    fetch(url)
    .then(response => response.json() //devuelve promesa que se resuelve y devuelve response que es respuesta y para ver que tiene se usa jason y se tiene que reslvolver con .them porque devuleve una promesa y dentro de la promesa de json tengo los datos y los trabajo 
    .then(data => {
        this.events = data.events //llamo a los eventos de la api
        this.filterEvents= this.events
        this.fecha = data.currentDate
        this.pastEvents = this.events.filter(item => this.fecha > item.date)
        this.UpcomingEvents = this.events.filter(item => this.fecha < item.date)
        this.eventoId = this.events.find(item => item._id == this.id)




    this.creacionDeCheckboxes();



      })
    )
    },


    creacionDeCheckboxes(){
      this.events.forEach((evento) => {
        if (!this.categorias.includes(evento.category)) {
          this.categorias.push(evento.category);
        }
      });
    }
  

},


computed: {

  filtroBusquedayCat(){

    let primerFiltro = this.events = this.filterEvents.filter(event => event.name.toLowerCase().includes(this.palabraBuscada.toLowerCase())) 

    if(this.categoriasSeleccionadas.length){
      this.events = primerFiltro.filter(event => this.categoriasSeleccionadas.includes(event.category)) 
     
    }else{
      this.events= primerFiltro
    }
},


 }
 
}).mount("#app")
