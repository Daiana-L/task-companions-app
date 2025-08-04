import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs , doc , deleteDoc,
  updateDoc, Timestamp
} from "firebase/firestore";

export const addEvent = async ({ title, description, deadline }) => {
    return await addDoc(collection(db, "tasks"), {
        title,
        description,
        deadline,
        status: false,
        createdAt: Timestamp.now(),
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

export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    console.log("Tarea eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
  }
};

export const toggleTaskStatus = async (taskId, currentStatus) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
        status: !currentStatus,
    });
};

export const updateTask = async (id, updatedData) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updatedData);
};