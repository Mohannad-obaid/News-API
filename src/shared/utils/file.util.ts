import {FileTypes} from "../files/types/file.types";
import {lookup} from 'mime-types';

// ["png", "jpg"] => /png|jpg/i
export const crateFileTypeRegex = (file: FileTypes[]): RegExp =>{

    const mediaTypes = file
        .map((type)=>lookup(type))
        .filter((type)=>type!== false);

   return  new RegExp(mediaTypes.join('|'), 'i');
}
