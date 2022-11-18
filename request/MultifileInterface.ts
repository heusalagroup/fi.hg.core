import ReadableStream = NodeJS.ReadableStream;

        // All the MultipartFile fields are methods
export interface MultipartFileInterface {
   getBytes:() => Blob[];
   getContentType:() => string;
   getInputStream:() => ReadableStream;
   getName:() => string;
   getOriginalFilename:() => string;
   getSize:() => number;
   isEmpty:() => boolean;
   transferTo:() => void;
}
