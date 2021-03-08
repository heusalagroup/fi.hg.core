import RequestMethod from "../request/types/RequestMethod";
import Json from "../Json";

export interface RequestClientInterface {

    jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined>;

}

export default RequestClientInterface;
