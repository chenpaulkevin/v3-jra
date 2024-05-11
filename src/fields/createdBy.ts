import { Field } from "payload/types";

const createdBy: Field ={
        name: 'createdBy',
        type: 'relationship',
        relationTo: 'users',
        access: {
          update: () => false,
        },
        admin: {
          readOnly: true,
          position: 'sidebar',
          condition: data => Boolean(data?.createdBy)
        },
}
export default createdBy;