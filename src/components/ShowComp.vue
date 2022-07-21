<template>
  <div class="container">
    <h3 style="color: #15245d; margin-top: 0px">
      Related tv shows based on your search {{ search }}
    </h3>
  </div>
  <div v-if="!shows.length">
    <n-space>
      <n-spin v-if="!shows" :show="true" size="large" spinner-animation-speed="7000s" />
    </n-space>
        <n-spin v-if="showSpinner" />
    <!-- <div
      class="spinner-border"
      style="width:10rem; height:10rem; spinner-animation-speed:3000s"
      role="status"
    >
 <span class="sr-only">Loading...</span>
     </div> -->
      
  
    <!--  <div
      class="text-center"
      v-if="loading"
      style="padding-top: 20px; padding-bottom: 20px"
    >
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div> -->
    <h4>sorry! no show with {{ search }}</h4>
    <img
      src="../assets/img/search.png"
      alt="noimage"
      style="object-fit: cover"
    />
  </div>
  <br />
  <div class="container px-5" id="card">
    <div class="row gx-3">
      <div
        class="col"
        v-for="(show, index) in pageOfItems"
        :key="index"
        style="margin-bottom: 4%"
      >
        <div class="card" style="width: 20rem; column-gap: 6px; height: 45rem">
          <div>
            <img
              v-if="show.show.image !== null && show.show.image !== ''"
              :src="show.show.image.medium"
              class="card-img-top"
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
              <h4 class="card-title" style="color: #9f5f9a">
                <b>{{ show.show.name }}</b>
              </h4>
              <h4>
                <p
                  class="card-text"
                  v-if="
                    show.show.rating.average !== null &&
                    show.show.rating.average !== ''
                  "
                >
                  Rating-{{ show.show.rating.average }}
                </p>
                <p v-else>No Rating</p>
              </h4>
              <a
                class="btn btn-outline"
                style="background-color: #7851a2; color: #fff"
                @click="info(show.show.id)"
                >To Know More</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="pageOfItems.length > 0">
    <center>
      <v-pagination
        v-model="page"
        :records="totalItems"
        :per-page="5"
        @paginate="onChangePage"
        style="list-style-position: outside"
      />
    </center>
  </div>

  <router-view :key="$route.path" />
</template>
<script>
//import { BSpinner } from 'bootstrap-vue'
import Axios from "axios";
//import { useQuasar } from "quasar";
//import { onBeforeUnmount } from "vue";
export default {
  name: "ShowComp",
  //   setup() {
  //     const $q = useQuasar();
  //     let timer;

  //     onBeforeUnmount(() => {
  //       if (timer !== void 0) {
  //         clearTimeout(timer);
  //         $q.loading.hide();
  //       }
  //     });
  //   },
  data() {
    return {
      search: this.$route.params.data,
      // search: this.$props.data,
      shows: [],
      loading: false,
       showSpinner: false,
      pageOfItems: [],
      page: 1,
      totalItems: 0,
      err: "",
    };
  },
  /*props:{
    data:{ 
      type:String,
      required:true,
       },
  },*/
  created() {
    this.getShows();
  },
  methods: {
    getShows() {
      console.log(this.search);
   this.showSpinner = true;
      this.loading = true;
      Axios.get("https://api.tvmaze.com/search/shows?q=" + this.search)
        .then((response) => {
          this.shows = response.data;
          console.log(response.data);
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
    onChangePage(myCallback) {
      // update page of items
      console.log(myCallback);
      const localShowArr = this.shows;
      this.pageOfItems = [];
      setTimeout(() => {
        this.pageOfItems = localShowArr.slice(
          5 * (myCallback - 1),
          5 * (myCallback - 1) + 5
        );
      }, 100);
    },
    /* showLoading() {
      $q.loading.show({
        message: "Doing something. Please wait...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 3000);
    }, */
  },
};
</script>

 <style>
.card:hover,
container px-6 {
  display: flex;
}
.card:hover {
  transform: scale(1.02);
  box-shadow: -5px 7px 20px 12px rgba(54, 3, 122, 0.76);
}

.container px-6 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: wrap;
  background-color: rgb(172, 186, 187);
}
a:hover {
  color: rgb(10, 149, 229);
}
.scrollup {
  text-align: right;
  scroll-behavior: smooth;
  font-size: 30px;
  padding: 5px 40px;
}
@media (max-width: 767px) {
  .card .img-wrapper {
    height: 10em;
  }
}
/*responsive media queries */
@media screen and (max-width: 767px) {
  .card {
    width: 30%;
    height: 5%;
    border: 1px solid rgba(0, 0, 0, 0.749);
  }
}

/*
@media screen and (max-width: 620px) {
  .container px-5 {
    width: 100%;
  }
  .container-fluid {
    padding: 20px;
    font-size: 20px;
  }
  .card {
    width: 60%;
  }
}
*/
#card {
  margin-top: 2%;
  margin-bottom: 2%;
}

.scrolltop {
  position: absolute;

  left: 50%;
  background-color: #7852a9;
  width: 60px;
  height: 50px;
}
.header-name {
  color: rgb(160, 9, 241);
  text-align: center;
}
.btn btn-outline {
  color: white;
  background-color: #7851a9;
}

.card {
  margin-left: 0%;
  background: rgb(246, 241, 246);
  border: 1px solid rgba(0, 0, 0, 0.749);
}
.pagination > li {
  display: block;
}

.VuePagination__pagination {
  align-items: center;
  position: relative;
}

/* .py-4 {
    padding-top: 1.5rem!important;
    padding-bottom: 1.5rem!important;
}

ul.VuePagination__pagination{
	min-width: 300px;
  display: block;
   border-radius: 4px;
  align-items: center;
  min-height: 10px;
	list-style: none;
	padding-top: 20px;
	}
	ul.VuePagination__pagination li {
		display: inline;
	}
  .nav .VuePagination__pagination{
padding: 10px -90px 6px -50px;
  } */
.pagination {
  width: 100%;
}
.pagination {
  margin-left: 0;
  margin-bottom: 1rem;
}
ul {
  margin-left: 1.25rem;
  list-style-type: disc;
}
.pagination li {
  margin-right: 0;
  border-radius: 0;
  font-size: 15px;
  display: inline-block;
}
.pagination::before,
.pagination::after {
  display: table;
  content: " ";
  flex-basis: 0;
  order: 1;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.VuePagination__count {
  color: aliceblue;
}
</style>


