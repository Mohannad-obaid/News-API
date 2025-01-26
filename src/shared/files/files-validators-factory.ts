import {
    FileTypeValidator, FileValidator,
    HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe,
    UnprocessableEntityException
} from "@nestjs/common";
import * as bytes from 'bytes';
import {FileSignatureValidator} from "./validators/file-signature.validator";
import {FileSize, FileTypes} from "./types/file.types";
import {crateFileTypeRegex} from "../utiles/file.util";
import {NonEmptyArray} from "../utiles/array.utli";


const createFileValidator = (maxSize: FileSize, fileType: NonEmptyArray<FileTypes>): FileValidator[] => {


    const createTypeRegex = crateFileTypeRegex(fileType);
    return [
        // 1) Validate file size
        new MaxFileSizeValidator({
            maxSize: bytes(maxSize),
            message: (maxSize) =>
                `File is too large. Max file size is ${maxSize} bytes`,
        }),

        // 2) Validate file type (extension)
        new FileTypeValidator({
            fileType: createTypeRegex,
        }),

        // 3) custom validator (validate file signature)
        new FileSignatureValidator()
    ]
}

export const createParesFilePipe= (maxSize: FileSize, fileType: NonEmptyArray<FileTypes>): ParseFilePipe => new ParseFilePipe({
    validators: createFileValidator(maxSize, fileType),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    exceptionFactory: (error: string) => {
        console.log("error", error);
        throw new UnprocessableEntityException(error);
    },
    fileIsRequired: true,
})