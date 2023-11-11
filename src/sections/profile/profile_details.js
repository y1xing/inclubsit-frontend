
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const ProfileDetails = (props) => {
  return (
    <Stack
      spacing={4}
    >
      <Card>
        <CardContent sx={{ pt: 0 }}>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">Details</Typography>
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mt: 3,
            }}
          >
            <PropertyList>
              <PropertyListItem
                align="horizontal"
                divider
                label="Email"
                value="2203123@singaporetech.edu.sg"
              />
              <PropertyListItem
                align="horizontal"
                divider
                label="Passsword"
                value="*********"
              />
              <PropertyListItem
                align="horizontal"
                divider
                label="Name"
                value="John Doe"
              />
              <PropertyListItem
                align="horizontal"
                label="Student ID"
                value="2203342"
              />
              <PropertyListItem
                align="horizontal"
                label="Student ID"
                value="2203342"
              />
              <PropertyListItem
                align="horizontal"
                label="Course"
                value="Applied Artificial Intelligence"
              />


            </PropertyList>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};
