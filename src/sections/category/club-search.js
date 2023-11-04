import { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import { MultiSelect } from 'src/components/multi-select';
import { useUpdateEffect } from 'src/hooks/use-update-effect';

const membersOptions = [

  {
    label: '1-10',
    value: '1-10',
  },
  {
    label: '11-20',
    value: '11-20',
  },
  {
    label: '21-30',
    value: '21-30',
  },
  {
    label: '31-40',
    value: '31-40',
  },
  {
    label: '41-50',
    value: '41-50',
  },
  {
    label: '50+',
    value: '50+',
  }

];

const trainingDayOptions = [
  {
    label: 'No weekly training',
    value: 'no weekly training',
  },
  {
    label: 'Every Monday',
    value: 'every monday',
  },
  {
    label: 'Every Tuesday',
    value: 'every tuesday',
  },
  {
    label: 'Every Wednesday',
    value: 'every wednesday',
  },
  {
    label: 'Every Thursday',
    value: 'every thursday',
  },
  {
    label: 'Every Friday',
    value: 'every friday',
  },
  {
    label: 'Every Saturday',
    value: 'every saturday',
  },
  {
    label: 'Every Sunday',
    value: 'every sunday',
  }
];

const locationOptions = [
  {
    label: 'Dover Campus',
    value: 'dover campus',
  },
  {
    label: 'NYP Campus',
    value: 'nyp campus',
  },
  {
    label: 'SP Campus',
    value: 'sp campus',
  },
  {
    label: 'TP Campus',
    value: 'tp campus',
  },
  {
    label: 'RP Campus',
    value: 'rp campus',
  },
  {
    label: 'NP Campus',
    value: 'np campus',
  }
];

export const ClubSearch = (props) => {
  const { onFiltersChange, ...other } = props;
  const queryRef = useRef(null);
  const [chips, setChips] = useState([]);

  const handleChipsUpdate = useCallback(() => {
    const filters = {
      name: undefined,
      members: [],
      trainingDay: [],
      location: [],
    };

    chips.forEach((chip) => {
      switch (chip.field) {
        case 'name':
          // There will (or should) be only one chips with field "name"
          // so we can set up it directly
          filters.name = chip.value;
          break;
        case 'members':
          filters.members.push(chip.value);
          break;
        case 'trainingDay':
          filters.trainingDay.push(chip.value);
          break;
        case 'location':
          // The value can be "available" or "outOfStock" and we transform it to a boolean
          filters.location.push(chip.value)
          break;
        default:
          break;
      }
    });

    onFiltersChange?.(filters);
  }, [chips, onFiltersChange]);

  useUpdateEffect(() => {
    handleChipsUpdate();
  }, [chips, handleChipsUpdate]);

  const handleChipDelete = useCallback((deletedChip) => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => {
        // There can exist multiple chips for the same field.
        // Filter them by value.

        return !(deletedChip.field === chip.field && deletedChip.value === chip.value);
      });
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();

    const value = queryRef.current?.value || '';

    setChips((prevChips) => {
      const found = prevChips.find((chip) => chip.field === 'name');

      if (found && value) {
        return prevChips.map((chip) => {
          if (chip.field === 'name') {
            return {
              ...chip,
              value: queryRef.current?.value || '',
            };
          }

          return chip;
        });
      }

      if (found && !value) {
        return prevChips.filter((chip) => chip.field !== 'name');
      }

      if (!found && value) {
        const chip = {
          label: 'Name',
          field: 'name',
          value,
        };

        return [...prevChips, chip];
      }

      return prevChips;
    });

    if (queryRef.current) {
      queryRef.current.value = '';
    }
  }, []);

  const handleMemberChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'members') {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = membersOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Members',
            field: 'members',
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleTrainingDayChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'trainingDay') {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = trainingDayOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Training Day',
            field: 'trainingDay',
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleLocationChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'location') {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }


      // If the value is "All" we remove all the chips


      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = locationOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Location',
            field: 'location',
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleStockChange = useCallback((values) => {
    // Stock can only have one value, even if displayed as multi-select, so we select the first one.
    // This example allows you to select one value or "All", which is not included in the
    // rest of multi-selects.

    setChips((prevChips) => {
      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => chip.field !== 'inStock');
      const latestValue = values[values.length - 1];

      switch (latestValue) {
        case 'available':
          newChips.push({
            label: 'Stock',
            field: 'inStock',
            value: 'available',
            displayValue: 'Available',
          });
          break;
        case 'outOfStock':
          newChips.push({
            label: 'Stock',
            field: 'inStock',
            value: 'outOfStock',
            displayValue: 'Out of Stock',
          });
          break;
        default:
          // Should be "all", so we do not add this filter
          break;
      }

      return newChips;
    });
  }, []);

  // We memoize this part to prevent re-render issues
  const membersValues = useMemo(
    () => chips.filter((chip) => chip.field === 'members').map((chip) => chip.value),
    [chips]
  );

  const trainingDayValues = useMemo(
    () => chips.filter((chip) => chip.field === 'trainingDay').map((chip) => chip.value),
    [chips]
  );

  const locationValues = useMemo(
    () => chips.filter((chip) => chip.field === 'location').map((chip) => chip.value),
    [chips]
  );

  const stockValues = useMemo(() => {
    const values = chips.filter((chip) => chip.field === 'inStock').map((chip) => chip.value);

    // Since we do not display the "all" as chip, we add it to the multi-select as a selected value
    if (values.length === 0) {
      values.unshift('all');
    }

    return values;
  }, [chips]);

  const showChips = chips.length > 0;

  return (
    <Card  {...other}>
      <Stack
        alignItems="center"
        component="form"
        direction="row"
        onSubmit={handleQueryChange}
        spacing={2}
        sx={{ p: 2 }}
      >
        <SvgIcon>
          <SearchMdIcon />
        </SvgIcon>
        <Input
          defaultValue=""
          disableUnderline
          fullWidth
          inputProps={{ ref: queryRef }}
          placeholder="Search club by name"
          sx={{ flexGrow: 1 }}
        />
      </Stack>
      <Divider />
      {showChips ? (
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ p: 2 }}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    '& span': {
                      fontWeight: 600,
                    },
                  }}
                >
                  <>
                    <span>{chip.label}</span>: {chip.displayValue || chip.value}
                  </>
                </Box>
              }
              onDelete={() => handleChipDelete(chip)}
              variant="outlined"
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2.5 }}>
          <Typography
            color="text.secondary"
            variant="subtitle2"
          >
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        <MultiSelect
          label="Members"
          onChange={handleMemberChange}
          options={membersOptions}
          value={membersValues}
        />
        <MultiSelect
          label="Training Day"
          onChange={handleTrainingDayChange}
          options={trainingDayOptions}
          value={trainingDayValues}
        />
        <MultiSelect
          label="Location"
          onChange={handleLocationChange}
          options={locationOptions}
          value={locationValues}
        />
      </Stack>
    </Card>
  );
};

ClubSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};
