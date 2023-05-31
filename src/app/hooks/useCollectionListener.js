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
          const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
          data(docs);
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
