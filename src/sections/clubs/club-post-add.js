import React, { useState, useCallback, useRef } from 'react';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import { getInitials } from 'src/utils/get-initials';
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

import { fileToBase64 } from "src/utils/file-to-base64";

export const ClubPostAdd = (props) => {
  const user = useMockedUser();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [isAddLink, setIsAddLink] = useState(false);
  const [link, setLink] = useState('');
  const [cover, setCover] = useState(null);
  const fileInputRef = useRef(null);

  const handleLinkChange = useCallback((event) => {
    setLink(event.target.value);
  }, []);

  const handleAddInit = useCallback(() => {
    setIsAddLink(true);
  }, []);

  const handleAddCancel = useCallback(() => {
    setIsAddLink(false);
    setLink('');
  }, []);

  const handleAddConfirm = useCallback(() => {
    setIsAddLink(false);
  }, []);

  const handleUpload = useCallback(async (file) => {
    const data = await fileToBase64(file);
    setCover(data);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleCoverRemove = () => {
    setCover(null);
  }

  const handleIconClick = () => {
    fileInputRef.current.click();
  };


  return (
    <Card {...props}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          spacing={2}
        >

          <Stack
            spacing={3}
            sx={{ flexGrow: 1, position: 'relative' }}
          >
            {cover && (
              <Box
                sx={{
                  backgroundImage: `url(${cover})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 1,
                  width: '100%',
                  aspectRatio: "16/9",
                  mt: 3,
                }}
              />
            )}

            {
              cover && (
                <div>
                  <Button
                    color="inherit"
                    disabled={!cover}
                    onClick={handleCoverRemove}
                  >
                    Remove photo
                  </Button>
                </div>
              )
            }

            <OutlinedInput
              fullWidth
              multiline
              placeholder="What's on your mind"
              rows={3}
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              {smUp && (
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="upload-button"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <label htmlFor="upload-button">
                    <IconButton
                      onClick={handleIconClick}
                    >
                      <SvgIcon>
                        <Image01Icon />
                      </SvgIcon>
                    </IconButton>
                  </label>
                  <Stack
                    sx={{
                      position: 'relative',
                    }}
                  >
                  <IconButton
                    onClick={handleAddInit}
                  >
                    <SvgIcon>
                      <Link01Icon
                        color={link ? '#E73028' : 'inherit'}
                      />
                    </SvgIcon>
                  </IconButton>

                    {isAddLink && (
                  <Paper
                    elevation={12}
                    sx={{
                      width: 400,
                      top: 40,
                      position: 'absolute',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <OutlinedInput
                        autoFocus
                        fullWidth
                        placeholder="Add link"
                        name="link"
                        onChange={handleLinkChange}
                        sx={{
                          '& .MuiInputBase-input': {
                            px: 2,
                            py: 1,
                          },
                        }}
                        value={link}
                      />
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2 }}
                      >
                        <Button
                          onClick={handleAddConfirm}
                          size="small"
                          variant="contained"
                        >
                          Confirm
                        </Button>
                        <Button
                          color="inherit"
                          onClick={handleAddCancel}
                          size="small"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                    )}
                  </Stack>
                </Stack>
              )}
              <div>
                <Button variant="contained">Post</Button>
              </div>

            </Stack>



            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}

            >
              <div>
              <Typography
                gutterBottom
                variant="subtitle2"
              >
                Make post public
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Means that non-members viewing your profile will be able to see this post
              </Typography>
              </div>
            <div>
              <Switch
                defaultChecked
                edge="start"
                name="isVerified"
              />
            </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
