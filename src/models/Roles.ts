export interface RolesModel{
    roleList: string[];
    addRole : (roleName : string) => void;
    removeRole : (roleName : string) => void;
}

export class Roles implements  RolesModel {
    public roleList: string[] = ["Koch" , "Service"];

    public addRole(roleName: string) {
        //TODO implement addRole in DB
        this.roleList.push(roleName);
    }

    public removeRole(roleName : string){
        //TODO  implement removeRole in DB
        this.roleList.splice(this.roleList.indexOf(roleName),1);
    }
}

