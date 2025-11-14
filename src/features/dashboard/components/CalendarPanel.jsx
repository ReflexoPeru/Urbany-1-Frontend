import React from 'react';
import { Card, Calendar } from 'antd';

const CalendarPanel = ({ value, onChange }) => {
  return (
    <Card bodyStyle={{ padding: 12 }} style={{ borderRadius: 12 }}>
      <Calendar fullscreen={false} value={value} onSelect={onChange} onChange={onChange} />
    </Card>
  );
};

export default CalendarPanel;


