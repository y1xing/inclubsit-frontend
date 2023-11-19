import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import { MemberFilter } from "src/sections/clubs/member-search";

import { ClubMember } from './club-member';

export const ClubMembersPage = (props) => {
  const { connections = [], query = '', onQueryChange, onFiltersChange, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Members" />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <SvgIcon>
          <SearchMdIcon />
        </SvgIcon>
        <Box sx={{ flexGrow: 1 }}>
          <Input
            disableUnderline
            fullWidth
            onChange={onQueryChange}
            placeholder="Search members by name"
            value={query}
          />
        </Box>

      </Stack>
      {/*<MemberFilter onFiltersChange={onFiltersChange} />*/}
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={3}
        >
          {connections.map((connection) => (
            <Grid
              key={connection.id}
              xs={6}
              md={4}
            >
              <ClubMember connection={connection} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

ClubMembersPage.propTypes = {
  connections: PropTypes.array,
  query: PropTypes.string,
  onQueryChange: PropTypes.func,
};
