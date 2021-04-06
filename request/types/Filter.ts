import ServletRequest from "./ServletRequest";
import ServletResponse from "./ServletResponse";
import FilterChain from "./FilterChain";

export interface Filter {

    doFilter (request : ServletRequest, response : ServletResponse, chain : FilterChain) : Promise<void>;

}

export default Filter;
