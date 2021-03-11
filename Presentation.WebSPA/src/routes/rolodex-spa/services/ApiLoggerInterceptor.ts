import { LogManager } from "aurelia-framework";
import { Interceptor } from "aurelia-fetch-client";

export class ApiLoggerInterceptor implements Interceptor {
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    public request(pRequest: Request): Request | Response | Promise<Request | Response> {
        this._logger.debug(`Intercepted request using method: ${pRequest.method} with URL: ${pRequest.url}`);
        return pRequest;
    }

    public requestError(pError: any): Request | Response | Promise<Request | Response> {
        this._logger.debug(`Intercepted request error with details: ${pError}.`, pError);
        return pError;
    }

    public response(pResponse: Response, pRequest?: Request): Response | Promise<Response> {
        this._logger.debug(`Intercepted response ${pResponse.status} using URL: ${(pRequest ? pRequest : pResponse).url}`);
        return pResponse;
    }

    public responseError(pError: any, pRequest?: Request): Response | Promise<Response> {
        this._logger.debug(`[ERROR] Intercepted response error with details: ${pError}`, pRequest);
        return pError;
    }
}