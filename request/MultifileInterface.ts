
        // All the MultipartFile fields are methods
export interface MultipartFileInterface {
   getBytes:() => ArrayBuffer[];
   getContentType:() => string;
   getInputStream:() => InputStreamInterface;
   getName:() => string;
   getOriginalFilename:() => string;
   getSize:() => number;
   isEmpty:() => boolean;
   transferTo:(newPath:string) => void;
}

interface InputStreamInterface {
   available?: number;
   close?:() => void;
   mark?:(readLimit?: number) => void;
   markSupported?():boolean;
   nullInputStream?():void;
   read?(): void;
   readAllBytes?():void;
   readNBytes?(mark?: () => number, size?: number, toArray?: []):void;
   reset?():this;
   skip?(count: number):void;
   transferTo?(OutputStream?: () => void):void;
}
