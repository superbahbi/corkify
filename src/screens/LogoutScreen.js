import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { logout } from "../api/firebase";
const LogoutScreen = ({ navigation }) => {
  const { AuthSignOut } = useContext(AuthContext);
  const { UserRemoveData } = useContext(UserContext)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await logout();
      await AuthSignOut();
      await UserRemoveData();
      navigation.navigate("Offer");
    });

    return unsubscribe;
  }, [navigation]);
  return null;
};
export default LogoutScreen;
