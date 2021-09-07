
export function getEntitiesMetadata(): EntityMetadata[] {
  return [
    {
      name: 'user',
      pkName: 'iduser',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'userdep',
      pkName: 'iduserdep',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'role',
      pkName: 'idrole',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'dep',
      pkName: 'iddep',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'operation',
      pkName: 'idoperation',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'operationresource',
      pkName: 'idoperationresource',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'resource',
      pkName: 'idresource',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'rroperation',
      pkName: 'idrroperation',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'roleresource',
      pkName: 'idroleresource',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'cmms_wo',
      pkName: '',
      columns: [
        {
          name: 'attribute4',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'cmms_wo_sum',
      pkName: '',
      columns: [
      ],
    },
  ];
}

export class EntityMetadata {
  name: string;
  pkName: string;
  columns: ColumnMetadata[];
}

export interface ColumnMetadata {
  name: string;
  type: ColumnTypeMetadata;
}

export enum ColumnTypeMetadata {
  string,
  date,
  number,
}

