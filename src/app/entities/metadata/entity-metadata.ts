
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
      name: 'bathrobe',
      pkName: 'idbathrobe',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'bathroom',
      pkName: 'idbathroom',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'bed',
      pkName: 'idbed',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'extrabed',
      pkName: 'idextrabed',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'fridge',
      pkName: 'idfridge',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'hygienekit',
      pkName: 'idhygienekit',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'internet',
      pkName: 'idinternet',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'iron',
      pkName: 'idiron',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'kitchen',
      pkName: 'idkitchen',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'roomtype',
      pkName: 'idroomtype',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'safe',
      pkName: 'idsafe',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'tempcontrol',
      pkName: 'idtempcontrol',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'tv',
      pkName: 'idtv',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'roombathroom',
      pkName: 'idroombathroom',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'roombathrobe',
      pkName: 'idroombathrobe',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'extraroom',
      pkName: 'idextraroom',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'roomextraroom',
      pkName: 'idroomextraroom',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
      ],
    },
    {
      name: 'room',
      pkName: 'idroom',
      columns: [
        {
          name: 'dtcre',
          type: ColumnTypeMetadata.date
        }
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

