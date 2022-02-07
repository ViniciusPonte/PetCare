import { Alert } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import { usePet } from '../contexts/pet';
import { api } from '../services/api';

export async function uploadToS3Post(file, data, token){
    const fileModificated = {
        uri: file,
        name: new Date().toString(),
        type: "image/jpg"
      }

      const options = {
        keyPrefix: '', // Ex. myuploads/
        bucket: 'uploads-petcare', // Ex. aboutreact
        region: 'us-east-1', // Ex. ap-south-1
        accessKey: 'AKIAS5GYDWEJAK6V3KPK',
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: '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',
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
      }

    RNS3.put(fileModificated, options).then(async response => {
        if (response.status !== 201) throw new Error("Failed to upload image to S3");
        else {
          await api.post('pets', {...data, photoUri: response.body.postResponse.location}, {
            headers: {
              Authorization: "Bearer " + token,
            }
          })
          .then(() => {return true})
          .catch(err => Alert.alert(err.response.data.error))
        };
        
      });
  }


  export async function uploadToS3Put(file, data, token, petId){
    const fileModificated = {
        uri: file,
        name: new Date().toString(),
        type: "image/jpg"
      }

      const options = {
        keyPrefix: '', // Ex. myuploads/
        bucket: 'uploads-petcare', // Ex. aboutreact
        region: 'us-east-1', // Ex. ap-south-1
        accessKey: 'AKIAS5GYDWEJAK6V3KPK',
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: '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',
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
      }

    RNS3.put(fileModificated, options).then(async response => {
        if (response.status !== 201) throw new Error("Failed to upload image to S3");
        else {
          await api.put(`pets/${petId}`, {...data, photoUri: response.body.postResponse.location}, {
            headers: {
              Authorization: "Bearer " + token,
            }
          })
          .then(() => {return true})
          .catch(err => Alert.alert(err.response.data.error))
        };
        
      });
  }