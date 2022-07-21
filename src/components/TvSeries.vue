<template>
  <h3 style="color: #15245d">Discover latest Shows By Genres</h3>
  <div class="heading" style="color: #fff; align: center; margin-left:10%">
    <n-space>
      <n-button strong secondary round type="primary">
<!--         <router-link to="/genre/Action">Action</router-link>
 -->   
 Action   </n-button>
      <n-button strong secondary round type="info">
        <router-link to="/genre/Adventure">Adventure</router-link>
      </n-button>
      <n-button strong secondary round type="primary">
        <router-link to="/genre/Comedy">Comedy</router-link>
      </n-button>
      <n-button strong secondary round type="info">
        <router-link to="/genre/Crime">Crime</router-link>
      </n-button>
      <n-button strong secondary round type="primary">
        <router-link to="/genre/Drama">Drama</router-link>
      </n-button>
      <n-button strong secondary round type="info">
        <router-link to="/genre/Horror">Horror</router-link>
      </n-button>
      <n-button strong secondary round type="primary">
        <router-link to="/genre/Fantasy">Fantacy</router-link>
      </n-button>
      <n-button strong secondary round type="info">
        <router-link to="/genre/Thriller">Thriller</router-link>
      </n-button>
      <n-button strong secondary round type="primary">
        <router-link to="/genre/Fantasy">Fantacy</router-link>
      </n-button>
      <n-button strong secondary round type="info">
        <router-link to="/genre/Mystery">Mystery</router-link>
      </n-button>
      <n-button strong secondary round type="primary">
        <router-link to="/genre/Science-Fiction">Science-Fiction</router-link>
      </n-button>
      <n-button strong secondary round type="info">
        <router-link to="/genre/Supernatural">Supernatural</router-link>
      </n-button>
    </n-space>
    <!-- <button type="button" class="btn btn-light" style="background-color:lavender"><router-link to='/genre/Adventure'>Adventure</router-link></button> &nbsp; 
<button type="button" class="btn btn-dark" style="background-color:#c1c1c1"><router-link to='/genre/Comedy'>Comedy</router-link></button> &nbsp; 
<button type="button" class="btn btn-primary" style="background-color:lavender"><router-link to='/genre/Crime'>Crime</router-link></button> &nbsp; 
<button type="button" class="btn btn-success" style="background-color:#c1c1c1"><router-link to='/genre/Drama'>Drama</router-link></button> &nbsp; 
<button type="button" class="btn btn-dark" style="background-color:lavender"><router-link to='/genre/Horror'>Horror</router-link></button> &nbsp;
<button type="button" class="btn btn-light" style="background-color:#c1c1c1"><router-link to='/genre/Fantasy'>Fantacy</router-link></button> &nbsp; 
<button type="button" class="btn btn-warning" style="background-color:lavender"><router-link to='/genre/Thriller'>Thriller</router-link></button> &nbsp; 
<button type="button" class="btn btn-info" style="background-color:#c1c1c1"><router-link to='/genre/Mystery'>Mystery</router-link></button> &nbsp; 
<button type="button" class="btn btn-dark" style="background-color:lavender" ><router-link to='/genre/Science-Fiction'>Science-Fiction</router-link></button>&nbsp; 
<button type="button" class="btn btn-primary" style="background-color:#c1c1c1;text-color:#fff"><router-link to='/genre/Supernatural'>Supernatural</router-link></button>&nbsp; 
 -->
  </div>
  <div class="container px-5" id="card" v-if="genre != null">
    <div class="row gx-3">
      
      <div
        class="col"
        v-for="show in moviesBasedOnGenre.slice(0, 10)"
        :key="show.score"
        style="margin-bottom: 2%"
      >
        <div class="card" style="width: 20rem; column-gap: 6px; height: 45rem">
          <img
            class="card-img-top"
            v-if="show.image != null && show.image != ''"
            :src="show.image.medium"
            alt="picture"
          />
          <img
            v-else
            src="../assets/img/np.webp"
            style="
              height: 28rem;
              width: 20rem;
              object-fit: fill;
              border: 1px solid black;
            "
          />
          <div class="card-body">
            <h4 class="card-title" style="color: #15245d">
              <b>{{ show.name }}</b>
            </h4>
            <p class="card-text">
              <span>&#127775;</span>{{ show.rating.average }}/10
            </p>
            <a
              class="btn btn-outline"
              style="color: #fff; background-color: #7851a9"
              @click="info(show.id)"
              >To Know More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  name: "TvSeries",
  data() {
    return {
      genre: this.$route.params.data,
      //genre: this.$props.data,
      shows: [],
      loading: false,
      err: "",
    };
  },
  created() {
    this.getShows();
  },
  computed: {
    moviesBasedOnGenre() {
      return this.shows.filter(
        (show) => show.genres.includes(this.genre) && show.rating.average > 7.0
      );
    },
  },
  methods: {
    getShows() {
      console.log(this.genre);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows")
        .then((response) => {
          this.shows = response.data;

          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong....";
          console.log("error", err);
        });
    },
    info(id) {
      console.log(id);
      this.$router.push({ name: "ShowInfo", params: { data: id } });
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 700px) {
  .card {
    width: 10%;
    height: 5%;
    border: 1px solid rgba(0, 0, 0, 0.749);
  }
}
@media (max-width: 700px) {
  .card .img-wrapper {
    height: 8em;
  }
}
</style>