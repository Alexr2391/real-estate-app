import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import type { FC } from 'react';

export type ButtonProps = Omit<MuiButtonProps, 'disableRipple'>;

export interface IconButtonProps extends Omit<
  MuiIconButtonProps,
  'disableRipple'
> {
  shape?: 'round' | 'square';
}

const SHAPE_STYLES: Record<
  NonNullable<IconButtonProps['shape']>,
  { borderRadius: string }
> = {
  round: { borderRadius: '50%' },
  square: { borderRadius: '12px' },
};

const IconButton: FC<IconButtonProps> = ({ shape, color, sx, ...props }) => (
  <MuiIconButton
    disableRipple
    sx={{
      ...(color && {
        bgcolor: `${color}.main`,
        color: `${color}.contrastText`,
        '&:hover': { bgcolor: `${color}.dark` },
      }),
      ...(shape && SHAPE_STYLES[shape]),
      ...sx,
    }}
    {...props}
  />
);

export const MainButton: FC<ButtonProps> & { Icon: typeof IconButton } = (
  props
) => <MuiButton disableRipple {...props} />;

MainButton.Icon = IconButton;
