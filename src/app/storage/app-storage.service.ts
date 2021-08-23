import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Doctor, User} from '../model/user/user';
import {Visit} from '../model/visit/visit';

@Injectable({providedIn: 'root'})
export class AppStorageService {
  private readonly USER_KEY = 'user_key';
  private readonly DOCTOR_KEY = 'doctor_key';
  private readonly VISITID_KEY = 'visitId_key';
  private readonly VISIT_KEY = 'visit_key';

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

  public setVisitId(vId: number): void {
    this.storage.set(this.VISITID_KEY, vId);
  }

  public clearVisitId(): void {
    this.storage.set(this.VISITID_KEY, null);
  }

  get visitId(): number {
    return this.storage.get(this.VISITID_KEY);
  }

  public setVisit(v: Visit): void {
    this.storage.set(this.VISIT_KEY, v);
  }

  public clearVisit(): void {
    this.storage.set(this.VISIT_KEY, null);
  }

  get visit(): Visit {
    return this.storage.get(this.VISIT_KEY);
  }
}
