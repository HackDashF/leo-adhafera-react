import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLists } from "../../hooks/useLists";
import CircularSpinner from "../../components/CircularSpinner";
import { ListCard } from "../../components/ListCard";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { TextInput } from "../../components/input/TextInput";
import { ListTypeSelect } from "../../components/ListTypeSelect";
import { ListTypes } from "../../types/List";
import { colors } from "../../TEMP_CSS";

// TODO:  move modals into separate components in this directory
// TODO: add explicit success feedback on list joined, created list, deleted list
// TODO: add drag and drop list re-ordering features

const SavedLists = () => {
  const navigate = useNavigate();
  const { lists, loading, error, deleteList, createList, joinList } =
    useLists();

  // Modal visibility state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Form State
  const [newListTitle, setNewListTitle] = useState("");
  const [newListType, setNewListType] = useState<ListTypes>("Basic");
  const [shareCode, setShareCode] = useState("");
  const [listToDelete, setListToDelete] = useState<number | null>(null);

  // Loading States
  const [creatingList, setCreatingList] = useState(false);
  const [joiningList, setJoiningList] = useState(false);
  const [deletingList, setDeletingList] = useState(false);

  // Error States
  const [createError, setCreateError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const clearCreateForm = () => {
    setNewListTitle("");
    setNewListType("Basic");
    setCreateError(null);
  };

  const clearJoinForm = () => {
    setShareCode("");
    setJoinError(null);
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingList(true);
    setCreateError(null);
    try {
      const listId = await createList(newListTitle, newListType);
      if (listId) {
        setCreateModalOpen(false);
        clearCreateForm();
        navigate(`/lists/${listId}`);
      }
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Failed to create list",
      );
    } finally {
      setCreatingList(false);
    }
  };

  const handleJoinList = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoiningList(true);
    setJoinError(null);
    try {
      await joinList(shareCode);
      setJoinModalOpen(false);
      clearJoinForm();
    } catch (err) {
      setJoinError(err instanceof Error ? err.message : "Failed to join list");
    } finally {
      setJoiningList(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!listToDelete) return;

    setDeletingList(true);
    try {
      await deleteList(listToDelete);
      setDeleteModalOpen(false);
      setListToDelete(null);
    } finally {
      setDeletingList(false);
    }
  };

  const handleDeleteRequest = (id: number) => {
    setListToDelete(id);
    setDeleteModalOpen(true);
  };

  if (loading) return <CircularSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Lists</h2>
        <div className="space-x-2">
          <Button text="New List" onClick={() => setCreateModalOpen(true)} />
          <Button text="Join List" onClick={() => setJoinModalOpen(true)} />
        </div>
      </div>

      {lists.map((list) => (
        <ListCard
          key={list.id}
          list={list}
          onUnsubscribe={handleDeleteRequest}
        />
      ))}

      {/* Create List Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          clearCreateForm();
        }}
        title="Create New List"
      >
        <form onSubmit={handleCreateList} className="space-y-4">
          {createError && (
            <div className="text-red-500 text-sm">{createError}</div>
          )}
          <div>
            <TextInput
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="List Title"
              borderColor={colors.inputBackground}
              required
            />
          </div>
          <div>
            <ListTypeSelect value={newListType} onChange={setNewListType} />
          </div>
          <div className="flex justify-end">
            <Button
              text="Create"
              type="submit"
              disabled={!newListTitle.trim() || creatingList}
              loading={creatingList}
            />
          </div>
        </form>
      </Modal>

      {/* Join List Modal */}
      <Modal
        isOpen={joinModalOpen}
        onClose={() => {
          setJoinModalOpen(false);
          clearJoinForm();
        }}
        title="Join List"
      >
        <form onSubmit={handleJoinList} className="space-y-4">
          {joinError && <div className="text-red-500 text-sm">{joinError}</div>}
          <div>
            <TextInput
              value={shareCode}
              onChange={(e) => setShareCode(e.target.value)}
              placeholder="Enter Share Code"
              borderColor={colors.inputBackground}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              text="Join"
              type="submit"
              disabled={!shareCode.trim() || joiningList}
              loading={joiningList}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setListToDelete(null);
        }}
        title="Confirm Action"
      >
        <div className="space-y-4">
          <p>
            {lists.find((l) => l.id === listToDelete)?.listUsers.length === 1
              ? "Are you sure you want to delete this list? This action cannot be undone."
              : "Are you sure you want to unsubscribe from this list? You can always rejoin later with a share code."}
          </p>
          <div className="flex justify-end space-x-2">
            <Button text="Cancel" onClick={() => setDeleteModalOpen(false)} />
            <Button
              text="Confirm"
              onClick={handleDeleteConfirm}
              loading={deletingList}
              disabled={deletingList}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SavedLists;
