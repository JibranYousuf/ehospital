import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})

export class FilterPipe implements PipeTransform {
    
  transform(data, userType): any {
    if(userType === undefined ) return data;
    return data.filter(function(d){
      return d.name.includes(userType);
    })
  }

}
