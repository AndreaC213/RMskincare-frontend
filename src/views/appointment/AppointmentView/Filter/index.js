import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Input,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';

const selectOptions = [
  {
    label: 'Employee',
    options: [
      'Grace',
      'Sissi',
      'Daisy',
      'Angel',
      'Yan',
      'Summer',
      'Carmen',
      'Tina',
      'Yoyo']
  },
  {
    label: 'Facial',
    options: [
      "凝时 2h",
      "双效 100min",
      "紧肌 100min",
      "唤肤气泡 110min",
      "落砖小气泡 80min",
      "中级小气泡 90min",
      "普通facial 70min",
      "signature-facial 90min"
    ]
  },
  {
    label: 'Laser',
    options: ['No data']
  },
  {
    label: 'AT',
    options: [
      "普通massage 1h",
      "普通massage 1.5h",
      "普通massage 2h",
      "精油+火罐+刮痧 1h",
      "精油+火罐+刮痧 1.5h",
      "精油+火罐+刮痧 2h",
      "RF-SPA 1h",
      "RF-SPA+普通massage 30min",
      "RF-SPA+普通massage 1h"
    ]
  },
  {
    label: 'Tattoo',
    options: [
      "纹身 120min",
      "纹眉 120min",
      "纹眼线 120min",
      "纹骨 120min"
    ]
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Filter = ({ className, ...rest }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const handleInputChange = (event) => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = (event) => {
    event.persist();

    if (event.keyCode === 13 && inputValue) {
      if (!chips.includes(inputValue)) {
        setChips((prevChips) => [...prevChips, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleChipDelete = (chip) => {
    setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip));
  };

  const handleMultiSelectChange = (value) => {
    setChips(value);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={2}
        display="flex"
        alignItems="center"
      >
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyup}
          placeholder="Enter a keyword"
          value={inputValue}
        />
      </Box>
      <Divider />
      <Box
        p={2}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        {chips.map((chip) => (
          <Chip
            className={classes.chip}
            key={chip}
            label={chip}
            onDelete={() => handleChipDelete(chip)}
          />
        ))}
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        p={1}
      >
        {selectOptions.map((option) => (
          <MultiSelect
            key={option.label}
            label={option.label}
            onChange={handleMultiSelectChange}
            options={option.options}
            value={chips}
          />
        ))}
        <Box flexGrow={1} />
      </Box>
    </Card>
  );
};

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
