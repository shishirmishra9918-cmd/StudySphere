import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, Image, Loader } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import toast from 'react-hot-toast';

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      setUploading(true);
      const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
      const storageRef = ref(storage, `files/${fileType}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          toast.error('Upload failed');
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'files'), {
            name: file.name,
            type: fileType,
            url: downloadURL,
            uploadedAt: new Date().toISOString(),
          });
          toast.success('File uploaded successfully!');
          setUploading(false);
          setProgress(0);
        }
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragActive ? 'border-[#2196F3] bg-[#E3F2FD]' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-[#2196F3]" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop PDF or image files here, or click to select files
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <span className="inline-flex items-center text-sm text-gray-500">
            <File className="h-4 w-4 mr-1" /> PDFs
          </span>
          <span className="inline-flex items-center text-sm text-gray-500">
            <Image className="h-4 w-4 mr-1" /> Images
          </span>
        </div>
      </div>

      {uploading && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader className="h-4 w-4 animate-spin text-[#2196F3]" />
            <span>Uploading... {Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2196F3] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}