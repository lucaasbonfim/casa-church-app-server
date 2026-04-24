import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindGalleryPhotosQueryDto } from "./dto/find-gallery-photos-query.dto";
import { UploadGalleryPhotoDto } from "./dto/upload-gallery-photo.dto";
import { GalleryService } from "./gallery.service";
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    findFolders(): Promise<{
        folders: {
            count: number;
            coverUrl: string | null;
            latestPhotoAt: string | null;
            path: string;
            label: string;
        }[];
    }>;
    findPhotos(query: FindGalleryPhotosQueryDto): Promise<{
        photos: {
            id: string;
            publicId: string;
            url: string;
            width: number | null;
            height: number | null;
            format: string | null;
            sizeInBytes: number | null;
            createdAt: string | null;
            folder: string;
            folderLabel: string;
        }[];
        total: number;
        nextCursor: any;
    }>;
    upload(file: any, body: UploadGalleryPhotoDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        photo: {
            id: string;
            publicId: string;
            url: string;
            width: number | null;
            height: number | null;
            format: string | null;
            sizeInBytes: number | null;
            createdAt: string | null;
            folder: string;
            folderLabel: string;
        };
    }>;
    removePhoto(publicId: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
    removeFolder(folder: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
