import firebase from 'firebase/app';
import { firebaseApp } from "src/libs/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";


export async function uploadAndRetrieveDownloadURL(file) {
  const storage = getStorage();
  const storageRef = ref(storage, 'ClubUpdates/' + file.name);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Create a promise to wait for the upload to complete
  const uploadComplete = new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle progress here if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle any errors during upload
        console.error('Upload error:', error);
        reject(error);
      },
      () => {
        // Handle successful upload completion
        resolve(uploadTask.snapshot.ref);
      }
    );
  });

  try {
    // Wait for the upload to complete
    await uploadComplete;

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log('File available at', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

