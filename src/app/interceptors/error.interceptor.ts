import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr"; // Optional for better UI feedback

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Show error message
          this.toastr.error("You are not authorized to access this resource.", "Access Denied");
          // Optional: redirect to login or home
          this.router.navigate(["/login"]);
        }

        // Handle other errors globally if needed
        return throwError(() => new Error(error.message));
      })
    );
  }
}
