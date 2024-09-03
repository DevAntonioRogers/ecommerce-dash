import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
 
import type { OurFileRouter } from "./core";
 
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();