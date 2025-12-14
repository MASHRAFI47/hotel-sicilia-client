import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.init";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const auth = getAuth(app);

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(user)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = async () => {
        return signOut(auth)
    }


    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateUserProfile = async (fullName, photo) => {
        await updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: photo,
        }).then(() => {
            setUser({
                displayName: fullName,
                photoURL: photo,
            })
        }).catch((error) => {
            setLoading(false);
            console.log(error.message);
            toast.error(error.message);
        })
    }


    const saveUser = async (user) => {
        const currentUser = {
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            role: "guest",
            status: "verification needed",
        }

        const { data } = await axios.put(`${import.meta.env.VITE_Api_Url}/user`, currentUser)
        return data
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                await saveUser(currentUser)
                currentUser.reload();
            }
            else {
                setUser(null)
            }

            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = { user, loading, setLoading, createUser, updateUserProfile, signInUser, logOut, resetPass }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider