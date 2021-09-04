import { EntityName } from '../entities/entity-name';
import { getEntitiesMetadata } from '../entities/metadata/entity-metadata';

export class CommonLib {
  static formatDateFromString(date: string): string {
    if (date) {
      const d = new Date(date);
      return CommonLib.formatDate(d);
    } else {
      return null;
    }
  }
  static formatDate(date: Date): string {
    if (date) {
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    } else {
      return null;
    }
  }
  /***/
  static removeEmptyPrimaryKey(entity: any, entityName: EntityName) {
    const entitiesMetadata = getEntitiesMetadata().find(x => x.name === entityName);
    if (entitiesMetadata) {
      if (entity[entitiesMetadata.pkName] === null) {
        delete entity[entitiesMetadata.pkName];
      }
    } else {
      throw new Error(`Not found metadata for ${entitiesMetadata.name}`);
    }
    return entity;
  }
}