import React from 'react';
import { Card, Select } from 'antd';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SalesChart = ({ data, period, onChangePeriod }) => {
  return (
    <Card style={{ borderRadius: 12 }} bodyStyle={{ padding: 16 }} title={<div style={{ fontWeight: 800 }}>Negocio abierto por etapa</div>} extra={<Select size="small" value={period} onChange={onChangePeriod} options={[{value:'Semanal',label:'Semanal'},{value:'Mensual',label:'Mensual'},{value:'Trimestral',label:'Trimestral'}]} /> }>
      <div style={{ width: '100%', height: 260, marginTop: 12 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#12b886" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#12b886" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="dia" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} domain={[0,100]} tickFormatter={(v)=>`${v}%`} />
            <Tooltip cursor={false} />
            <Area type="monotone" dataKey="valor" stroke="#12b886" fill="url(#colorValor)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SalesChart;


