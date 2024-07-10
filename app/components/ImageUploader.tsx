import { Paperclip } from "lucide-react";
import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: Error) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      onUploadSuccess("");
    } catch (error) {
      onUploadError(error as Error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
      <Button onClick={triggerFileInput} disabled={isUploading} variant="link" className="text-muted p-0 me-2">
        <Paperclip size={18} />
      </Button>
    </div>
  );
};

export default ImageUploader;
