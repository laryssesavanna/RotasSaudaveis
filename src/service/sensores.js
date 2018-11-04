import { http } from './configorion';

// método para carregar as entidades
// listar: (json)
export const listAllEntities = () => http.get('contextEntities');
  
// Listar todos os sensores por tipo
export const listByType = (type) => http.get('contextEntityTypes/' + type);

