import { useConfirmModal } from '../../../../contexts/ConfirmModalContext';
import ConfirmModal from './ConfirmModal';

const ConfirmModalContainer = () => {
  const { modalConfig, closeModal } = useConfirmModal();

  return (
    <ConfirmModal
      isOpen={modalConfig.isOpen}
      onClose={closeModal}
      onConfirm={modalConfig.onConfirm}
      title={modalConfig.title}
      message={modalConfig.message}
      type={modalConfig.type}
      icon={modalConfig.icon}
      confirmText={modalConfig.confirmText}
      cancelText={modalConfig.cancelText}
      showCancel={modalConfig.showCancel}
    />
  );
};

export default ConfirmModalContainer;

