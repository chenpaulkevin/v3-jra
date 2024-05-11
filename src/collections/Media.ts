import { CollectionConfig } from 'payload/types';
import { isAdminOrAuthor } from '../access/isAdminOrAuthor';
import createdBy from '../fields/createdBy';

export type Type = {
  filename: string
  alt: string
}

export const Media: CollectionConfig = {
  slug: 'media',
  access:{
    create: isAdminOrAuthor,
    read: () => true,
    update: isAdminOrAuthor ,
    delete: isAdminOrAuthor,
  },
  upload: {
    crop: false,
    mimeTypes: ['image/*', 'image/png'],
    focalPoint: false,
    formatOptions: {
      format: 'webp',
      options: {
        mozjpeg: true,
        progressive: true,
        quality: 75
      }
    },
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'This will act as an alternative text if image cannot be loaded',
      }
    },
    createdBy
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
  },
};

export default Media;