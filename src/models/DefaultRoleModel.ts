export interface IRoleModel{
    roleList: string[];
    addRole : (roleName : string) => void;
    removeRole : (roleName : string) => void;
}

export class DefaultRoleModel implements  IRoleModel {
    roleList: string[] = ["Koch" , "Service"];

    public addRole(roleName: string) {
        //TODO implement addRole in DB
        this.roleList.push(roleName);
        alert("Hello from addRole " + roleName);
    }

    public removeRole(roleName : string){
        //TODO  implement removeRole in DB
        this.roleList.splice(this.roleList.indexOf(roleName),1);
    }
}

export const RoleModel = new DefaultRoleModel();