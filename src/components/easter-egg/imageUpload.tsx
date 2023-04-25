import Image from "next/image";
import React, { useRef, useState } from "react";
import Spinner from "../spinner";

type Props = {
  existingImage?: string | null;
  setImage: (arg1: File | null) => void;
  loading: boolean;
};

const ImageUpload = ({ existingImage, setImage, loading }: Props) => {
  const [highlighted, setHighlighted] = useState(false);

  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files[0]) {
      setMediaPreview(null);
      setImage(null);
      return;
    }
    setImage(files[0]);
    setMediaPreview(URL.createObjectURL(files[0]));
  };

  return (
    <>
      <input
        type="file"
        id="image"
        className="hidden"
        placeholder="Banner..."
        ref={inputRef}
        onChange={handleChange}
      />
      <div
        className={`min-h-[150px] bodyFont grow flex items-center justify-center cursor-pointer md:rounded-md rounded-b-md ${
          highlighted ? "ring-2 ring-blue-500 bg-blue/20" : "bg-black/20 "
        }`}
        onClick={() => {
          inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setHighlighted(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setHighlighted(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          const droppedFile = Array.from(e.dataTransfer.files);

          if (droppedFile[0]) {
            setImage(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }
        }}>
        {loading ? (
          <>
            <Spinner />
          </>
        ) : existingImage && !mediaPreview ? (
          <div className="rounded-sm">
            <Image
              width={1500}
              height={1500}
              className="object-contain h-64 "
              src={existingImage}
              alt="Clue Image"
            />
          </div>
        ) : mediaPreview === null ? (
          <>
            <span className="p-5">Upload image</span>
          </>
        ) : (
          <div className="rounded-sm">
            <Image
              width={1500}
              height={1500}
              className="object-contain h-64 "
              src={mediaPreview}
              alt="Clue Image"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
