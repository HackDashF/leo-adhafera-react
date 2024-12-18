import { BaseList } from "../../components/BaseList";
import { useLocalStorage } from "../../hooks/useLocalStorageList";

export const TempList = () => {
  const storage = useLocalStorage();
  return <BaseList storage={storage} temp />;
};

export default TempList;
