<template style="color:#fff">
  <nav
    class="navbar navbar-expand-sm navbar-light"
    style="margin-top: 0px; height: 50px"
  >
    <h3 style="color: #15245d; text-align: center" class="show-for-medium">
      {{ show.name }} Show Information
    </h3>
  </nav>
  <nav
    class="navbar navbar-expand navbar-light bg-light"
    style="background-color: #2f5a6a"
  >
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" style="padding-right: 10px">
            <a
              class="nav-link active"
              aria-current="page"
              href="/show/:data/seasons"
              @click="info(season.id)"
              >Season</a
            >&nbsp;&nbsp;
          </li>
          <li class="nav-item" style="padding-right: 10px">
            <a class="nav-link active" href="#episode">Episode</a>&nbsp;&nbsp;
          </li>

          <li class="nav-item" style="padding-right: 10px">
            <a
              class="nav-link active"
              href="/show/:data/cast"
              @click="info(cast.id)"
              >Cast</a
            >&nbsp;&nbsp;
          </li>
          <li class="nav-item" style="padding-right: 10px">
            <a class="nav-link active" href="#crew">Crew</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div
    class="container-fluid"
    id="viewmovies"
    v-if="show !== '' && show.length !== 0"
  >
    <div class="row">
      <div class="col-sm-4" v-if="show !== null" style="margin-top: 5px">
        <img
          v-bind:src="show.image.medium"
          v-if="show.image != undefined"
          class="rounded mx-auto d-block"
          style="
            margin-bottom: 2%;
            object-fit: scale-down;
            border: 2px solid #55245d;
          "
        />
        <img
          v-else
          src="../assets/img/np.webp"
          style="
            height: 38rem;
            width: 20rem;
            object-fit: fill;
            border: 1px solid black;
          "
        />
      </div>
      <div class="col-sm-6" style="margin-top: 0px; align: center">
        <div class="viewmovies">
          <center>
            <ul class="text-md-start" style="text-align: center">
              <h4>
                <li><b>Name-</b>{{ show.name }}</li>
                <li
                  class="text"
                  v-if="
                    show.rating.average !== null &&
                    show.rating.average !== undefined
                  "
                >
                  <b>Rating</b>-{{ show.rating.average }} <br />
                </li>
                <li><b>Show Type-</b>{{ show.type }}<br /></li>
                <li><b>Language-</b>{{ show.language }}</li>

                <li v-if="show.genres !== null && show.genres.length > 0">
                  <b>Genres-</b>
                  <span v-for="genre in show.genres" :key="genre">
                    {{ genre }}
                  </span>
                </li>
                <samp v-else> <b>Genres-</b>NA</samp>

                <!--
                <li v-for="(genre,index) in genres" :key="index">genres names-{{ show.genre }}. {{show.index}}</li>
     -->
                <li><b>Network-</b> {{ show.network.name }}</li>
                <li><b>Network Country-</b> {{ show.network.country.name }}</li>
                <li>
                  <b>Schedule Day-</b>
                  <tt v-if="show.schedule.days.length > 0">
                    <span v-for="day in show.schedule.days" :key="day">
                      {{ day }}
                    </span></tt
                  ><samp v-else>NA</samp>
                </li>
                <li>
                  <b>Schedule Time-</b>
                  <time
                    v-if="
                      show.schedule.time !== '' && show.schedule.time !== null
                    "
                    >{{ show.schedule.time }} </time
                  ><time v-else>NA</time>
                </li>

                <li v-if="show.premiered !== '' && show.premiered !== null">
                  <b>Premiered-</b>{{ show.premiered }}
                </li>
                <samp v-else>NA</samp>
                <li><b>Status-</b>{{ show.status }}</li>
                <li v-if="show.ended !== null">
                  <b>Ended-</b>{{ show.ended }}<br />
                </li>

                <li v-if="show.network.officialSite !== null">
                  <b>Network Site-</b
                  ><a href="">{{ show.network.officialSite }}</a>
                </li>
                <li v-if="show.officialSite !== null">
                  <b>officialSite </b>-<a href="">{{ show.officialSite }} </a
                  ><br />
                </li>

                <b style="color: #15245d">Summary</b>
                <p
                  v-if="show.summary !== null && show.summary !== ''"
                  v-html="show.summary"
                ></p>
                <p v-else>NA</p>
              </h4>
            </ul>
          </center>
        </div>
      </div>
    </div>

    <h4 id="season" style="color: #18245d; margin-top: 2%; font-size: 20px">
      <b>Show Seasons</b>
    </h4>
    <div v-if="season.length > 0 && season !== null">
      <div class="container">
        <div class="row" v-for="s in season" :key="s">
          <div class="col-sm-4">
            <div v-if="s.image == null">
              <h5>
                <img
                  src="../assets/img/noimage.jpg"
                  alt="NA"
                  style="
                    width: 200px;
                    height: 200px;
                    object-fit: scale-down;
                    border: 2px solid #15245d;
                  "
                />
              </h5>
            </div>
            <img
              v-else
              v-bind:src="s.image.medium"
              class="img-rounded"
              style="
                object-fit: fill;
                margin-bottom: 1%;
                border: 3px solid #15245d;
              "
              alt="no img"
            />
          </div>
          <div
            class="col-sm-8"
            style="
              color: black;
              text-align: center;
              margin-bottom: 2%;
              border-style: ridge;
              border-color: #18265d;
            "
          >
            <ul>
              <li><b>Season</b>-{{ s.number }}</li>
              <li><b> PremiereDate</b>-{{ s.premiereDate }}</li>
              <label><b> Summary</b></label>
              <li
                v-if="s.summary !== null && s.summary !== ''"
                v-html="s.summary"
              ></li>
              <li v-else>NA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else><strong style="color: brown">No Season Available</strong></div>

    <div id="episode">
      <h4 style="font-size: 20px; margin-top: 2%"><b>Show Episodes</b></h4>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="collapse"
      data-target="#demo"
    >
      click to know Info
    </button>
    <div v-if="episode.length > 0">
      <div id="demo" class="collapse">
        <table style="border: 1px solid #7851a9">
          <tr>
            <th>Season</th>
            <th>AirDate</th>
            <th>Name</th>
            <th>Summary</th>
            <th>Rating</th>
          </tr>

          <tr v-for="e in episode" :key="e">
            <td v-if="e.season !== null && e.season !== ''">
              {{ e.season }}
            </td>
            <td v-else>NA</td>
            <!-- <td v-if="e.number !== null && e.number !== ''">{{ e.number }}</td>
          <td v-else>NA</td> -->
            <td v-if="e.airdate !== null && e.airdate !== ''">
              {{ e.airdate }}
            </td>
            <td v-else>NA</td>
            <td>{{ e.name }}</td>
            <td
              v-if="e.summary !== null && e.summary !== ''"
              v-html="e.summary"
            ></td>
            <td v-else>NA</td>
            <td v-if="e.rating.average !== null && e.rating.average !== ''">
              {{ e.rating.average }}
            </td>
            <td v-else>NA</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>
      <strong style="color: brown">No Episodes Available</strong>
    </div>

    <!--  <h4 id="cast"><b>Cast</b>&nbsp;Details</h4>
  <div v-if="cast.length > 0">
    <div class="container" style="border-style: groove">
      <div class="row row-cols-1 row-cols-lg-6 g-2 g-lg-2">
        <div class="col" v-for="c in cast.slice(0, 10)" :key="c">
      
          <div class="p-1 border bg-light" style="border: 2px solid black">
            <div v-if="c.person.image == null && c.person.image == ''">
              <h5>
                <img
                  src="../assets/img/userimage.png"
                  class="img-rounded"
                  alt="NA"
                  style="
                    width: 200px;
                    height: 190px;
                    object-fit: cover;
                    border: 3px solid #15245d;
                  "
                />
              </h5>
            </div>
            <img
              v-else
              v-bind:src="c.person.image.medium"
              class="img-rounded"
              style="
                width: 200px;
                height: 205px;
                object-fit: fill;
                margin-bottom: 2%;
                border: 1px solid #15245d;
              "
            />
            <div class="title" style="color: black" v-if="c != null">
              {{ c.person.name }}
            </div>

            <div class="title" style="color: black">
              As {{ c.character.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
  <div v-else style="color: red">NO Cast Available</div> -->
    <h4 id="crew" style="margin-top: 2%"><b>Cast</b>&nbsp;Details</h4>
    <div class="container">
      <div
        class="row row-cols-1 row-cols-lg-6 g-2 g-lg-2"
        v-if="cast.length > 0"
        style="border-style: solid"
      >
        <div class="col" v-for="c in cast.slice(0, 10)" :key="c">
          <div class="p-1 border bg-gray">
            <div v-if="c.person.image == null && c.person.image == ''">
              <h5 style="color: #fff">
                <img
                  src="../assets/img/userimage.png"
                  class="img-thumbnail"
                  alt="NA"
                  style="
                    width: 200px;
                    height: 190px;
                    object-fit: cover;
                    border: 1px solid #15245d;
                  "
                />
              </h5>
            </div>

            <img
              v-else
              v-bind:src="c.person.image.medium"
              class="img-thumbnail"
              alt="NO Image"
              style="
                width: 200px;
                height: 205px;
                object-fit: fill;
                margin-bottom: 2%;
                border: 1px solid #15245d;
              "
            />
            <div class="title" style="color: black" v-if="c != null">
              {{ c.person.name }}
            </div>

            <div class="title" style="color: black">
              As {{ c.character.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-else><b style="color: brown">No Cast Available</b></div>
    </div>
    &nbsp;

    <h4 id="crew" style="margin-top: 2%"><b>Crew</b>&nbsp;Details</h4>
    <div class="container">
      <div
        class="row row-cols-1 row-cols-lg-6 g-2 g-lg-2"
        v-if="!loadingCrews && crew.length > 0"
        style="border-style: ridge"
      >
        <div class="col" v-for="crews in crew.slice(0, 10)" :key="crews">
          <div class="p-1 border bg-gray" v-if="showLessCrews">
            <div v-if="crews.person.image == null && crews.person.image == ''">
              <h5 style="color: black">
                <img
                  src="../assets/img/userimage.png"
                  class="img-thumbnail"
                  alt="NA"
                  style="
                    width: 200px;
                    height: 190px;
                    object-fit: cover;
                    border: 1px solid #15245d;
                  "
                />
              </h5>
            </div>

            <img
              v-else
              v-bind:src="crews.person.image.medium"
              class="img-thumbnail"
              alt="NO Image"
              style="
                width: 200px;
                height: 205px;
                object-fit: fill;
                margin-bottom: 2%;
                border: 1px solid #15245d;
                color: black;
              "
            />
            <div class="title" style="color: black">
              {{ crews.person.name }}
            </div>
            <div class="title" style="color: black">As {{ crews.type }}</div>
          </div>
        </div>
      </div>
      &nbsp;
      <div v-else><b style="color: brown">No Crew Available</b></div>
      <button
        class="btn btn-info"
        v-if="!loadingCrews && crew.length > 0"
        @click="showLessCrews = !showLessCrews"
      >
        {{ showLessCrews === true ? "Show Less crews" : "Show All Crews" }}
      </button>
    </div>
<!--carousel for crews-->
    <n-carousel trigger="hover">
      <div class="carousel-img" v-for="crews in crew" :key="crews">
     <img v-if="crews.person.image == null && crews.person.image == ''"
        src="../assets/img/userimage.png"
      />
      <img v-else v-bind:src="crews.person.image.medium" /> 
    </div>
    </n-carousel>
  </div>
  <div v-else>
    <strong style="font-size: 24px">No Show Info Available</strong>
  </div>

  <div class="scrollup">
    <a href="/"><i class="fa fa-home" style="color: #7852a9"></i></a>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  name: "ShowInfo",
  data() {
    return {
      id: this.$route.params.data,
      id1: this.$route.params.data,
      id2: this.$route.params.data,
      id3: this.$route.params.data,
      id4: this.$route.params.data,
      loadingCrews: false,
      showLessCrews: true,
      show: [],
      season: [],
      episode: [],
      cast: [],
      crew: [],
    };
  },

  created() {
    this.getUser();
    this.getSeasons();
    this.getEpisodeInfo();
    this.getInfo();
    this.getCrewInfo();
  },
  methods: {
    getUser() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows/" + this.id)
        .then((response) => {
          console.log(this.show);
          this.show = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong....";
          console.log("error", err);
        });
    },
    getSeasons() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows/" + this.id4 + "/seasons")
        .then((response) => {
          this.season = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong....";
          console.log("error", err);
        });
    },

    getEpisodeInfo() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/seasons/" + this.id3 + "/episodes")
        .then((response) => {
          this.episode = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong....";
          console.log("error", err);
        });
    },
    getInfo() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows/" + this.id1 + "/cast")
        .then((response) => {
          this.cast = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong..";
          console.log("error", err);
        });
    },
    getCrewInfo() {
      console.log(this.search);
      this.loading = true;
      Axios.get("https://api.tvmaze.com/shows/" + this.id2 + "/crew")
        .then((response) => {
          this.crew = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch((err) => {
          this.laoding = false;
          this.err = "Something went wrong..";
          console.log("error", err);
        });
    },
  },
};
/* virual scroll*/
</script>

<style scoped>
ul {
  list-style-type: none;
}
.contanier-fluid {
  background-color: rgb(13, 11, 11);
  top: 5px;
}
.cat-heading1 {
  position: absolute;
}

.viewmovies {
  border-style: none;
  margin-bottom: 5px;
}
#viewmovies {
  border-image-outset: 6px solid #15245d;
  border-color: #7852a9;
}
.viewmovies {
  display: inline-block;
}
.col-sm img {
  border: 2px solid #7852a9 rounded corners;

  image-rendering: initial;
  border-image: -1px 9px 40px -12px rgba(119, 3, 125, 0.76);
}
/*responsive media queries */
@media screen and (max-width: 767px) {
  .card {
    width: 30%;
    height: 5%;
  }
}
@media (max-width: 767px) {
  .card .img-wrapper {
    height: 10em;
  }
}

.column {
  float: center;
  width: 33.33%;
  padding: 5px;
}

@media screen and (max-width: 767px) {
  .col {
    width: 30%;
    height: 5%;
  }
}
td,
th,
tr {
  border: 2px solid #15245d;
  text-align: center;
  padding: 5px;
}
tr:nth-child(even) {
  background-color: #c1c1c1;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin-left: 70px;
}
span:not(:last-child):after {
  content: " | ";
  white-space: pre-wrap;
}

nav-link .a:hover {
  background-color: #1b0618;
  color: #7852a9;
}
/* a {
  box-shadow: inset 0 0 0 0 #54b3d6;
  color: #2f5a6a;
  margin: 0 -.25rem;
  padding: 0 .25rem;

}
a:hover {
  box-shadow: inset 100px 0 0 0 #54b3d6;
  color: white;
} */

.carousel-img {
  width: 40%;
  height: 200px;
  object-fit: fill;
}
</style>