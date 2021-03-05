import httpClient from '../httpClient'

class UploadAndParseFileService {
    uploadAndParseFile(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);

        return httpClient.post("/api/parseFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }
}

export default new UploadAndParseFileService()