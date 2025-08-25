import { useMutation } from "convex/react";
import { useState, useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { AnonUserContext } from "./AnonUserContext";
import { useQueryWithStatus } from "./helper";

const storageKey = "sidbot_anon_user_id";

export const AnonUserProvider = ({ children }) => {
  const [anonUserId, setAnonUserId] = useState(() => localStorage[storageKey]);

  const createAnonymousUser = useMutation(api.users.createAnonymousUser);

  const anonUserQuery = useQueryWithStatus(
    api.users.findUser,
    anonUserId ? { id: anonUserId } : "skip"
  );

  useEffect(() => {
    if (anonUserId) {
      if (anonUserQuery.data) return;
      if (anonUserQuery.status === "pending") return;
      setAnonUserId(null);
      return;
    }

    createAnonymousUser()
      .then((id) => {
        localStorage[storageKey] = id;
        setAnonUserId(id);
      })
      .catch(console.error);
  }, [anonUserId, anonUserQuery.status, anonUserQuery.data, createAnonymousUser]);

  return (
    <AnonUserContext.Provider value={{ _id: anonUserId }}>
      {children}
    </AnonUserContext.Provider>
  );
};
