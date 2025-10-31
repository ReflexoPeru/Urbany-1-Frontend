import React from 'react';
import { Card, Progress, Avatar, Space } from 'antd';
import { BriefcaseBusiness, BadgeCheck, UsersRound } from 'lucide-react';

const StatCard = ({ icon: Icon, title, percent, current, total, users }) => (
  <Card bodyStyle={{ padding: 16 }} style={{ borderRadius: 12 }}>
    <Space direction="vertical" size={8} style={{ width: '100%' }}>
      <Space size={8} align="center">
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#e7f7ef', color: '#0ca678', display: 'grid', placeItems: 'center' }}>
          <Icon size={16} />
        </div>
        <div style={{ fontWeight: 700 }}>{title}</div>
      </Space>
      <div style={{ color: '#64748b', fontWeight: 600 }}>Progress</div>
      <Progress percent={percent} size="small" strokeColor="#12b886" showInfo={false} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontWeight: 700, color:'#0f172a' }}>{current}/{total}</div>
        <Avatar.Group size="small" max={{ count: 3 }}>
          {(users||[]).map((u,i)=>(<Avatar key={i} src={u} />))}
        </Avatar.Group>
      </div>
    </Space>
  </Card>
);

const StatsRow = ({ operations, sales, userOpen, users }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <StatCard icon={BriefcaseBusiness} title="Cantidad de Operaciones" percent={operations.percent} current={operations.current} total={operations.total} users={users} />
      <StatCard icon={BadgeCheck} title="Ventas Concretadas" percent={sales.percent} current={sales.current} total={sales.total} users={users} />
      <StatCard icon={UsersRound} title="Negocios abiertos por usuario" percent={userOpen.percent} current={userOpen.current} total={userOpen.total} users={users} />
    </div>
  );
};

export default StatsRow;


