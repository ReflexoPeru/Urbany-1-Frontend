import React, { useState } from 'react'
import { GoogleLogo, FacebookLogo } from 'phosphor-react'
import ExpandableCard from '../../components/ExpandableCard'
import ConfirmModal from '../../../../components/ui/Modal/ConfirmModal'
import { useToast } from '../../../../contexts/ToastContext'

const Marketing = () => {
  const { toast } = useToast()
  const [pendingProvider, setPendingProvider] = useState(null)

  const handleOpenRequest = (provider) => {
    setPendingProvider(provider)
  }

  const handleConfirmRequest = () => {
    if (!pendingProvider) {
      return
    }
    if (pendingProvider === 'google') {
      toast.success(
        'Solicitud enviada',
        'Te enviamos el checklist para conectar Google Ads y asignaremos un especialista a tu cuenta.'
      )
    } else {
      toast.success(
        'Especialista en camino',
        'Coordinaremos contigo para validar tu Business Manager y activar las campañas en Meta Ads.'
      )
    }
    setPendingProvider(null)
  }

  return (
    <div style={{ marginLeft: '12px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
          Marketing
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ExpandableCard
            title="Google Ads"
            description="Integre Google Ads para publicar, editar y eliminar sus inmuebles."
            icon={<GoogleLogo size={20} weight="bold" color="#4285F4" />}
            infoTexts={[
              'Necesitas acceso de administrador a Google Ads y Google Tag Manager.',
              'Automatizamos campañas inteligentes que difunden todo tu inventario activo.',
              'Recibirás reportes semanales con el presupuesto invertido y los leads obtenidos.'
            ]}
            features={[
              'Anuncios dinámicos sincronizados con tu inventario',
              'Audiencias inteligentes basadas en tus contactos',
              'Panel consolidado en Urbany con métricas clave'
            ]}
            actionText="Solicitar activación de Google Ads"
            onActionPrimary={() => handleOpenRequest('google')}
          />

          <ExpandableCard
            title="Facebook Ads"
            description="Integre Facebook Ads para publicar, editar y eliminar sus inmuebles."
            icon={<FacebookLogo size={20} weight="bold" color="#1877F2" />}
            infoTexts={[
              'Necesitas un Business Manager con catálogo inmobiliario y pixel configurado.',
              'Creamos campañas con catálogo dinámico y remarketing automatizado.',
              'Centraliza leads de Facebook, Instagram y formularios instantáneos en el CRM.'
            ]}
            features={[
              'Campañas dinámicas para todo tu inventario',
              'Segmentación automática con audiencias similares',
              'Reportes de rendimiento integrados con Urbany'
            ]}
            actionText="Coordinar activación en Meta Ads"
            onActionPrimary={() => handleOpenRequest('meta')}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(pendingProvider)}
        onClose={() => setPendingProvider(null)}
        onConfirm={handleConfirmRequest}
        title="Solicitar soporte de marketing"
        message={
          pendingProvider === 'google'
            ? 'Validaremos tu cuenta de Google Ads y te acompañaremos con la configuración inicial.'
            : 'Un especialista del equipo revisará tu Business Manager y conectará el catálogo con Urbany.'
        }
        confirmText="Enviar solicitud"
        cancelText="Cancelar"
      />
    </div>
  )
}

export default Marketing
