import React from 'react';
import { Card } from 'antd';
import { Banknote } from 'lucide-react';

const WalletValue = ({ valuePen }) => {
  const formatted = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(valuePen || 0);
  return (
    <Card style={{ borderRadius: 12, height: '100%' }} bodyStyle={{ padding: 24, height: '100%', display:'grid', placeItems:'center' }}>
      <div style={{ display:'grid', placeItems:'center', gap: 12 }}>
        <div style={{ width: 90, height: 90, borderRadius: 999, background:'#e7f7ef', color:'#12b886', display:'grid', placeItems:'center' }}>
          <Banknote size={40} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 28, color:'#0a7a55' }}>{formatted}</div>
        <div style={{ fontWeight: 700 }}>Valor de la cartera</div>
      </div>
    </Card>
  );
};

export default WalletValue;


