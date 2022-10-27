import stage0 from './stages/stage0';
import stage1 from './stages/stage1';
import stage2 from './stages/stage2';
import stage3 from './stages/stage3';
import stage4 from './stages/stage4';

const translate = {
  pt: {
    boaVindas: 'Boas Vindas',
    vendas: 'Vendas',
    resumo: 'Resumo',
    endereco: 'Endereço',
    encerramento: 'Encerramento'
  },
  en: {
    boaVindas: 'Welcome',
    vendas: 'Sales',
    resumo: 'Summary',
    endereco: 'Address',
    encerramento: 'Closing'
  },
  es: {
    boaVindas: 'Bienvenido',
    vendas: 'Ventas',
    resumo: 'Resumen',
    endereco: 'Dirección',
    encerramento: 'Cierre'
  },
  fr: {
    boaVindas: 'Bienvenue',
    vendas: 'Ventes',
    resumo: 'Résumé',
    endereco: 'Adresse',
    encerramento: 'Fermeture'
  }
}

const getStages = (language= "pt") => { 

  return {
    0: {
      descricao: translate[language].boaVindas,
      obj: stage0
    },
    1: {
      descricao: translate[language].vendas,
      obj: stage1
    },
    2: {
      descricao: translate[language].resumo,
      obj: stage2
    },
  
    3: {
      descricao: translate[language].endereco,
      obj: stage3
    },
    4: {
      descricao: translate[language].encerramento,
      obj: stage4
    },
  }

}

let stages: any = {
  0: {
    descricao: 'Boas Vindas',
    obj: stage0
  },
  1: {
    descricao: 'Vendas',
    obj: stage1
  },
  2: {
    descricao: 'Resumo',
    obj: stage2
  },

  3: {
    descricao: 'Endereço',
    obj: stage3
  },
  4: {
    descricao: 'Encerramento',
    obj: stage4
  },
}

export default getStages;