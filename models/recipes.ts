export interface Recipe {
    id: number;
    nome: string;
    tempo_preparo_minutos: number;
    porcoes: number;
    ingredientes: string;
    modo_preparo: string;
    id_usuarios: number;
    id_categorias: number;
  }
  