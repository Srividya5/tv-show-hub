<template>
  <nav
    class="navbar navbar-expand-md navbar-light"
    style="margin-top: 0px; text-align: center"
  >
    <div class="container-fluid">
      <h3 class="show-for-medium" style="color: #59143c; text-align: center">
        Trending Shows Now
      </h3>
    </div>
  </nav>

  <!-- <div class="container px-2">
    <div class="row gx-5">
      <div class="card shadow" v-for="show in moviesBasedOnRating.slice(0, 12)"
        :key="show.score"  style="width: 20rem; column-gap: 8px;height: 42rem;margin-bottom: 4%">
          <img v-if="show.image !== null && show.image!==''" :src="show.image.medium" class="card-img-top rounded-top" alt="Designer desk">
          <div v-else src="../assets/img/noimage.jpg"></div>
          <div class="card-body">
              <div class="media d-flex align-items-center justify-content-between">
                <div class="post-group">
                      <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="23k followers">
                          <img class="avatar-sm me-2 img-fluid rounded-circle" src="../../assets/img/team/profile-picture-2.jpg" alt="Jo portrait"> Jo J. Moore
                      </a>
                  </div> 
                  <div class="d-flex align-items-center">
                      <span class="small"><span class="far fa-calendar-alt me-2"></span>{{show.premiered}}</span>
                  </div>
              </div>
              <h3 class="h5 card-title mt-4">{{ show.name }}</h3>
              <p class="card-text">Rating-{{ show.rating.average }}</p>
              <a href="#" class="btn btn-primary btn-sm"  @click="info(show.id)"
                style="background-color: #7851a9; color: #fff">See More</a>
          </div>
      </div>
  </div>
</div>-->
  <div class="container px-6" id="card">
    <div class="row gx-3">
     
    <n-spin v-if="showSpinner" />

      <div
        class="col"
        v-for="show in moviesBasedOnRating.slice(0, 10)"
        :key="show.score"
        style="margin-bottom: 4%"
      >
        <div
          class="card"
          style="width: 20rem; column-gap: 4px; height: 42rem"
         
        >
          <div>
            <img v-if="show.image !== null" :src="show.image.medium" class="card-img-top" alt="picture" />

            <div class="card-body">
              <h4 class="card-title" style="color: #15245d">
                <b>{{ show.name }}</b>
              </h4>
              <p class="card-text"><span>&#127775;</span>{{ show.rating.average }}/10</p>
            
              <a 
                class="btn btn-outline"
                @click="info(show.id)"
                style="background-color: #7851a9; color: #fff"
                >To Know More</a>
               
  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 <div class="container px-4" id="card">
    <div class="row gx-5">
      <div
        class="col"
        v-for="show in moviesBasedOnDrama.slice(0, 5)"
        :key="show.score"
        style="margin-bottom: 4%"
      >
        <div
          class="card"
          style="width: 20rem; column-gap: 4px; height: 42rem"
          v-if="show.image != null"
        >
          <div>
            <img :src="show.image.medium" class="card-img-top" alt="picture" />

            <div class="card-body">
              <h5 class="card-title" style="color: #15245d">
                <b>{{ show.name }}</b>
              </h5>
              <p class="card-text"><span>&#127775;</span>{{ show.rating.average }}/10</p>
              <a
                class="btn btn-outline"
                @click="info(show.id)"
                style="background-color: #7851a9; color: #fff"
                >To Know More</a
              >
              <svg
                v-if="loading"
                class="Button__Icon Button__Spinner"
                viewBox="..."
              >
                <path d="..." />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

     <div class="container px-4" id="card">
      <div class="row gx-5">
        <div
          class="col"
          v-for="show in moviesBasedOnAction.slice(0, 5)"
          :key="show.score"
          style="margin-bottom: 4%; align-items: center"
        >
          <div
            class="card"
            style="width: 20rem; column-gap: 4px; height: 42rem"
            v-if="show.image != null"
          >
            <img :src="show.image.medium" class="card-img-top" alt="picture" />
            <div class="card-body">
              <h5 class="card-title" style="color: #15245d">
                <b>{{ show.name }}</b>
              </h5>
              <p class="card-text">Rating-{{ show.rating.average }}/10<span>&#127775;</span></p>
              <a
                class="btn btn-outline"
                @click="info(show.id)"
                style="background-color: #7851a9; color: #fff"
                >To Know More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div> 

</template>
<script>
import Axios from "axios";

export default {
  name: "TrendC", 
  data() {
    return {
      search: this.$route.params.data,
     showSpinner: false,
      shows: [],
      loading: false,
      err: "",
      pageOfItems: [],
      page: 1,
      totalItems: 12,
    
      };
  },
 
  created() {
    this.getShows();
  },
  computed: {
    moviesBasedOnRating() {
      return this.shows.filter((show) => show.rating.average > 8.0);
    },

    moviesBasedOnDrama() {
      return this.shows.filter(
        (show) => show.genres[0] == "Drama" && show.rating.average >= 8.5
      );
    },
    moviesBasedOnAction() {
      return this.shows.filter(
        (show) => show.genres[0] == "Action" && show.rating.average >= 8
      );
    }, 
  },
  methods: {
    getShows() {
      console.log(this.search);
    this.showSpinner = true;
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows")
        .then((response) => {
          this.shows = response.data;
          this.loading = false;
          this.totalItems = this.shows.length;
          this.onChangePage(1);
        })
        .catch((err) => {
          this.loading = false;
          this.showSpinner = false;
          this.err = "Something went wrong....";
          console.log("error", err);
        });
    },
    info(id) {
      console.log(id);
      this.$router.push({ name: "ShowInfo", params: { data: id } });
    },
  

}
};




  
</script>
<style scoped>
.card {
  margin-left: 0%;
  background: rgb(231, 223, 231);
  border: 1px solid rgba(0, 0, 0, 0.749);
 
 
}
.card:hover {
  transform: scale(1.02);
  box-shadow: -5px 7px 20px 12px #15245d;
}
.card .img-wrapper {
  max-width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#card {
  align-items: center;
}
.card img {
  max-height: 100%;
  display: block;
}

.btn btn-outline {
  background-color: #9f5f9a;
  color: white;
}
    
@media (max-width: 767px) {
  .card .img {
    height: 8em;
  }
}
/*responsive media queries */
@media screen and (max-width: 767px) {
  .card {
    width: 10%;
    height: 5%;
  border: 1px solid rgba(0, 0, 0, 0.749);

  }
}
</style>
