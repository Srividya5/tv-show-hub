<template>
<nav class="navbar navbar-expand-lg navbar-light fixed-top" style="color:black;background-color:#9f5f9a">
 
  <h3 style="color:#fff" class="navbar-brand"><b> TV </b>Shows &nbsp;<strong style="color:#fff">HUB</strong></h3>



  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <h4>
      <router-link class="nav-link" to="/" style="color:#fff" > <i class="fa fa-fire fa-1x">Trending</i> </router-link>
 </h4>
 </li>&nbsp;&nbsp;&nbsp;&nbsp;
     <li class="nav-item active">
        <h4>
      <router-link class="nav-link" to="/genre/:data" style="color:#fff" ><i class="fa fa-tv fa-1x">&nbsp;Series</i>
      </router-link></h4></li>
   
    </ul>
    <form class="form-inline my-2 my-lg-0" style="margin-left:0%">
        <div  @keypress.enter="onSearch" >  
      <input class="form-control me-2 red border" type="search" placeholder="Search shows" aria-label="Search"   v-model="name" @input='getShows' required />
    </div>
    <div class="w3-dropdown-content w3-bar-block w3-border"  id="card" > 
             <div class="w3-bar-item w3-button" id="bar" v-for='show in shows' :key="show.score" @click="movie(show.show.name)" style="color:black">
                
               <div v-if="show.show.image!=null" >
                  <div class="card mb-3" style="max-width: 230px">
                    <div class="row g-0">
                     
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title" style="font-size: 15px;text-align:left">{{show.show.name}}</h5>
                        </div>
                       
                      </div>
                       <div class="col-md-4">
                        <img :src="show.show.image.medium" class="img-fluid rounded-start" alt="..." style="height:70px">
                      </div>
                    </div>
                  </div>
                </div> 
              </div> 
             </div>
    </form>
  </div>
  

</nav>
<!--footer -->

<router-view :key="$route.path"/>
</template>

 
<script>
import Axios from 'axios'

export default {
  name:'NavBar',
    data(){
      return{
         name: '',
         shows:[],
      }
    }, 
     methods: {
        onSearch(){
          this.$router.push({name:"ShowComp" , params:{data: this.name}})
        },
          getShows(){  
        this.loading=true;
        Axios.get("https://api.tvmaze.com/search/shows?q="+this.name).then(response => {
            this.shows = response.data;
            this.loading=false;
        }).catch(err =>{
            this.laoding=false;
            this.err='Somthing went wrong....'
            console.log('error', err)
        });
        },
        movie(showName){
         this.name=showName;
         console.log(this.name);
         this.$router.push({name:"ShowComp" , params:{data: this.name}})
       },
    },
    
}
</script>

<style scoped>
.form-control mr-sm-2,.form-inline my-2 my-lg-0{
  display: flex;
  flex-direction: row;
  position: absolute;
}
#card {
  overflow-y: scroll;
  max-height: 300px;
    left: 55%;
  width: 230px;
  position: absolute;
  font-size: 3px;
 background-color:#9f5f9a;
}

.search{
 
  font-size: x-large;
}
@media (max-width: 767px) {
  .card .img-wrapper {
    height: 8em;
  }
}
/*responsive media queries */
@media screen and (max-width: 767px) {
  .card {
    width: 25%;
    height: 5%;
  border: 1px solid rgba(0, 0, 0, 0.749);

  }
}

.w3-dropdown-content:hover{

opacity: 1;

}
.w3-dropdown-content {
  background-color: rgb(185, 113, 167);
position: absolute;
 
}
.a:-webkit-any-link {
    cursor: pointer;
    text-decoration: none;
    transition: color .15s ease-out;
    color: black;
}
</style>