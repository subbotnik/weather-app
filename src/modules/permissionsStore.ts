import { action, makeObservable, observable } from 'mobx';
type PermissionStatus = 'granted' | 'undetermined' | 'denied';

export class PermissionsStore {
  location: PermissionStatus | undefined = undefined;

  constructor() {
    makeObservable(this, {
      location: observable,
      setPermissions: action,
    });
  }

  setPermissions({status}: {status: PermissionStatus}) {
    this.location = status;
  }
}

export default new PermissionsStore();
