import { HttpErrorResponse } from '@angular/common/http'

export class ErrorHandler{
  handleError(error: HttpErrorResponse): string {
    if (error.status === 401) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Bad Request', error.error);
      return "Helytelen email vagy jelszó";
    } else if (error.status === 400) {
      console.log('Unauthorized', error.error)
      return "Az E-mail cím már regisztrálva van.";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(`Backend returned code ${error.status}, body was: `, error.error);
      return "Váratlan hiba történt, próbálja újra!";
    }
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}