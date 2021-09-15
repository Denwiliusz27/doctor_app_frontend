import {User} from '../../model/user/user';
import {CreateUserRequest} from '../../model/user/dto/create-user';
import {Observable} from 'rxjs';


export interface UserStrategy<T extends User = User> {
  createUser(request: CreateUserRequest): Observable<T>;
}
