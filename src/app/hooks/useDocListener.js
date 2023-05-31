import { useEffect } from "react";

import { dataFromSnapshot } from "../firebase/firestoreService";
import { message } from "antd";

export default function useFirestoreCollection({
  query,
  data,
  deps,
  stopListener,
  shouldExecuteQuery,
}) {
  useEffect(() => {
    let unsubscribe = () => {};
    if (shouldExecuteQuery) {
      unsubscribe = query().onSnapshot(
        (snapshot) => {
          data(dataFromSnapshot(snapshot));
        },
        (error) => message.error(error.message)
      );
    }
    return () => {
      if (stopListener) {
        unsubscribe();
      }
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
