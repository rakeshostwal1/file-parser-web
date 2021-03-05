<template>
  <div>
    <div v-if="progress > 0" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

    <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button class="btn btn-success" :disabled="!selectedFile" @click="uploadFile">
      Upload & Scan
    </button>

    <div class="alert alert-light" role="alert">{{ message }}</div>

    <div class="card" v-if="fileDataList.length > 0">
      <div class="card-header">Last File Scanned Result</div>
      <b-table :fields="fields" :items="fileDataList" />
    </div>
  </div>
</template>

<script>
import UploadAndParseFileService from "../services/UploadAndParseFileService";

export default {
  name: "upload-files",
  data() {
    return {
      selectedFile: undefined,
      progress: 0,
      message: "",
      fields: [{key: "firstName", label: "First name"}, {key:'city', label:"City"}, {key: 'date', label:"Date"}],
      fileDataList: [],

      fileInfos: [],
    };
  },
  methods: {
    selectFile() {
      this.selectedFile = this.$refs.file.files[0];
    },
    uploadFile() {
      this.fileDataList = []
      this.progress = 0;
      this.message = ""
      UploadAndParseFileService.uploadAndParseFile(
        this.selectedFile,
        (event) => {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
      )
        .then((response) => {
          if (response.data.fileDataList.length == 0) {
            this.message = 'No Data found'
          }
          this.fileDataList = response.data.fileDataList
          this.selectedFiles = undefined;
          this.progress = 0;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.selectFile = undefined;
        });
    },
  },
};
</script>
