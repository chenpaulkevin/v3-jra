import { CollectionConfig } from 'payload/types'
import { isAdminOrAuthor } from '../access/isAdminOrAuthor'
import { isAdmin } from '../access/isAdmin'
import slug from '../fields/slug';
import createdBy from '../fields/createdBy';

export const  Testimonials: CollectionConfig = {
    slug:'testimonials',
    admin:{
        useAsTitle: 'customerName',
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
      fields:[
                {
                    type: 'row',
                    fields: [
                        {
                            label: 'Customer Name',
                            name:'customerName',
                            required: true,
                            type: "text",
                            minLength: 1,
                            maxLength: 100,
                          },
                          {
                            label: 'Customer Rating',
                            name:'customerRating',
                            required: true,
                            type: 'select',
                            defaultValue: "5",
                            options: [
                              { value: "5", label: '★★★★★' },
                              { value: "4", label: '★★★★' },
                              { value: "3", label: '★★★' },
                              { value: "2", label: '★★' },
                              { value: "1", label: '★' },
                            ]
                          }
                    ]
                },
                {
                  label: 'Service Rendered',
                  name:'service',
                  required: true,
                  type: "text",
                  minLength: 2,
                  maxLength: 40,
                  admin: {
                    description: '40 characters max',
                }
                },
                {
                    label: 'Testimonial Title',
                    name:'title',
                    required: true,
                    type: "text",
                    minLength: 2,
                    maxLength: 100,
                    admin: {
                        description: '100 characters max',
                    }
                  },
                {
                    label: 'Testimonial Description',
                    name: 'testimonialDescription',
                    required: true,
                    type: 'textarea',
                    minLength: 10,
                    maxLength: 300,
                    admin: {
                        description: '300 characters max',
                    }
                },
                {
                    label: 'Customer Image',
                    name: 'customerImage',
                    type: 'upload',
                    relationTo: 'media',
                  },
                slug,
                createdBy,
      ]
}

export default Testimonials