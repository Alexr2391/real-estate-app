'use client';

import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import css from './FilterSelect.module.scss';

interface FilterOption<T> {
  label: string;
  value: T;
}

interface FilterSelectProps<T> {
  options: FilterOption<T>[];
  placeholder?: string;
  defaultValue?: T | null;
  value?: T | null;
  onChange?: (value: T | null) => void;
}

export const FilterSelect = <T,>({
  options,
  placeholder,
  defaultValue = null,
  value,
  onChange,
}: FilterSelectProps<T>) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [internal, setInternal] = useState<T | null>(defaultValue);

  const current = value !== undefined ? value : internal;
  const selected = options.find((o) => o.value === current);
  const open = Boolean(anchor);

  const handleSelect = (val: T | null) => {
    if (onChange) onChange(val);
    else setInternal(val);
    setAnchor(null);
  };

  return (
    <>
      <button
        className={`${css.chip} ${open ? css.active : ''} ${selected ? css.selected : ''}`}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        {selected ? selected.label : placeholder}
      </button>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { className: css.paper } }}
      >
        <div className={css.list}>
          {options.map((opt, i) => (
            <MenuItem
              key={i}
              className={css.option}
              selected={current === opt.value}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </MenuItem>
          ))}
        </div>
      </Popover>
    </>
  );
};
