export type CreateDevotional = {
  title: string;
  devotionalDate: Date;
  verseReference?: string;
  verseText?: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  published?: boolean;
  createdBy?: string;
};

export type UpdateDevotional = Partial<CreateDevotional>;
