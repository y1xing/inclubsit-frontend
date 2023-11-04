import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import {SeverityPill} from "src/components/severity-pill";

export const ClubMember = (props) => {
  const { connection } = props;

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', p: 2 }}
    >
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        // sx={{ p: 2 }}
      >
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={2}
        >
          <Avatar
            component="a"
            href="#"
            src={connection.avatar}
            sx={{
              height: 40,
              width: 40,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={1}

            >
            <Link
              color="text.primary"
              href="#"
              variant="subtitle2"
            >
              {connection.name}
            </Link>
              <Typography
                color="text.secondary"
                gutterBottom
                variant="body2"
              >
                {connection.studentId}
              </Typography>
            <SeverityPill color={connection.gender === "Male" ? "info" : "primary"}>{connection.gender}</SeverityPill>
            </Stack>


            <Typography
              color="text.secondary"
              gutterBottom
              variant="body2"
            >
              {connection.cluster}, {connection.course}, Y{connection.year}
            </Typography>



          </Box>



        </Stack>
        {/*<IconButton>*/}
        {/*  <SvgIcon>*/}
        {/*    <DotsHorizontalIcon />*/}
        {/*  </SvgIcon>*/}
        {/*</IconButton>*/}
      </Stack>
      {/*<Divider sx={{ my: 1 }} />*/}
      {/*<Typography*/}
      {/*  color="text.secondary"*/}
      {/*  gutterBottom*/}
      {/*  variant="body2"*/}
      {/*>*/}
      {/*  {connection.studentId}*/}
      {/*</Typography>*/}

    </Card>
  );
};

ClubMember.propTypes = {
  connection: PropTypes.object,
};
