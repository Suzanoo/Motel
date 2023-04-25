const Modal = ({ show, onClose, title, children }) => {
  const showHideClassName = show
    ? 'fixed z-10 inset-0 overflow-y-auto'
    : 'hidden';

  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="flex justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-lg">{title}</h2>
            <button
              className="text-gray-500 hover:text-gray-600"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
