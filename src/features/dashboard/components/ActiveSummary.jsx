import React from 'react';
import { Card, CardContent, Grid, Box, Typography, alpha, Tooltip } from '@mui/material';
import { lighten } from '@mui/material/styles';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { Sparkle, UserRoundCheck, CalendarCheck } from 'lucide-react';

const SmallCard = ({ icon: Icon, label, value, color, filled = false, tooltip }) => (
  <Card
    elevation={filled ? 1 : 0}
    variant={filled ? 'elevation' : 'outlined'}
    sx={{
      borderRadius: 3,
      height: 150,
      width: 150,
      borderColor: filled ? 'transparent' : alpha(color, 0.35),
      bgcolor: filled ? color : 'transparent',
      fontFamily: 'Poppins, sans-serif',
      transition: 'transform .15s ease, box-shadow .15s ease, background-color .15s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 3,
        bgcolor: filled ? lighten(color, 0.05) : alpha(color, 0.08),
        borderColor: filled ? 'transparent' : alpha(color, 0.5)
      }
    }}
  >
    <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, fontFamily: 'Poppins, sans-serif' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: filled ? alpha('#ffffff', 0.2) : alpha(color, 0.12),
          color: filled ? '#ffffff' : color,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Icon size={18} />
      </Box>
      <Tooltip title={tooltip || ''} placement="top">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography fontWeight={700} fontSize={13} lineHeight={1.1} sx={{ color: filled ? '#ffffff' : 'inherit' }}>{label}</Typography>
          <Typography fontWeight={900} fontSize={18} sx={{ color: filled ? '#ffffff' : 'inherit', mt: 0.5 }}>{value}</Typography>
        </Box>
      </Tooltip>
    </CardContent>
  </Card>
);

const ActiveSummary = ({ counts, rate, spark, className = '' }) => {
  const green = '#38E47A';
  const green2 = '#22c55e';
  const green3 = '#16a34a';
  const total = (counts?.new ?? 0) + (counts?.contacted ?? counts?.contacted ?? 0) + (counts?.scheduled ?? 0);
  return (
    <Card className={className} sx={{ borderRadius: 2.5, fontFamily: 'Poppins, sans-serif' }}>
      <CardContent sx={{ p: 2, fontFamily: 'Poppins, sans-serif' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography fontWeight={800}>Negocios Activos</Typography>
          <Box sx={{ color: '#9ca3af' }}>•••</Box>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item><SmallCard icon={Sparkle} label="Nuevo Negocio" value={counts?.new ?? 0} color={green} filled tooltip="Oportunidades creadas recientemente" /></Grid>
          <Grid item><SmallCard icon={UserRoundCheck} label="Contactado" value={counts?.contacted ?? 0} color={green2} filled tooltip="Prospectos contactados por el equipo" /></Grid>
          <Grid item><SmallCard icon={CalendarCheck} label="Visita programada" value={counts?.scheduled ?? 0} color={alpha(green3, 0.35)} tooltip="Reuniones o visitas agendadas" /></Grid>
        </Grid>
        <Box sx={{ display: 'grid', placeItems: 'center', mt: 2, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <Typography fontWeight={800} fontSize={24}>{rate?.percent ?? 0}%</Typography>
            <Typography fontWeight={700} sx={{ color: '#16a34a' }}>+{rate?.delta ?? 0}%</Typography>
            <Typography fontWeight={700} sx={{ color: '#0f172a' }}>Total: {total}</Typography>
          </Box>
          <Typography fontWeight={600} fontSize={12} sx={{ color: '#64748b' }}>Tendencia de finalización a tiempo</Typography>
          <Box sx={{ width: 300, height: 80 }}>
            <ResponsiveContainer>
              <AreaChart data={spark} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                <defs>
                  <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={green} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f6" />
                <Area type="monotone" dataKey="y" stroke={green} fill="url(#spark)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActiveSummary;


