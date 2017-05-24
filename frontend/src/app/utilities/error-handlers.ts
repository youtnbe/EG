export class ErrorHandlers {
  constructor() {
  }

  static httpStatuses = {
    0: {message: 'Сервер недоступен. Проверьте подключение к интернету.'}
  };

  static getServerErrorMessage(error, defaultMessage:string):string {
    if (error.status == 0) {
      return this.httpStatuses[error.status].message;
    }
    if (JSON.parse(error['_body']).message) {
      return JSON.parse(error['_body']).message;
    }
    return defaultMessage;
  }
}
