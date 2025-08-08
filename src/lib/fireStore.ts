import { db } from "../firebase/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp,
    query,
    where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const userSchema = {
    uid: "string",
    email: "string",
    createdAt: "timestamp",
    updateAt: "timestamp",
    lastLogin: "timestamp",
    displayName: "string",
};

const taskSchema = {
    title: "string",
    description: "string",
    createdAt: "timestamp",
    createdBy: "string",
    assignedTo: "string",
    deadline: "timestamp",
    status: "boolean",
};

export const addEvent = async ({ title, description, deadline, assignedTo }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    return await addDoc(collection(db, "tasks"), {
        title,
        description,
        deadline,
        status: false,
        createdAt: Timestamp.now(),
        createdBy: user.email,
        assignedTo
    });
};

export const getEvents = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;

    // Filtra tareas donde el campo uid coincida con el del usuario
    const tasksQuery = query(
        collection(db, "tasks"),
        where("createdBy", "==", user.email)
    );
    const querySnapshot = await getDocs(tasksQuery);
    const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return events; //retorna los eventos del usuario que coincida con el uid autenticado en el momento
};

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

export const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser; //devuelve el usuario logueado actual

    if (!user) return null; // se retorna null si no hay usuario

    const data = query(
        collection(db, "users"), // apunta a la coleccion users. query arma la consulta
        where("uid", "==", user.uid) // where filtra documentos con una condicion.
    ); // filtra los documentos por el email del usuario logueado
    const querySnapshot = await getDocs(data); //ejecuta la consulta en firestore

    if (querySnapshot.empty) return null; // si no encuentra ningun documento que coincida retorna null

    const doc = querySnapshot.docs[0]; // se toma el primer documento con los resultados y se asume que solo hay uno por email
    return {
        // retornamos los datos del documento
        id: doc.id,
        ...doc.data(),
    };
};
