import { useParams } from "react-router-dom";

const List = () => {
  const { listID } = useParams();
  return (
    <div>
      {/* we'll use the list name here later */}
      <h2>List {listID}</h2>
      {/* list items from server */}
    </div>
  );
};

export default List;
