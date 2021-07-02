export const navLinksList = [
  {
    name: 'Сведения об ОО',
    path: '/svedeniya',
    dropMenu: [
      {
        name: 'Основные сведения',
        path: '/svedeniya/osnosnye-svedenia'
      },
      {
        name: 'Руководство. Педагогический состав',
        path: '/svedeniya/rucovodstvo'
      },
      {
        name: 'Структура и органы управления образовательной организации',
        path: '/svedeniya/structure'
      },
      {
        name: 'Образование',
        path: '/svedeniya/education'
      },
      {
        name: 'Материально-техническое обеспечение и оснащенность образовательного процесса',
        path: '/svedeniya/materialno'
      },
      {
        name: 'Стипендии и иные виды материальной поддержки',
        path: '/svedeniya/stipendiya'
      },
      {
        name: 'Платные образовательные услуги',
        path: '/svedeniya/platnue-uslugi'
      },
      {
        name: 'Финансово-хозяйственная деятельность',
        path: '/svedeniya/financi'
      },
      {
        name: 'Вакантные места для приема (перевода)',
        path: '/svedeniya/vacantnue-mesta'
      },
      {
        name: 'Доступная среда',
        path: '/svedeniya/doctupnaya-sreda'
      },
      {
        name: 'Международное сотрудничество',
        path: '/svedeniya/mezhdunarodnoe'
      }
    ]
  },
  {
    name: 'Новости',
    path: '/news'
  },
  {
    name: 'food',
    path: '/food'
  },
  {
    name: 'Ученикам',
    path: '/students'
  },
  {
    name: 'Родителям',
    path: '/parents'
  },
  {
    name: 'Образование',
    path: '/education'
  },
  {
    name: 'Контакты',
    path: '/contacts'
  }
]

export function formatDate(date) {
  const d = new Date(date);
  return ('0' + (d.getDate() - 1)).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}

