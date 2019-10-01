<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      name: '',
      file: null,
      uploadMessage: '',
      uploadedfile: '',
    }
  },
  methods: {
    async onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios
          .post('http://localhost:3000/v1/links/upload', formData)
          .then((res) => {
            console.log(res);
            if(res.data.file) {
              this.uploadedfile = res.data.file._id
            } else {
              alert('Please Try Again');
              return false;
            }
            })
        this.uploadMessage = 'yehhhh uploaded'
      } catch (err) {
        console.log('Error happen in submit form handler')
        console.log(err.respons || err)
        console.log('--------------')
        this.uploadMessage = 'fuck some thing happen'
      }
    },
    uploadHandler() {
      this.$refs.clicked.click()
      console.log(this.$refs)
    },
    onSelect() {
      console.log('selected')
      const file = this.$refs.clicked.files[0]
      this.file = file
    },
  },
  page: {
    title: 'NewLink',
    meta: [{ name: 'description', content: 'NewLink' }],
  },
}
</script>

<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12 px-2">
        <div class="d-flex justify-content-center flex-column px-5">
          <form id="msform">
            <!-- progressbar -->
            <ul id="progressbar">
              <li class="active">Account Setup</li>
              <li>Social Profiles</li>
              <li>Personal Details</li>
            </ul>
            <!-- fieldsets -->

            <fieldset>
              <h2 class="fs-title">Create your account</h2>
              <h3 class="fs-subtitle">This is step 1</h3>
              <input type="text" name="email" placeholder="Title" />
              <input
                readonly
                placeholder="upload your file"
                @click="uploadHandler"
              />
              {{ uploadMessage }}
              <input
                ref="clicked"
                type="file"
                name="file"
                placeholder="upload your file"
                @change="onSelect"
              />

              <input
                type="button"
                name="next"
                class="next action-button"
                value="Next"
                @click="onSubmit"
              />
            </fieldset>

            <fieldset>
              <h2 class="fs-title">Social Profiles</h2>
              <h3 class="fs-subtitle">Your presence on the social network</h3>
              <input type="text" name="twitter" placeholder="Twitter" />
              <input type="text" name="facebook" placeholder="Facebook" />
              <input type="text" name="gplus" placeholder="Google Plus" />
              <input
                type="button"
                name="previous"
                class="previous action-button"
                value="Previous"
              />
              <input
                type="button"
                name="next"
                class="next action-button"
                value="Next"
              />
            </fieldset>
            <fieldset>
              <h2 class="fs-title">Personal Details</h2>
              <h3 class="fs-subtitle">We will never sell it</h3>
              <input type="text" name="fname" placeholder="First Name" />
              <input type="text" name="lname" placeholder="Last Name" />
              <input type="text" name="phone" placeholder="Phone" />
              <textarea name="address" placeholder="Address"></textarea>
              <input
                type="button"
                name="previous"
                class="previous action-button"
                value="Previous"
              />
              <input
                type="submit"
                name="submit"
                class="submit action-button"
                value="Submit"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.col-12 {
  margin-top: 100px;
  border-radius: 30px;
  z-index: -2;
  width: 40vw;
  height: 250px;

  background: linear-gradient(to bottom right, #b0db7d 40%, #99dbb4 100%);
}

input[type='file'] {
  opacity: 0;
}

.justify-content-center {
  justify-content: center;
  padding-top: 30px;
}

/*form styles*/
#msform {
  width: 400px;

  text-align: center;
  position: relative;
}
#msform fieldset {
  background: white;
  border: 0 none;
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 20px 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;

  /*stacking fieldsets above each other*/
  position: relative;
}
/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
  display: none;
}
/*inputs*/
#msform input,
#msform textarea {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  color: #2c3e50;
  font-size: 13px;
}
/*buttons*/
#msform .action-button {
  width: 100px;
  background: #27ae60;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
}
#msform .action-button:hover,
#msform .action-button:focus {
  box-shadow: 0 0 0 2px white, 0 0 0 3px #27ae60;
}
/*headings*/
.fs-title {
  font-size: 15px;
  text-transform: uppercase;
  color: #2c3e50;
  margin-bottom: 10px;
}
.fs-subtitle {
  font-weight: normal;
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
}
/*progressbar*/
#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  padding-left: 0;
  /*CSS counters to number the steps*/
  counter-reset: step;
}
#progressbar li {
  list-style-type: none;
  color: white;
  text-transform: uppercase;
  font-size: 10px;
  width: 33.33%;
  float: left;
  border-radius: 100px;
  position: relative;
}
#progressbar li:before {
  content: counter(step);
  counter-increment: step;
  border-radius: 100px;
  width: 40px;
  line-height: 40px;
  display: block;
  font-size: 15px;
  color: #333;
  background: white;
  margin: 0 auto 5px auto;
}
/*progressbar connectors*/
#progressbar li:after {
  content: '';
  width: 100%;
  height: 2px;
  background: white;
  position: absolute;
  left: -50%;
  top: 18px;
  z-index: -1; /*put it behind the numbers*/
}
#progressbar li:first-child:after {
  /*connector not needed before the first step*/
  content: none;
}
/*marking active/completed steps green*/
/*The number of the step and the connector before it = green*/
#progressbar li.active:before,
#progressbar li.active:after {
  background: #27ae60;
  color: white;
}
</style>
