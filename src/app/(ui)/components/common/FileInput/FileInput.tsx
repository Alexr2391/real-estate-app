import { forwardRef } from 'react';

interface FileInputProps {
  accept?: string;
  onChange: (file: File) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ accept = 'image/*', onChange }, ref) => (
    <input
      ref={ref}
      type='file'
      accept={accept}
      style={{ display: 'none' }}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
        e.target.value = '';
      }}
    />
  )
);

FileInput.displayName = 'FileInput';
