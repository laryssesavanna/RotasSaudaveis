const Menu =  [
  { header: 'Painel de Controle' },
  {
    title: 'Mapa',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  }, /* ,
  {
    title: 'Chat',
    group: 'apps',
    icon: 'chat_bubble',
    target: '_blank',
    name: 'Chat',
  },
  {
    title: 'Inbox',
    group: 'apps',
    name: 'Mail',
    target: '_blank',
    icon: 'email',
  },
  {
    title: 'Media',
    group: 'apps',
    name: 'Media',
    icon: 'perm_media',
  },
  {
    title: 'Widgets',
    group: 'widgets',
    component: 'widgets',
    icon: 'widgets',
    items: [
      { name: 'social', title: 'Social', component: 'components/social' },
      { name: 'statistic', title: 'Statistic', badge: 'new', component: 'components/statistic' },
      { name: 'chart', title: 'Chart', component: 'components/chart' },
      { name: 'list', title: 'List', component: 'components/widget-list' },
      // { name: 'post', title: 'Post', component: 'components/widget-post' },
    ]
  }, */  
  { header: 'Usuário' },
  /* {
    title: 'General',
    group: 'components',
    component: 'components',
    icon: 'tune',
    items: [
      { name: 'alerts', title: 'Alerts', component: 'components/alerts' },
      { name: 'avatars', title: 'Avatars', component: 'components/avatars' },
      { name: 'badges', title: 'Badges', component: 'components/badges' },
      { name: 'buttons', title: 'Buttons', component: 'components/buttons' },
      { name: 'cards', title: 'Cards', component: 'components/cards' },
      { name: 'carousels', title: 'Carousels', component: 'components/carousels' },
      { name: 'chips', title: 'Chips', component: 'components/chips' },
      { name: 'dialogs', title: 'Dialogs', component: 'components/dialogs' },
      { name: 'icons', title: 'Icons', component: 'components/icons' },
      { name: 'tables', title: 'Data Tables', component: 'components/tables' },
      { name: 'parallax', title: 'Parallax  image', component: 'components/parallax' },
      { name: 'snackbar', title: 'Snackbar', component: 'components/snackbar' },
      { name: 'progress', title: 'Progress', component: 'components/progress' },      
      { name: 'slider', title: 'Slider', component: 'components/sliders' },      
      { name: 'tooltip', title: 'Tooltip', component: 'components/tooltips' },      
      { name: 'pagination', title: 'Pagination', component: 'components/paginations' },      
      { name: 'typography', title: 'Typography', component: 'components/typography' },      
      { name: 'color', title: 'Color', component: 'components/color' },      

    ]
  }, */
  {
    title: 'Saúde',
    group: 'pickers',
    component: 'picker',
    icon: 'local_hospital',
    items: [
      { name: 'Informações', title: 'Informações', component: 'components/text-fields' },      
    ]
  },
  /* {
    title: 'Forms & Controls',
    group: 'forms',
    component: 'forms',
    icon: 'edit',
    items: [
      { name: 'basic', title: 'Listagem', component: 'components/basic-forms' },
      { name: 'selects', title: 'Selects', badge: 'new', component: 'components/selects' },
      { name: 'selection-controls', title: 'Selection Controls', component: 'components/selection-controls' },
      { name: 'text-fields', title: 'Informações', component: 'components/text-fields' },
      { name: 'steppers', title: 'Steppers', component: 'components/steppers' },
      { name: 'editors', title: 'Editors', component: 'components/editors' },
    ]
  }, */
  { divider: true },
  { header: 'Ambiente' },
  {
    title: 'Sensores',
    group: 'extra',
    icon: 'wifi',
    items: [
      { name: 'Listar Sensores', title: 'Listar Sensores', component: 'components/tables' },
      { name: 'Novo Sensor', title: 'Novo Sensor', component: 'components/steppers' },
    ]
  },
]; 
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
