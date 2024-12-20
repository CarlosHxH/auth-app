import { Box, Toolbar } from '@mui/material';
import FormComponent from './Form';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';

export default function InspectionPage() {
  return (
    <div>
      <ResponsiveAppBar title={"5sTransportes"} showBackButton/>
      <Box component="main" sx={{ flex: 1 }}>
        <Toolbar />
        <FormComponent />
      </Box>
    </div>
  );
}