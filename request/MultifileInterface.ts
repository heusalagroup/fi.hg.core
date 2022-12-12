
/**
 * All the MultipartFile fields are methods
 * TransferTo Should stream a file, from file to another file, but
 * NodeJS limits this, to simply from path to path
 * Hence ´string´ and not ´File´
 */
export interface MultipartFileInterface {
   getBytes(): ArrayBuffer[];
   getContentType(): string;
   getInputStream(): InputStreamInterface;
   getName(): string;
   getOriginalFilename(): string;
   getSize(): number;
   isEmpty(): boolean;
   transferTo(): void;
   transferTo(dest:string): void;
}

/**
 * InputStreamInterface
 * Missing methods thus far:
 */
interface InputStreamInterface {
   available(): number;
   close(): void;
   mark(readLimit?: number): void;
   markSupported():boolean;
   nullInputStream():void;
   read():ArrayBuffer;
   read(b:ArrayBuffer):number;
   read(b:ArrayBuffer, off:number, len:number):number;
   readAllBytes():Uint8Array;
   readNBytes(len:number):ArrayBuffer;
   readNBytes(b:ArrayBuffer, off:number, len:number):ArrayBuffer;
   reset(pos:number):Function;
   skip(n: number):number;
   transferTo(out: () => number):number;
}

export interface OutputStreamInterface {
   close(): void;
   flush(): void;
   nullOutputStream(): void;
   write(b: number): number;
   write(b: ArrayBuffer): void;
   write(b: ArrayBuffer, off: ArrayBuffer, len: number): void;
}
