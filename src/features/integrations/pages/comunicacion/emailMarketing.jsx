import React, { useState } from 'react';
import { Check } from 'lucide-react';
import IntegrationAccordion from '../../components/IntegrationAccordion/IntegrationAccordion';
import Button from '../../../../components/ui/Button';
import ConfirmModal from '../../../../components/ui/Modal/ConfirmModal';
import { useToast } from '../../../../contexts/ToastContext';

const EmailMarketing = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [account, setAccount] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  const handleConnect = () => {
    if (!apiKey.trim() || !account.trim()) {
      toast.error('Campos incompletos', 'Completa la API Key y la cuenta antes de conectar.');
      return;
    }
    setPendingAction('connect');
  };

  const handleLearnMore = () => {
    setPendingAction('learn');
  };

  const handleConfirm = () => {
    if (pendingAction === 'connect') {
      toast.success('Integración en proceso', 'Nuestro equipo verificará tu API Key y conectará la cuenta de MyPerfit.');
    } else {
      toast.info('Guía enviada', 'Te compartimos la documentación recomendada para aprovechar MyPerfit.');
    }
    setPendingAction(null);
  };

  return (
    <div style={{ marginLeft: '12px' }}>
      <IntegrationAccordion
        title="MyPerfit"
        description="Administre sus propiedades en la red y qué hacer al cargar una nueva"
        icon={
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#3B82F6',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Check size={16} color="white" />
          </div>
        }
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          marginTop: '16px',
          gap: '20px'
        }}>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 8px 0'
            }}>
              Integración con MyPerfit
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 16px 0',
              lineHeight: '1.5'
            }}>
              Conecta con tu cuenta de MyPerfit para poder sincronizar los contactos y crear listas.
            </p>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Cuenta
            </label>
            <input
              type="text"
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button variant="success" size="small" onClick={handleConnect}>
              Conectar
            </Button>
            <Button
              variant="secondary"
              size="small"
              style={{
                background: '#ecfdf5',
                borderColor: '#bbf7d0',
                color: '#047857'
              }}
              onClick={handleLearnMore}
            >
              Aprender más
            </Button>
          </div>
        </div>
      </IntegrationAccordion>

      <ConfirmModal
        isOpen={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        onConfirm={handleConfirm}
        title="Integración con MyPerfit"
        message={
          pendingAction === 'connect'
            ? 'Registraremos tu solicitud y verificaremos la API Key para conectar MyPerfit con Urbany.'
            : 'Te enviaremos los recursos sugeridos para configurar listas y automatizaciones en MyPerfit.'
        }
        confirmText={pendingAction === 'connect' ? 'Enviar solicitud' : 'Recibir guía'}
        cancelText="Cancelar"
      />
    </div>
  );
};

export default EmailMarketing;