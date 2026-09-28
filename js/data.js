// Edite aqui para adicionar projetos e contatos — a página se monta sozinha.
export const PROFILE = {
  name: 'Kayky',
  role: 'Desenvolvedor Web',
  github: 'https://github.com/qgmtheus',
  email: '',      // ex.: 'voce@email.com' (fica oculto enquanto vazio)
  whatsapp: '',   // ex.: '5511999999999'
  instagram: '',  // ex.: 'https://instagram.com/seu.perfil'
};

export const PROJECTS = [
  {
    id: 'nera',
    title: 'NERA · cucina italiana',
    kind: 'Restaurante',
    summary: 'Landing page para restaurante com cardápio interativo, galeria, avaliações moderadas, mapa, contato e um painel admin que mostra quais pratos os clientes mais clicam.',
    highlights: ['Painel com métricas de cliques', 'Mensagens e avaliações com moderação', 'Pedido direto no WhatsApp', 'Responsivo e animado'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Vercel'],
    image: 'img/nera.jpg',
    site: 'https://nera-restaurante.vercel.app',
    admin: 'https://nera-restaurante.vercel.app/admin',
    code: 'https://github.com/qgmtheus/nera-restaurante',
    accent: '#c9a24a',
  },
];
