import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal } from "../components/ui/modal/modal.component";

type ModalContextType = {
  openModal: (modalConfig: ModalConfig) => void;
  closeModal: () => void;
  isModalOpen: boolean;
};

type ModalConfig = {
  title?: string;
  component: ReactNode;
  animationType?: "slide" | "fade" | "none";
  presentationStyle?:
    | "fullScreen"
    | "pageSheet"
    | "formSheet"
    | "overFullScreen";
  slideDirection?: "bottom" | "top" | "left" | "right";
  onDismiss?: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const openModal = (config: ModalConfig) => {
    setModalConfig(config);
  };

  const closeModal = () => {
    if (modalConfig?.onDismiss) {
      modalConfig.onDismiss();
    }
    setModalConfig(null);
  };

  const isModalOpen = !!modalConfig;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}

      <Modal
        visible={isModalOpen}
        onClose={closeModal}
        title={modalConfig?.title}
        animationType={modalConfig?.animationType}
        presentationStyle={modalConfig?.presentationStyle}
        slideDirection={modalConfig?.slideDirection}
      >
        {modalConfig?.component}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
