'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);

    // Criar preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // Em produção, fazer upload para servidor/cloud storage
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('/api/upload', { method: 'POST', body: formData });
    // const { url } = await response.json();
    // onChange(url);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div>
      {label && (
        <label className="block text-white/80 mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-pink-500 bg-pink-500/10'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                <p className="text-white/60">Processando imagem...</p>
              </>
            ) : (
              <>
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                  {isDragActive ? (
                    <ImageIcon className="w-8 h-8 text-white" />
                  ) : (
                    <Upload className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium mb-1">
                    {isDragActive
                      ? 'Solte a imagem aqui'
                      : 'Arraste uma imagem ou clique para selecionar'}
                  </p>
                  <p className="text-white/40 text-sm">
                    PNG, JPG, GIF ou WEBP (máx. 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
