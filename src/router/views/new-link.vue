<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      title: '',
      file: null,
      uploadMessage: '',
      details: '',
      uploadedfile: '',
      fieldState: 0,
      qrcodeView: '',
      uploadButton: {
        display: true,
      },
    }
  },
  watch: {
    file(newState, oldState) {
      if (newState !== null) {
        console.log(this.file)
        this.onSubmit()
      }
    },
  },
  methods: {
    changeFieldState(index) {
      this.fieldState = index
    },

    async onSubmit() {
      let NotificatinOption = {
        type: 'error',
        text: ' Please fill Tilte input',
        title: 'Error Validation',
      }
      if (!this.$notification(this.title, NotificatinOption)) {
        return false
      }
      // check if user select file
      if (!this.file) {
        this.uploadHandler()
        return false
      }

      this.uploadButton.display = false

      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios
          .post('http://localhost:3000/v1/links/upload', formData, {
            onUploadProgress(p) {
              console.log(p)
            },
          })
          .then((res) => {
            console.log(res)
            if (res.data.file) {
              setTimeout(() => {
                this.changeFieldState(1)
                this.uploadButton.display = true
              }, 1000)
              this.uploadedfile = res.data.file._id
            } else {
              alert('Please Try Again')
              return false
            }
          })
        this.$notify({
          group: 'alert',
          type: 'successs',
          title: 'UPLOAD SUCCESS',
          text: 'your file uploaded successfully',
        })
      } catch (err) {
        this.$notify({
          group: 'alert',
          type: 'error',
          title: 'Please Try Again',
          text: 'Internal Server Error',
        })
        console.log('Error happen in submit form handler')
        console.log(err.respons || err)
        console.log('--------------')
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
    async generateLinkFromServer() {
      const fileId = this.uploadedfile
      const title = this.title
      const details = this.details

      if (this.title == '' || this.title.trim().length == 0) {
        this.$notify({
          group: 'alert',
          type: 'error',
          title: 'Please Fill Title Field',
          text: 'Validation Error',
        })
        return false
      }

      try {
        await axios
          .post('http://localhost:3000/v1/links', {
            title: title,
            file_id: fileId,
            description: details,
          })
          .then((res) => {
            console.log(res)
            if (res.data) {
              this.qrcodeView = res.data.link.qrcode_img
              this.changeFieldState(2)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
        console.log('error happen in submit handler')
      }
    },
  },
  page: {
    title: 'NewLink',
    meta: [{ name: 'description', content: 'NewLink' }],
  },
}
</script>

<template>
  <div class=" new-link-container pt-5">
    <div class="row">
      <div class="col-12 px-2">
        <div class="d-flex justify-content-center flex-column px-5">
          <form id="msform">
            <!-- progressbar -->
            <ul id="progressbar">
              <li
                :class="{ active: fieldState === 0 }"
                @click="changeFieldState(0)"
                >آپلود فایل</li
              >
              <li
                :class="{ active: fieldState === 1 }"
                @click="changeFieldState(1)"
                >ثبت توضیحات</li
              >
              <li
                :class="{ active: fieldState === 2 }"
                @click="changeFieldState(2)"
                >دریافت کد
              </li>
            </ul>
            <!-- fieldsets -->
            <transition-group name="bounce">
              <fieldset
                v-if="fieldState == 0"
                key="0"
                style="padding-bottom:140px"
              >
                <h2 class="font-iranSans fs-title"
                  >فایل خود را اینجا آپلود کنید</h2
                >

                <input
                  v-model="title"
                  type="text"
                  name="email"
                  placeholder="Title"
                />
                <!-- <input
                  readonly
                  placeholder="upload your file"
                  @click="uploadHandler"
                /> -->
                <!-- Uploader Button -->

                <div class="button">
                  <transition name="bounce">
                    <a
                      :style="{ opacity: title.length === 0 ? '0.3' : '1' }"
                      :disabled="true"
                      @click="onSubmit"
                    >
                      <span class="font-iranSans">{{
                        uploadButton.display ? 'آپلود فایل' : 'منتظر باشید ..'
                      }}</span>
                      <svg
                        class="load"
                        version="1.1"
                        x="0px"
                        y="0px"
                        width="30px"
                        height="30px"
                        viewBox="0 0 40 40"
                        enable-background="new 0 0 40 40"
                      >
                        <path
                          opacity="0.3"
                          fill="#fff"
                          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
            s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
            c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                        />
                        <path
                          fill="#fff"
                          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
            C22.32,8.481,24.301,9.057,26.013,10.047z"
                        >
                          <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 20 20"
                            to="360 20 20"
                            dur="0.5s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                      <svg
                        class="check"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        />
                      </svg>
                    </a>
                  </transition>
                  <div>
                    <span></span>
                  </div>
                </div>

                <!-- end  -->
                {{ uploadMessage }}
                <input
                  ref="clicked"
                  type="file"
                  name="file"
                  placeholder="upload your file"
                  @change="onSelect"
                />

                <!-- <input
                  type="button"
                  name="next"
                  class="next action-button"
                  value="Next"
                  @click="changeFieldState(1)"
                /> -->
              </fieldset>

              <fieldset v-if="fieldState == 1" key="1">
                <h2 class="font-iranSans fs-title">توضیحات </h2>
                <h3 class="font-iranSans fs-subtitle"
                  >اگر توضیحات بیشتری دارید اینجا بنویسید</h3
                >
                <textarea
                  v-model="details"
                  draggable="false"
                  class="textareaclass"
                ></textarea>

                <input
                  type="button"
                  name="previous"
                  class="previous action-button"
                  value="بازگشت"
                  @click="changeFieldState(0)"
                />
                <input
                  type="button"
                  name="next"
                  class="next action-button"
                  value="ارسال"
                  @click="generateLinkFromServer"
                />
              </fieldset>

              <fieldset v-if="fieldState == 2" key="2">
                <h2 class="font-iranSans fs-title">تبریک 😍 😍 </h2>
                <h5 class="font-iranSans fs-subtitle"
                  >درخواست شما با موفقیت انجام شد
                </h5>

                <a class="pt-5" :href="qrcodeView" download>
                  <img :src="qrcodeView" />
                </a>

                <div class="d-flex flex-row">
                  <a
                    style="width:250px;font-weight:200"
                    class="font-iranSans previous action-button"
                    :href="qrcodeView"
                    download
                  >
                    دانلود
                  </a>
                </div>
              </fieldset>
            </transition-group>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';
a:hover {
  color: white !important;
}
.col-12 {
  margin-top: 100px;
  padding-bottom: 50px;
  border-radius: 30px;
}

.new-link-container:before {
  width: 100%;
  height: 100%;
  z-index: 0;
  top: $size-top-navigation;
  position: absolute;
  content: '';
  background: linear-gradient(to bottom right, #b0db7d 40%, #99dbb4 100%);
}

input[type='file'] {
  display: none;
}

.justify-content-center {
  justify-content: center;
  padding-top: 30px;
}

.textareaclass {
  min-height: 130px;
  resize: none;
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
  border-radius: 15px 15px 4px 16px;
  box-shadow: 0 0 27px -2px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;
  /*stacking fieldsets above each other*/
  position: relative;
}
/*Hide all except first fieldset*/
#msform fieldset:first-child {
  // padding-bottom: 140px;
}
/*inputs*/

#msform input[name='next'],
#msform input[name='previous'] {
  font-weight: 300;
}

#msform input,
#msform textarea {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 20px auto;
  width: 100%;
  box-sizing: border-box;
  font-family: IranSans;
  color: #2c3e50;
  font-size: 13px;
}
/*buttons*/
#msform .action-button {
  width: 100px;
  background: #3f82d7;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 28px;
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
  font-size: 16px;
  text-transform: uppercase;
  color: #ac7d78;
  margin-bottom: 10px;
  font-weight: 360;
}
.fs-subtitle {
  font-weight: normal;
  font-size: 13px;
  color: #666;
  // margin-bottom: 20px;
  margin-top: -14px;
}
/*progressbar*/
#progressbar {
  margin-bottom: 65px;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  padding-left: 0;
  /*CSS counters to number the steps*/
  counter-reset: step;
}
#progressbar li {
  list-style-type: none;
  color: white;
  font-family: IranSans;
  text-transform: uppercase;
  font-size: 15px;
  width: 33.33%;
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
  margin: 0 auto 20px auto;
}

