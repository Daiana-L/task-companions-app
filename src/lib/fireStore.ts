import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addEvent = async ({ title, description, deadline }) => {
    return await addDoc(collection(db, "tasks"), {
        title,
        description,
        deadline,
        status: false
    });
};

export const getEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const events = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return events;
}
