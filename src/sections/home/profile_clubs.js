import PropTypes from 'prop-types';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/scrollbar';
import Avatar from '@mui/material/Avatar';

export const HomeClubs = (props) => {
  const { clubs } = props;
  const { name } = props;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            component="a"
            href="/profile"
            src="/assets/avatars/avatar-marcus-finn.png"
          />
        }
        title={(
          <Typography
            color="text.primary"
            variant="subtitle2"
          >
            {name}
          </Typography>
        )}
        action={(
          <Button
            color="primary"
            size="small"
            align="right"
            href="/profile"
          >
            View Profile
          </Button>
        )}
      />


      <Scrollbar>
        <Table sx={{ minWidth: 300 }}>
          <TableBody>
            {clubs && clubs.map((club, index) => {

              return (
                <TableRow
                  key={club[0]}
                >
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      {club ? (
                        <Box
                          sx={{
                            alignItems: 'center',
                            backgroundColor: 'neutral.50',
                            backgroundImage: `url(${club[3]})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            borderRadius: 5,
                            display: 'flex',
                            height: 80,
                            justifyContent: 'center',
                            overflow: 'hidden',
                            width: 80,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            alignItems: 'center',
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.50',
                            borderRadius: 5,
                            display: 'flex',
                            height: 80,
                            justifyContent: 'center',
                            width: 80,
                          }}
                        >
                          <SvgIcon>
                            <Image01Icon />
                          </SvgIcon>
                        </Box>
                      )}
                      <div>
                        <Typography variant="subtitle2">{club[1]}</Typography>
                        <Box
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
                            borderRadius: 1.5,
                            px: 1,
                            py: 0.5,
                            display: 'inline-block',
                          }}
                        >
                          <Typography
                            color="text.secondary"
                            variant="body2"
                          >
                            {club[2]}
                          </Typography>
                        </Box>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      endIcon={<SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                      }
                      size="small"
                      href={'/clubs/' + club[0]}
                    >
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      </CardActions>
    </Card>
  );
};

HomeClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};
