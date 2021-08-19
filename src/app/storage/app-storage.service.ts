import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Doctor, User} from '../model/user/user';

@Injectable({providedIn: 'root'})
export class AppStorageService {
  private readonly USER_KEY = 'user_key';
  private readonly DOCTOR_KEY = 'doctor_key';

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

  public setDoctor(d: Doctor): void {
    this.storage.set(this.DOCTOR_KEY, d);
  }

  public clearDoctor(): void {
    this.storage.set(this.DOCTOR_KEY, null);
  }

  get doctor(): Doctor {
    return this.storage.get(this.DOCTOR_KEY);
  }
}
