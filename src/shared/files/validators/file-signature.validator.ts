import {FileValidator} from "@nestjs/common";
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
    constructor() {
        super({});
    }

    buildErrorMessage(): string {
        return 'File signature is not valid. Only PNG, JPG, and JPEG files are allowed.';
    }

    isValid(file: any ): boolean {
        const filesSignatures = magicBytes(file.buffer).map((signature) => signature.mime);
        if(!filesSignatures.length) return false;

        return filesSignatures.includes(file.mimetype);


    }

}