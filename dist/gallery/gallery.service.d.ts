import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindGalleryPhotosQueryDto } from "./dto/find-gallery-photos-query.dto";
import { UploadGalleryPhotoDto } from "./dto/upload-gallery-photo.dto";
export declare class GalleryService {
    private readonly rootFolder;
    private readonly configured;
    constructor();
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
    uploadPhoto(file: any, body: UploadGalleryPhotoDto, tokenPayload: TokenPayloadDto): Promise<{
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
    private assertConfigured;
    private assertCanManageGallery;
    private deleteFolderRecursively;
    private getSubFolders;
    private deleteImagesByPrefix;
    private mapPhoto;
    private getFolderStats;
    private getFolderPhotoCount;
    private executeSearch;
    private uploadToCloudinary;
    private isUploadConflictError;
    private getFolderBaseName;
    private normalizeRootFolder;
    private normalizeRelativeFolder;
    private sanitizeSegment;
    private getRelativeFolderPath;
    private getFolderPathFromPublicId;
    private toFolderLabel;
    private normalizePublicId;
    private isManagedPublicId;
}