#progressbar li::after {
  position: absolute;
  top: 18px;
  left: -50%;
  z-index: -1;
  width: 100%;
  height: 2px;
  content: '';
  background: white;
}
#progressbar li:first-child::after {
  content: none;
}
/*marking active/completed steps green*/
/*The number of the step and the connector before it = green*/
#progressbar li.active:before,
#progressbar li.active:after {
  background: #27ae60;
  color: white;
}

.bounce-enter-active {
  animation: bounce-in 1.5s;
}

@keyframes bounce-in-left {
  0% {
    left: 0px;
  }
  100% {
    left: 3000px;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.button {
  border-radius: 28px;
  position: absolute;
  left: 50%;
  top: 80%;
  display: block;
  background: #fff;
  width: 150px;
  box-shadow: 0 2px 6px rgba(170, 185, 200, 0.4);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.button svg {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
  fill: #fff;
}
.button div {
  height: 4px;
  margin: -2px 0 0 0;
  position: absolute;
  top: 50%;
  left: 71px;
  right: 25px;
  background: #d3d7e0;
  display: none;
  border-radius: 2px;
}
.button div span {
  position: absolute;
  background: #28e470;
  height: 4px;
  left: 0;
  top: 0;
  width: 0;
  display: block;
  border-radius: 2px;
}
.button a {
  position: relative;
  display: block;
  background: #3f82d7;
  z-index: 2;
  line-height: 46px;
  height: 45px;
  border-radius: 28px;
  width: 100%;
  text-align: center;
  color: #fff;
  box-shadow: 0 2px 6px rgba(170, 185, 200, 0.4);
}
.button a span {
  cursor: pointer;
  display: block;
}
</style>
