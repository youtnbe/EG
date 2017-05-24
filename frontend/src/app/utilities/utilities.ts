import * as _ from 'lodash';

export class Utilities {
  constructor() {
  }

  static pathResolve(obj, path) {
    return path.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : undefined
    }, obj || self);
  }

  static isFunction(func) {
    return typeof func === 'function';
  }

}

export class Dictionaries {
  constructor() {
  }

  static applicationStatuses = [
    {
      id: 0,
      code: 'accepted',
      name: 'Принята',
      message: 'Клиент оставил заявку.',
      nextButtonText: 'Подтвердить',
      class: 'app-status-accepted'
    },
    {
      id: 1,
      code: 'confirmed',
      name: 'Подтверждена',
      message: 'Заявка подтверждена. Согласованы место, время, контактные данные.',
      nextButtonText: 'В работу',
      class: 'app-status-confirmed'
    },
    {
      id: 2,
      code: 'underway',
      name: 'В работе',
      message: 'Мастер работает над данным заказом.',
      nextButtonText: 'Завершить',
      class: 'app-status-underway'
    },
    {
      id: 3, code: 'completed',
      name: 'Завершена',
      message: 'Работа по данному заказу завершена.',
      nextButtonText: 'Завершена',
      class: 'app-status-completed'

    },
  ];

  static getApplicationStatusById(id:number) {
    return _.find(this.applicationStatuses, {'id': id});
  }

  static getApplicationStatusByCode(code:string) {
    return _.find(this.applicationStatuses, {'code': code});
  }
}
