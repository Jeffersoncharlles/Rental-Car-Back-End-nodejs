export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
/*= ============== new error personal ============== */
/** =======================
 *     COMMENT BLOCK
 *  statusCode padrao e 400
 *  por isso nao ta definido como number
 *
 *========================* */
