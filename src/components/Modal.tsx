import { XIcon } from "../icons/xmark";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose}>
              <XIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
