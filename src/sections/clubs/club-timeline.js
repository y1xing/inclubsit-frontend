import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

import { ClubPostAdd } from './club-post-add';
import { ClubPostCard } from './club-post-card';
import { ClubAbout } from './club-about';

export const ClubTimeline = (props) => {
  const { posts = [], profile, leaders, role, ...other } = props;

  return (
    <div {...other}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          lg={4}
          xs={12}
        >
          <ClubAbout
            profile={profile}
            leaders={leaders}
          />
        </Grid>
        <Grid
          lg={8}
          xs={12}
        >
          <Stack spacing={3}>
            {
              role === 'student leader' && <ClubPostAdd />
            }
            {posts.map((post) => (
              <ClubPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

ClubTimeline.propTypes = {
  posts: PropTypes.array,
  profile: PropTypes.object.isRequired,
};
