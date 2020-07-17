import { HttpParams } from '@angular/common/http';

export function addParams(params: object): HttpParams {
  return new HttpParams({ fromObject: { ...params } });
}
