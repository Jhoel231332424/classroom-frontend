export type ProductStatus = "active" | "inactive";
export type Product = {
    id: number;
    name: string;
    brand?: string | null;
    sku?: string | null;
    barcode?: string | null;
    description?: string | null;
    baseUnit: string;
    attributes?: Record<string, string | number | boolean> | null;
    currentStock: number;
    defaultMarginPercent: string;
    suggestedSalePrice?: string | null;
    status: ProductStatus;
    createdAt?: string;
    updatedAt?: string;
};
export type ListResponse<T = unknown> = {
    data?: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type CreateResponse<T = unknown> = {
    data?: T;
};

export type GetOneResponse<T = unknown> = {
    data?: T;
};

declare global {
    interface CloudinaryUploadWidgetResults {
        event: string;
        info: {
            secure_url: string;
            public_id: string;
            delete_token?: string;
            resource_type: string;
            original_filename: string;
        };
    }

    interface CloudinaryWidget {
        open: () => void;
    }

    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: Record<string, unknown>,
                callback: (
                    error: unknown,
                    result: CloudinaryUploadWidgetResults
                ) => void
            ) => CloudinaryWidget;
        };
    }
}

export interface UploadWidgetValue {
    url: string;
    publicId: string;
}

export interface UploadWidgetProps {
    value?: UploadWidgetValue | null;
    onChange?: (value: UploadWidgetValue | null) => void;
    disabled?: boolean;
}


export type User = {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    image?: string;
    imageCldPubId?: string;
    department?: string;
};








