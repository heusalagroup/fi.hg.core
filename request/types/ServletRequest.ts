
import { Headers } from "./Headers";

export interface ServletRequest {

    getHeaders() : Headers;

    setAttribute<T>(key : string, value: T) : void;

    getAttribute(key : string) : any;

}


