
        // All the MultipartFile fields are methods
export interface MultipartFileInterface {
   getBytes:() => Blob[];
   getContentType:() => string;
   getInputStream:() => InputStreamInterface;
   getName:() => string;
   getOriginalFilename:() => string;
   getSize:() => number;
   isEmpty:() => boolean;
   transferTo:() => void;
}

export interface InputStreamInterface {
   readable: boolean;
   setEncoding(encoding?: 'base64' | 'binary'): this;
   available:() =>number;
   close:() => boolean;
   mark:(readLimit?: number) => number;
   markSupported():boolean;
   nullInputStream():void;
   read(mark?:() => number, size?: number): Buffer | number;
   readAllBytes():void;
   readNBytes(mark?: () => number, size?: number, toArray?: []):void;
   reset():this;
   skip(count: number):void;
   transferTo(OutputStream?: () => void):void;
}
