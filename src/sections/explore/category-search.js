import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const CategorySearch = (props) => {
  const { onChange, onSubmit, ...other } = props;
  return (
    <Card>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            defaultValue=""
            fullWidth
            label="Search"
            name="query"
            placeholder="Search for Club Name"
            onChange={onChange}
          />
        </Box>

        <Button
          size="large"
          onClick={onSubmit}
          startIcon={
            <SvgIcon>
              <SearchMdIcon />
            </SvgIcon>
          }
          variant="contained"
        >
          Search
        </Button>
      </Stack>
    </Card>
  );
};
