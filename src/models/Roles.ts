export class Roles{
    _currentRoles: string[] = ["Koch", "Service"];

    get currentRoles(): string[] {
        return this._currentRoles;
    }

    set name(value: string) {
        this._currentRoles.push(value);
    }
}