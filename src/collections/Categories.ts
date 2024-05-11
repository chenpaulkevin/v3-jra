import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrAuthor } from '../access/isAdminOrAuthor'
import slug from '../fields/slug';
import createdBy from '../fields/createdBy';

  export const Categories: CollectionConfig = {
    slug: 'categories',
    labels: {
        singular: 'Blog Category',
        plural: 'Blog Categories',
    },
    admin:{
        useAsTitle: 'title',
        group: 'Blog',
        
      },
      access:{
        create: isAdminOrAuthor,
        read: () => true,
        update: isAdminOrAuthor,
        delete: isAdmin,
      },
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
    fields: [
        {
            label: 'Blog Category Title',
            name: 'title',
            required: true,
            unique: true,
            type: 'text',
            minLength: 4,
            maxLength: 100
        },
        slug,
        createdBy
    ]
  }