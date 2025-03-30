import Grid from '@mui/material/Grid';

import OverviewStats from '../overview-stats';
import OverviewRoomOccupancy from '../overview-room-occupancy';
import OverviewUpcomingReservations from '../overview-upcoming-reservations';

export default function OverviewView() {
  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={12}>
        <OverviewStats />
      </Grid>

      <Grid item xs={12} md={6}>
        <OverviewRoomOccupancy />
      </Grid>

      <Grid item xs={12} md={6}>
        <OverviewUpcomingReservations />
      </Grid>
    </Grid>
  );
} 