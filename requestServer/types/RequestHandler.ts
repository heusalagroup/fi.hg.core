export interface RequestHandler<IncomingMessage, ServerResponse> {
    (req: IncomingMessage, res: ServerResponse): any;
}

export default RequestHandler;
