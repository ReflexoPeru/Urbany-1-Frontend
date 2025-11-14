import React, { useMemo, useState } from 'react';
import { List, Checkbox, Avatar, Popconfirm } from 'antd';
import PanelCard from './ui/PanelCard/PanelCard';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import Select from '@components/ui/Select';
import Tag from '@components/ui/Tag';
import styles from './TasksList.module.css';

const TasksList = ({ tasks, users, onAdd, onToggle, onDelete, className = '' }) => {
  const [title, setTitle] = useState('');
  const [assignees, setAssignees] = useState([]);
  const userOptions = useMemo(
    () => (users || []).map((u, i) => ({ label: u.name || `U${i + 1}`, value: i })),
    [users]
  );

  const handleAddTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd?.(trimmed, assignees.map((i) => users[i]));
    setTitle('');
    setAssignees([]);
  };

  const handleAssignChange = ({ target }) => {
    setAssignees(target.value);
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <PanelCard title="Mis Tareas de Hoy" className={className} bodyClassName={styles.body}>
      <div className={styles.formRow}>
        <Input
          placeholder="Nueva tarea"
          value={title}
          onChange={handleInputChange}
          name="task-title"
          wrapperClassName={styles.inputField}
        />
        <Select
          placeholder="Asignar"
          value={assignees}
          onChange={handleAssignChange}
          options={userOptions}
          mode="multiple"
          allowClear
          name="task-assignees"
          wrapperClassName={styles.selectField}
        />
        <Button
          variant="primary"
          size="medium"
          onClick={handleAddTask}
          className={styles.submit}
        >
          Agregar
        </Button>
      </div>
      <List
        size="small"
        className={styles.list}
        dataSource={tasks}
        locale={{ emptyText: <div className={styles.empty}>Sin tareas asignadas por ahora.</div> }}
        renderItem={(t) => (
          <List.Item className={styles.item}>
            <div className={styles.itemMain}>
              <Checkbox checked={t.done} onChange={() => onToggle?.(t.id)} />
              <span className={styles.title}>{t.title}</span>
              <Tag
                size="small"
                className={t.done ? styles.statusDone : styles.statusPending}
              >
                {t.done ? 'Completada' : 'Pendiente'}
              </Tag>
            </div>
            <div className={styles.itemAside}>
              <Avatar.Group size="small" max={{ count: 3 }}>
                {(t.assignees || []).map((u, idx) => (
                  <Avatar key={idx} src={u?.avatar} alt={u?.name || `Asignado ${idx + 1}`} />
                ))}
              </Avatar.Group>
              <Popconfirm title="Eliminar tarea?" onConfirm={() => onDelete?.(t.id)}>
                <Button variant="danger" size="small">
                  Eliminar
                </Button>
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />
    </PanelCard>
  );
};

export default TasksList;


