import React from 'react';
import { Card, Select } from 'antd';
import { Flag, MessageSquareText } from 'lucide-react';

const rowStyle = { display:'flex', alignItems:'center', justifyContent:'space-between', gap: 30 };

const ZoneFilters = ({ period, view, onChangePeriod, onChangeView }) => {
  return (
    <Card style={{ borderRadius: 12, height: '100%' }} bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
      <div style={{ display:'flex', flexDirection:'column', gap: 30 }}>
        <div style={{ display:'flex', flexDirection:'column', gap: 3 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>Análisis de ventas</div>
          <div style={{ color: '#64748b', fontWeight: 600, fontSize: 12 }}>Ajusta los filtros para explorar los datos</div>
        </div>
        <div style={rowStyle}>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <Flag size={18} />
            <div style={{ fontWeight: 800 }}>Ventas por zona</div>
          </div>
          <Select size="small" value={period} onChange={onChangePeriod} options={[{value:'Últ. trimestre',label:'Últ. trimestre'},{value:'Mes',label:'Mes'},{value:'Semana',label:'Semana'}]} />
        </div>
        <div style={rowStyle}>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <MessageSquareText size={18} />
            <div style={{ fontWeight: 800 }}>Viendo cant. de ventas</div>
          </div>
          <Select size="small" value={view} onChange={onChangeView} options={[{value:'Por barrio',label:'Por barrio'},{value:'Por zona',label:'Por zona'}]} />
        </div>
      </div>
    </Card>
  );
};

export default ZoneFilters;


