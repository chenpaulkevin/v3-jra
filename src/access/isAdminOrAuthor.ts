import { Access } from "payload/config";

export const isAdminOrAuthor: Access = ({req: { user }}) => {
    if(user){
        if(user.role?.includes('admin')){
            return true;
    }
    if(user.role?.includes('author')){
        return {
            id: {
                equals: user.id,
            }
        }
}
}
    return false;
}