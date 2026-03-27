'use client';
import { useState, type FC } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import css from './UploadZone.module.scss';

interface UploadZoneProps {
  onDrop: (file: File) => void;
  onBrowse: () => void;
}

export const UploadZone: FC<UploadZoneProps> = ({ onDrop, onBrowse }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) onDrop(file);
  };

  return (
    <div
      className={`${css.zone} ${isDraggingOver ? css.dragging : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
      onClick={onBrowse}
    >
      <MdCloudUpload className={css.icon} />
      <p className={css.text}>
        Drag & drop or <span className={css.browse}>browse</span>
      </p>
      <p className={css.subtext}>PNG, JPG, WEBP</p>
    </div>
  );
};
