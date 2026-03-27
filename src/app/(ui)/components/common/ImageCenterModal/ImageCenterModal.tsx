'use client';
import { EXPORT_H, EXPORT_W } from '@/utils/imageCanvas';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from '@mui/material';
import { useCallback, useState, type FC } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import css from './ImageCenterModal.module.scss';

interface ImageCenterModalProps {
  image: HTMLImageElement | null;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
}

export const ImageCenterModal: FC<ImageCenterModalProps> = ({
  image,
  onConfirm,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);


  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = () => {
    if (!image || !croppedAreaPixels) return;

    const canvas = document.createElement('canvas');
    canvas.width = EXPORT_W;
    canvas.height = EXPORT_H;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      EXPORT_W,
      EXPORT_H
    );

    canvas.toBlob(
      (blob) => { if (blob) onConfirm(blob); },
      'image/jpeg',
      0.85
    );
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <Dialog open={!!image} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>Position your image</DialogTitle>
      <DialogContent className={css.content}>
        <Typography variant='body2' className={css.hint}>
          Drag to reposition · Use the slider to zoom in or out
        </Typography>
        <div className={css.cropWrapper}>
          {image && (
            <Cropper
              image={image.src}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              showGrid
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: { borderRadius: '8px' },
              }}
            />
          )}
        </div>
        <div className={css.scaleControl}>
          <Typography variant='caption' className={css.zoomLabel}>
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.05}
            onChange={(_, v) => setZoom(v as number)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='inherit'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant='contained'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
