import { CollectionConfig } from 'payload/types'
import slug from '../fields/slug'
import { isAdminOrAuthor } from '../access/isAdminOrAuthor';
import createdBy from '../fields/createdBy';

export const DesignModels: CollectionConfig = {
    slug: 'designModels',
    admin:{
      useAsTitle: 'title'
    },
    access:{
        create: isAdminOrAuthor,
        read: () => true,
        update: isAdminOrAuthor,
        delete: isAdminOrAuthor,
      },
      fields: [
        {
            label: 'Model Title',
            name: 'title',
            required: true,
            type: 'text',
            unique: true,
            minLength: 2,
            maxLength: 20
        },
        {
            label: 'Project Description',
            name: 'description',
            required: true,
            type: 'textarea',
            minLength: 10,
            maxLength: 500,
            admin: {
              description: 'Max 500 characters'
            },
        },
        {
          type: 'row',
          fields: [        {
            label: 'Floor Area (sqm)',
            name: 'floorArea',
            required: true,
            type: 'number',
            min: 1,
            max: 50000
        },
        {
            label: 'Category',
            name: 'category',
            type: 'select',
            required: true,
            defaultValue:'bungalow',
            options: [
              {
                label: 'Bungalow',
                value: 'bungalow'
              },
              {
                label: 'Two Story',
                value: 'Two Story'
              },
              {
                label: 'Three Story',
                value: 'Three Story'
              },
            ]
          },],
        },
            {
              label: 'Featured Image',
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              label: 'Floor Plan Image',
              name: 'floorPlanImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              label: 'Image Slider',
              name: 'slider',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              required: true,
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                  required: true,
                },
                {
                  label: 'Caption',
                  name: 'alt',
                  type: 'text',
                  required: true,
                  minLength: 2,
                  maxLength: 40,
                }
              ]
            },

          slug,
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
}

export default DesignModels