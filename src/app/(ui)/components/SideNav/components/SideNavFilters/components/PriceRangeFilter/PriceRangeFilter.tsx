'use client';

import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import css from './PriceRangeFilter.module.scss';
import {
  getLabel,
  parseInput,
  toDisplay,
} from './utils/priceRangeFilter.utils';

interface PriceRangeValue {
  min: number | null;
  max: number | null;
}

interface PriceRangeFilterProps {
  minOptions: number[];
  maxOptions: number[];
  placeholder?: string;
  currency?: string;
  value?: PriceRangeValue;
  onChange?: (value: PriceRangeValue) => void;
}

export const PriceRangeFilter = ({
  minOptions,
  maxOptions,
  placeholder = '',
  currency = '€',
  value,
  onChange,
}: PriceRangeFilterProps) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [internal, setInternal] = useState<PriceRangeValue>({
    min: null,
    max: null,
  });
  const [minDisplay, setMinDisplay] = useState('');
  const [maxDisplay, setMaxDisplay] = useState('');

  const current = value ?? internal;
  const label = getLabel(current.min, current.max, placeholder, currency);
  const isSelected = current.min !== null || current.max !== null;
  const open = Boolean(anchor);

  const update = (next: PriceRangeValue) =>
    onChange ? onChange(next) : setInternal(next);

  const handleMinInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { display, value: num } = parseInput(e.target.value);
    setMinDisplay(display);
    update({ ...current, min: num });
  };

  const handleMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { display, value: num } = parseInput(e.target.value);
    if (num !== null && current.min !== null && num < current.min) {
      setMaxDisplay('');
      update({ ...current, max: null });
    } else {
      setMaxDisplay(display);
      update({ ...current, max: num });
    }
  };

  const selectMin = (opt: number) => {
    if (current.max !== null && opt > current.max) {
      setMaxDisplay('');
      update({ min: opt, max: null });
    } else {
      setMinDisplay(toDisplay(opt));
      update({ ...current, min: opt });
    }
  };

  const selectMax = (opt: number) => {
    if (current.min !== null && opt < current.min) {
      setMinDisplay('');
      update({ min: null, max: opt });
    } else {
      setMaxDisplay(toDisplay(opt));
      update({ ...current, max: opt });
    }
  };

  const currencyAdornment = (
    <InputAdornment position='start'>{currency}</InputAdornment>
  );

  return (
    <>
      <button
        className={`${css.chip} ${open ? css.active : ''} ${isSelected ? css.selected : ''}`}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        {label || 'Price'}
      </button>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { className: css.paper } }}
      >
        <div className={css.columns}>
          <div className={css.column}>
            <span className={css.label}>Min Price</span>
            <TextField
              size='small'
              slotProps={{
                input: { startAdornment: currencyAdornment },
                htmlInput: { inputMode: 'numeric' },
              }}
              value={minDisplay}
              onChange={handleMinInput}
              fullWidth
            />
            <div className={css.options}>
              <MenuItem
                className={css.option}
                selected={current.min === null}
                onClick={() => {
                  setMinDisplay('');
                  update({ ...current, min: null });
                }}
              >
                Indifferent
              </MenuItem>
              {minOptions.map((opt) => (
                <MenuItem
                  className={css.option}
                  key={`${opt}min`}
                  selected={current.min === opt}
                  onClick={() => selectMin(opt)}
                >
                  {opt.toLocaleString()}
                </MenuItem>
              ))}
            </div>
          </div>
          <div className={css.divider} />
          <div className={css.column}>
            <span className={css.label}>Max Price</span>
            <TextField
              size='small'
              slotProps={{
                input: { startAdornment: currencyAdornment },
                htmlInput: { inputMode: 'numeric' },
              }}
              value={maxDisplay}
              onChange={handleMaxInput}
              fullWidth
            />
            <div className={css.options}>
              <MenuItem
                className={css.option}
                selected={current.max === null}
                onClick={() => {
                  setMaxDisplay('');
                  update({ ...current, max: null });
                }}
              >
                Indifferent
              </MenuItem>
              {maxOptions.map((opt) => (
                <MenuItem
                  className={css.option}
                  key={`${opt}max`}
                  selected={current.max === opt}
                  onClick={() => selectMax(opt)}
                >
                  {opt.toLocaleString()}
                </MenuItem>
              ))}
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
