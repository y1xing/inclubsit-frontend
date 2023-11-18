import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Avatar } from '@mui/material';


export const ProfileClubs = (props) => {
    function truncateByWords(text, numWords) {
        const words = text.split(/\s+/); // Split the text by spaces (including multiple spaces)
        const truncatedWords = words.slice(0, numWords);
        const truncatedText = truncatedWords.join(' ');
        return truncatedText;
      }

    const { club } = props;
    /* Need To Fix Routing Link */
    return (
        <Card variant="outlined">
            <CardMedia
                component={RouterLink}
                href={paths.home}
                image={club[3]}
                sx={{ height: 400 }}
            />
            <CardContent>
                <Box
                    sx={{ mt: 2 }}
                ></Box>
                <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.home}
                    underline="none"
                    variant="subtitle1"
                >
                    {club[1]}
                </Link>
                <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                >
                    {club[2].length > 100 ? truncateByWords(club[2], 10) + " ..." : club[2]}
                </Typography>
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1 }}
                >
                </Stack>
            </CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 1,
                }}
            >
            </Box>
        </Card>
    );
};

ProfileClubs.propTypes = {
    club: PropTypes.array.isRequired,
};
