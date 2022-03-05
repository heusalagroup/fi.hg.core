// Copyright (c) 2020-2021 Sendanor. All rights reserved.

export interface RequestHandler<IncomingMessage, ServerResponse> {
    (req: IncomingMessage, res: ServerResponse): void;
}
