import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { useConfirmModal } from '../../contexts/ConfirmModalContext';
import { useLoading } from '../../contexts/LoadingContext';
import { allToasts } from '../../mock/toasts';
import { HashLoader } from 'react-spinners';

const ToastDemo = () => {
  const { toast } = useToast();
  const { confirmModal } = useConfirmModal();
  const { showLoading, hideLoading } = useLoading();

  const modalExamples = [
    {
      type: 'danger',
      label: 'Eliminar Propiedad',
      action: () => confirmModal.danger(
        'Eliminar Propiedad',
        '¿Estás seguro de que deseas eliminar la propiedad "Casa en la Playa"? Esta acción no se puede deshacer.',
        () => toast.success('Propiedad Eliminada', 'La propiedad se eliminó exitosamente', 3000, 'Trash'),
        { confirmText: 'Sí, eliminar', icon: 'Trash' }
      ),
    },
    {
      type: 'danger',
      label: 'Cerrar Sesión',
      action: () => confirmModal.warning(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        () => toast.info('Sesión Cerrada', 'Has cerrado sesión correctamente', 3000, 'SignOut'),
        { confirmText: 'Sí, cerrar sesión', icon: 'SignOut' }
      ),
    },
    {
      type: 'danger',
      label: 'Cancelar Cita',
      action: () => confirmModal.danger(
        'Cancelar Cita',
        '¿Deseas cancelar la cita programada para mañana a las 10:00 AM?',
        () => toast.warning('Cita Cancelada', 'La cita fue cancelada exitosamente', 3000, 'CalendarX'),
        { confirmText: 'Sí, cancelar', icon: 'CalendarX' }
      ),
    },
    {
      type: 'success',
      label: 'Publicar Propiedad',
      action: () => confirmModal.success(
        'Publicar Propiedad',
        '¿Deseas publicar esta propiedad ahora? Estará visible para todos los usuarios.',
        () => toast.success('Propiedad Publicada', 'La propiedad está ahora visible', 3000, 'Eye'),
        { confirmText: 'Sí, publicar', icon: 'Upload' }
      ),
    },
    {
      type: 'info',
      label: 'Guardar Cambios',
      action: () => confirmModal.info(
        'Guardar Cambios',
        'Tienes cambios sin guardar. ¿Deseas guardarlos antes de salir?',
        () => toast.success('Cambios Guardados', 'Los cambios se guardaron correctamente', 3000, 'FloppyDisk'),
        { confirmText: 'Guardar', icon: 'FloppyDisk' }
      ),
    },
    {
      type: 'warning',
      label: 'Archivar Contacto',
      action: () => confirmModal.warning(
        'Archivar Contacto',
        '¿Deseas archivar este contacto? Podrás restaurarlo más tarde.',
        () => toast.info('Contacto Archivado', 'El contacto fue archivado', 3000, 'Archive'),
        { confirmText: 'Archivar', icon: 'Archive' }
      ),
    },
    {
      type: 'danger',
      label: 'Eliminar Cuenta',
      action: () => confirmModal.danger(
        'Eliminar Cuenta',
        '¡Atención! Esta acción eliminará permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.',
        () => toast.error('Cuenta Eliminada', 'Tu cuenta ha sido eliminada', 3000, 'UserMinus'),
        { confirmText: 'Eliminar permanentemente', icon: 'Warning' }
      ),
    },
    {
      type: 'info',
      label: 'Descargar Reporte',
      action: () => confirmModal.info(
        'Descargar Reporte',
        '¿Deseas descargar el reporte mensual en formato PDF?',
        () => toast.success('Reporte Descargado', 'El reporte se descargó exitosamente', 3000, 'Download'),
        { confirmText: 'Descargar', cancelText: 'Ahora no', icon: 'FilePdf' }
      ),
    },
  ];

  const handleReloadPage = () => {
    showLoading('Recargando página...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleTestLoading = () => {
    showLoading('Cargando datos...');
    setTimeout(() => {
      hideLoading();
      toast.success('Datos cargados', 'Los datos se cargaron exitosamente', 3000, 'CheckCircle');
    }, 3000);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 24px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '48px'
      }}>
        <h1 style={{
          margin: '0 0 12px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '42px',
          fontWeight: '700',
          color: '#1a1a1a',
          lineHeight: '1.2'
        }}>Toasts</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {allToasts.map((toastData) => (
          <button
            key={toastData.id}
            onClick={() => toast[toastData.type](toastData.title, toastData.message, toastData.duration, toastData.icon)}
          >
            {toastData.title}
          </button>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        marginTop: '60px'
      }}>
        <h1 style={{
          margin: '0 0 12px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '42px',
          fontWeight: '700',
          color: '#1a1a1a',
          lineHeight: '1.2'
        }}>Modals</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {modalExamples.map((example, index) => (
          <button
            key={index}
            onClick={example.action}
          >
            {example.label}
          </button>
        ))}
      </div>


      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        marginTop: '60px'
      }}>
        <h1 style={{
          margin: '0 0 12px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '42px',
          fontWeight: '700',
          color: '#1a1a1a',
          lineHeight: '1.2'
        }}>Loading Spinner</h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <button onClick={handleReloadPage}>
          <HashLoader size={20} color="#000000" />
          Recargar Página
        </button>

        <button onClick={handleTestLoading}>
          Probar Loading
        </button>
      </div>

    </div>
  );
};

export default ToastDemo;
