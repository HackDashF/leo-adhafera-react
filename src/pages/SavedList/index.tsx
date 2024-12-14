import { useParams } from "react-router-dom";
import { BaseList } from "../../components/BaseList";
import { useAPIStorage } from "../../hooks/useAPIStorageList";

export const SavedList = () => {
  const { listID } = useParams();
  const storage = useAPIStorage(+(listID || 0));
  return <BaseList storage={storage} />;
};

export default SavedList;
