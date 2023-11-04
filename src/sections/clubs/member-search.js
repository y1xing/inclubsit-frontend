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


const genderOptions = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  }
];

const yearOptions = [
  {
    label: "Year 1",
    value: "1",
  },
  {
    label: "Year 2",
    value: "2",
  },
  {
    label: "Year 3",
    value: "3",
  },
  {
    label: "Year 4",
    value: "4",
  }
];

const clusterOptions = [
  {
    label: "Information Technology",
    value: "ICT",
  },
  {
    label: "Engineering",
    value: "ENG",
  },
  {
    label: "Business Communication Design",
    value: "BCD",
  },
  {
    label: "Health Sciences",
    value: "HS",
  }
];

const courseOptions = [
  {
    label: "Applied Artificial Intelligence",
    value: "Applied Artificial Intelligence",
  },
]

export const MemberFilter = (props) => {
  const { onFiltersChange, ...other } = props;
  const queryRef = useRef(null);
  const [chips, setChips] = useState([]);

  const handleChipsUpdate = useCallback(() => {
    const filters = {
      gender: [],
      cluster: [],
      course: [],
      year: [],
    };

    chips.forEach((chip) => {
      switch (chip.field) {
        case 'gender':
          console.log("Pushed gender")
          filters.gender.push(chip.value);
          break;
        case 'cluster':
          filters.cluster.push(chip.value);
          break;
        case 'course':
          // The value can be "available" or "outOfStock" and we transform it to a boolean
          filters.course.push(chip.value)
          break;
        case 'year':
          // The value can be "available" or "outOfStock" and we transform it to a boolean
          filters.year.push(chip.value)
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



  const handleGenderChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'gender') {
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
          const option = genderOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Gender',
            field: 'gender',
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleClusterChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'cluster') {
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
          const option = clusterOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Cluster',
            field: 'cluster',
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleYearChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'year') {
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
          const option = yearOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Year',
            field: 'year',
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleCourseChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'course') {
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
          const option = courseOptions.find((option) => option.value === value);

          newChips.push({
            label: 'Course',
            field: 'course',
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
  const genderValues = useMemo(
    () => chips.filter((chip) => chip.field === 'gender').map((chip) => chip.value),
    [chips]
  );

  const clusterValues = useMemo(
    () => chips.filter((chip) => chip.field === 'cluster').map((chip) => chip.value),
    [chips]
  );

  const yearValues = useMemo(
    () => chips.filter((chip) => chip.field === 'year').map((chip) => chip.value),
    [chips]
  );

  const courseValues = useMemo(
    () => chips.filter((chip) => chip.field === 'course').map((chip) => chip.value),
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
    <Card elevation={0}
          {...other}
    >

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
          label="Gender"
          onChange={handleGenderChange}
          options={genderOptions}
          value={genderValues}
        />
        <MultiSelect
          label="Year"
          onChange={handleYearChange}
          options={yearOptions}
          value={yearValues}
        />
        <MultiSelect
          label="Cluster"
          onChange={handleClusterChange}
          options={clusterOptions}
          value={clusterValues}
        />
        <MultiSelect
          label="Course"
          onChange={handleCourseChange}
          options={courseOptions}
          value={courseValues}
        />

      </Stack>
    </Card>
  );
};

MemberFilter.propTypes = {
  onFiltersChange: PropTypes.func,
};
