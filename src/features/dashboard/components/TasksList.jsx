import React, { useMemo, useState } from 'react';
import { Card, List, Checkbox, Tag, Avatar, Input, Button, Select, Space, Popconfirm } from 'antd';

const INPUT_HEIGHT = 40;
const INPUT_WIDTH = 260;

const TasksList = ({ tasks, users, onAdd, onToggle, onDelete, onAssign }) => {
  const [title, setTitle] = useState('');
  const [assignees, setAssignees] = useState([]);
  const userOptions = useMemo(() => (users || []).map((u, i) => ({ label: u.name || `U${i+1}`, value: i })), [users]);

  return (
    <Card title={<div style={{ fontWeight: 800 }}>Mis Tareas de Hoy</div>} style={{ borderRadius: 12 }} bodyStyle={{ padding: 12 }} headStyle={{ padding: '12px 12px' }}>
      <div style={{ width: '100%', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Input size="middle" placeholder="Nueva tarea" value={title} onChange={(e)=>setTitle(e.target.value)} style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT }} />
        <Select size="middle" mode="multiple" allowClear placeholder="Asignar" value={assignees} onChange={setAssignees} options={userOptions} style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT }} />
        <Button size="middle" type="primary" style={{ height: INPUT_HEIGHT, background:'#12b886', borderColor:'#12b886' }} onClick={()=>{ onAdd?.(title, assignees.map(i=>users[i])); setTitle(''); setAssignees([]); }}>Agregar</Button>
      </div>
      <List
        size="small"
        style={{ maxHeight: 220, overflow: 'auto' }}
        dataSource={tasks}
        renderItem={(t) => (
          <List.Item
            actions={[
              <Tag color={t.done ? 'green' : 'gold'}>{t.done ? 'Completada' : 'Pendiente'}</Tag>,
              <Avatar.Group size="small" max={{ count: 3 }}>{(t.assignees||[]).map((u,idx)=>(<Avatar key={idx} src={u.avatar} />))}</Avatar.Group>,
              <Popconfirm title="Eliminar tarea?" onConfirm={()=>onDelete?.(t.id)}><Button size="small" danger>Eliminar</Button></Popconfirm>
            ]}
          >
            <Space>
              <Checkbox checked={t.done} onChange={()=>onToggle?.(t.id)} />
              <span>{t.title}</span>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TasksList;


