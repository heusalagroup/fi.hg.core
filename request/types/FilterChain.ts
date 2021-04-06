import ServletRequest from "./ServletRequest";
import ServletResponse from "./ServletResponse";

export interface FilterChain {

    doFilter (request : ServletRequest, response : ServletResponse) : Promise<void>;

}

export default FilterChain;
