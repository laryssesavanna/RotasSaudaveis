const Items =  [
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Sensor de Temperatura',
    'type': 'float',
    'datetime': '17/05/2018 11:55:14',
    'geo': '-5.6063, -169.7706'
  },
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Sensor de Umidade',
    'type': 'float',
    'datetime': '17/09/2018 23:10:07',
    'geo': '-5.4033, -109.1206'
  },
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Sensor de CO2',
    'type': 'float',
    'datetime': '17/05/2018 05:18:14',
    'geo': '-5.6871, -152.8726'
  },
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Sensor de Pressão',
    'type': 'float',
    'datetime': '17/05/2018 13:00:14',
    'geo': '-5.6063, -159.9634'
  },
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Sensor de Raios UV',
    'type': 'float',
    'datetime': '17/05/2018 11:55:14',
    'geo': '-5.4871, -169.7706'
  },
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Sensor de Temperatura',
    'type': 'float',
    'datetime': '17/05/2018 11:55:14',
    'geo': '-5.6063, -169.2056'
  },
  
];

const getUserById = (uuid) => {
  return (uuid === undefined) ? Items[0] : Items.find(x => x.uuid === uuid);
};

const getUser = (limit) => {
  return (limit) ? Items.slice(0, limit) : Items;
};

export {
  Items,
  getUser,
  getUserById
};