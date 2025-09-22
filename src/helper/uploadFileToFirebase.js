import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Helper to upload file and return URL
const uploadFileToFirebase = async (file, folder) => {
  if (!file) return null;

  // Generate a unique filename: timestamp + original name
  const uniqueName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);

  const snapshot = await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

export default uploadFileToFirebase;
