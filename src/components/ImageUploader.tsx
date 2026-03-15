import React, { useRef, useState } from 'react';

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  caption: string;
}

const ImageUploader: React.FC = () => {
        const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

        const handleRemoveImage = (id: string) => {
          setImages((prev) => prev.filter((img) => img.id !== id));
          setConfirmRemoveId(null);
        };
      const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

      const handleDragStart = (idx: number) => {
        setDraggedIdx(idx);
      };

      const handleDragOver = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === idx) return;
        const newImages = [...images];
        const [removed] = newImages.splice(draggedIdx, 1);
        newImages.splice(idx, 0, removed);
        setImages(newImages);
        setDraggedIdx(idx);
      };

      const handleDragEnd = () => {
        setDraggedIdx(null);
      };
    const handleCaptionChange = (id: string, caption: string) => {
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, caption } : img))
      );
    };
  const [images, setImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newImages.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        url,
        caption: '',
      });
    });
    setImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFilesChange}
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Upload Images
      </button>
      <div className="image-preview-list">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className="image-preview-item"
            style={{ marginBottom: 16, position: 'relative', opacity: draggedIdx === idx ? 0.5 : 1, cursor: 'move' }}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={e => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
          >
            <img src={img.url} alt={`upload-${idx}`} style={{ width: 120, height: 120, objectFit: 'cover', display: 'block' }} />
            {idx === 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                left: 4,
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: 12
              }}>
                Primary
              </span>
            )}
            <button
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                color: '#d00',
                zIndex: 2
              }}
              title="Remove image"
              onClick={() => setConfirmRemoveId(img.id)}
            >
              🗑️
            </button>
            <input
              type="text"
              placeholder="Add a caption..."
              value={img.caption}
              onChange={e => handleCaptionChange(img.id, e.target.value)}
              style={{ marginTop: 8, width: 120 }}
            />
            {confirmRemoveId === img.id && (
              <div style={{
                position: 'absolute',
                top: 40,
                left: 0,
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: 8,
                zIndex: 10,
                width: 140,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>
                <div style={{ marginBottom: 8 }}>Do you really want to remove?</div>
                <button onClick={() => handleRemoveImage(img.id)} style={{ marginRight: 8 }}>Yes</button>
                <button onClick={() => setConfirmRemoveId(null)}>No</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
