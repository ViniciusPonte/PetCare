import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../services/api";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [type, setType] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(){
        const [storagedUser, storagedToken, storagedType] = await AsyncStorage.multiGet(['@petcare:user', '@petcare:token', '@petcare:type']);
        async function isTokenValid(){
          return await api.post("/validate", {
            token: JSON.parse(storagedToken[1]),
          }).then(response => {
            if(response.data.valid){
              api.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
              setUser(JSON.parse(storagedUser[1]));
              setType(JSON.parse(storagedType[1]));
              setToken(JSON.parse(storagedToken[1]));
              setLoading(false);
            }else{
              setUser(null);
              setType(null);
              setToken(null);
              AsyncStorage.clear();
              setLoading(false);
            }
          }).catch(err => {
            return;
          });
        }
        isTokenValid();
    }
    loadStoragedData();
  }, []);

  function signIn(response){
    setUser(response.user);
    setToken(response.token);
    setType(response.type);
    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;
    AsyncStorage.setItem("@petcare:user", JSON.stringify(response.user));
    AsyncStorage.setItem("@petcare:type", JSON.stringify(response.type));
    AsyncStorage.setItem("@petcare:token", JSON.stringify(response.token));
  }

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@petcare:token','@petcare:user', '@petcare:type']);
    setUser(null);
    setType(null);
    setToken(null);
    AsyncStorage.clear();
  }, []);
  
  return (
    <AuthContext.Provider value={{signIn, signOut, user, type, setToken, userLocation, setUserLocation, setUser, token, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const { signIn, signOut, user, type, setToken, setUser, token, userLocation, setUserLocation, loading } = context;
  return { signIn, signOut, user, type, setToken, setUser, token, userLocation, setUserLocation, loading };
}
