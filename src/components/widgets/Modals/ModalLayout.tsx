import React, { ReactNode, useState } from "react";

interface IModalLayout {
  id: string;
  isShown: boolean;
  children: ReactNode;
}

const ModalLayout: React.FC<IModalLayout> = ({ id, isShown, children }) => {
  const [modalOpen, setModalOpen] = useState(isShown);

  return (
    <div
      id={id}
      onClick={() => setModalOpen(false)}
      className={`modalLayout modalOverlay / fixed z-50 w-screen h-screen bg-black/20 transition align-items-start pt-20 / ${
        modalOpen ? "flex" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default ModalLayout;

// default props
ModalLayout.defaultProps = {
  isShown: false,
};
