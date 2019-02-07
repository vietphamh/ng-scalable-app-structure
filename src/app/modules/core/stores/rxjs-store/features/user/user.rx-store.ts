import { Dictionary } from 'extension';
import { Injectable } from '@angular/core';
import { BaseRxStore } from '@app/modules/core/stores/rxjs-store/base.rx-store';
import { UserState, initUserState } from '@app/modules/core/business-models/user/user.state-model';
import { CommandDispatcher } from '@app/modules/core/interfaces/command-dispatcher.interface';
import { UserAsyncService } from '@app/modules/core/async-services/user.async-service';
import { UserActionNames, GetUsersAction, UserSuccessAction, UserFailedAction } from '@app/modules/core/business-models/user/user.actions';

@Injectable()
export class UserRxStore extends BaseRxStore<UserState> {
  constructor(
    dispatcher: CommandDispatcher,
    private userService: UserAsyncService
  ) {
    super( dispatcher, initUserState() );
    this.registerHandlers(this.getActionHandlers());
  }

  getActionHandlers(): Dictionary {
    const handlers = {};
    handlers[UserActionNames.GET_USERS] = (action) => this.getUsers(action);
    handlers[UserActionNames.ACTION_SUCCESS] = (action) => this.successFunction(action);
    handlers[UserActionNames.ACTION_FAILED] = (action) => this.failedFunction(action);
    return handlers;
  }

  getUsers(action: GetUsersAction) {
    this.userService.getUsers().subscribe( users =>
      this.setState({
        ...this.getState(),
        users: users as []
      })
    );
  }

  successFunction(successAction: UserSuccessAction) {
    console.log(successAction);
  }

  failedFunction(successAction: UserFailedAction) {
    console.log(successAction);
  }
}