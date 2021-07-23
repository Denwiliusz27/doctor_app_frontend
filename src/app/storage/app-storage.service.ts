import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {User} from '../model/user/user';

@Injectable({providedIn: 'root'})
export class AppStorageService {
  private readonly USER_KEY = 'user_key';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService){}

  public setUser(u: User): void{
    this.storage.set(this.USER_KEY, u);
  }

  public clearUser(): void {
    this.storage.set(this.USER_KEY, null);
  }

  get user(): User {
    return this.storage.get(this.USER_KEY);
  }

}
