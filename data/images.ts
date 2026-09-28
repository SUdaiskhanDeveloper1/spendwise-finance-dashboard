/**
 * Image registry — every photo in /public/images with its intrinsic size,
 * descriptive alt text and a 16px blur placeholder (shown while the optimised
 * image loads). Reference photos by key so size and alt text stay consistent.
 * Sources and licences: IMAGE_CREDITS.md.
 */

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
}

export const images = {
  personalBudget: {
    src: '/images/personal-budget.webp',
    width: 1400,
    height: 1050,
    alt: 'Smiling couple at home reviewing their household budget with a calculator, notebook and laptop',
    blurDataURL: 'data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoQAAwAA4BaJYgCdAYsPgH/UOJZFgAA/uGXktNLQ0nvIUZv4/gn9n+mt5U2XaLeVyjWVUi8jv68Ygk32Om389IrzCWrQ4aNN3TJ3IKNGBscvJe9QXTEbQPHBo5tdT8AAAA=',
  },
  expenseTracking: {
    src: '/images/expense-tracking.webp',
    width: 1400,
    height: 1050,
    alt: 'Shopper tapping a smartphone on a card terminal at a store checkout beside a pineapple',
    blurDataURL: 'data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAABQAgCdASoQAAwAA4BaJaACdAYsPgJK998NmoAA/rQrIBB26G1+unbSbkfTI9Jem8lBPgMZL6vNrxvc/cJeujkB/1Z9oxm+/hs2Ev2psxu8G+5wYJ71k+VU33gdrl6RQHrBXbA54Wg6azwm1Sol7Q9SJAA=',
  },
  financialPlanning: {
    src: '/images/financial-planning.webp',
    width: 1400,
    height: 1050,
    alt: 'Couple at a kitchen table planning finances together with documents, calculator and laptop',
    blurDataURL: 'data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAwAgCdASoQAAwAA4BaJYwCdH8AGALfg0XAYAD+6gcG5C1FhpV3isVOKmlRFV/ztmD5MbiYc5LJCXnUrGzICBiPnnDnFQVkK0YUuwoCPOllrAALSld/TFrKprhHFKDJAAA=',
  },
  moneyManagement: {
    src: '/images/money-management.webp',
    width: 1400,
    height: 1050,
    alt: 'Hands opening a brown leather wallet holding cash and cards against a wooden background',
    blurDataURL: 'data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoQAAwAA4BaJQBOgBmTscE//B6gAP6W64V+ZnJvYFfjO2ku+crdNydQZ5N/3MkGu6ZidKccbvssJCn2GvnT87eZ0+y870cLDClsNx/2RW0iEELUFfQAAA==',
  },
  financeMobile: {
    src: '/images/finance-mobile.webp',
    width: 1000,
    height: 1250,
    alt: 'Smiling young woman in a striped T-shirt holding a smartphone while leaning against a building',
    blurDataURL: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAwBACdASoQABQAPu1iqU2ppaOiMAgBMB2JQBWABClSuqo891Qg3LedTsAA/vHRrMjIch/O7gVTTiXznruye7xMRAKPUg26TfHLIa/hhTelPD4zC2pdCs1/BxadWNJMe2RtGO/sdZoxln0GETrF2zKmiZRFsVtGeNFOmmwAAAA=',
  },
  smartSaving: {
    src: '/images/smart-saving.webp',
    width: 1400,
    height: 1050,
    alt: 'Hand dropping a coin into a clear piggy bank resting on soft white fabric',
    blurDataURL: 'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoQAAwAA4BaJYwCdADHmyN3oAAA4nTFbb9WGUoa/RSPLMWVCEAgoKkzyoIdi1r/YJ/zX5XWR+ywUibJvnZ34GdDd2IdR9zCZAAAAA==',
  },
  financialGrowth: {
    src: '/images/financial-growth.webp',
    width: 1400,
    height: 1050,
    alt: 'Person pointing a pencil at printed growth charts beside a laptop and calculator on a desk',
    blurDataURL: 'data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoQAAwAA4BaJQBOgMXX3DpUFmwAAP5sC1n48lVVgwY73V0vwgYeXZF9g7pGN9yMqCSuuzo4J94ybkVbthjh+TFQC1hYyUr6X+l5e93cFCcHa/yiL+AAAA==',
  },
  financeTeam: {
    src: '/images/finance-team.webp',
    width: 1600,
    height: 1067,
    alt: 'Four diverse colleagues discussing ideas around laptops at a table in a bright office',
    blurDataURL: 'data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAABQAgCdASoQAAsAA4BaJZQAD42RZ9ed11V4/IAA/o7/zvSqyScNNp4eyqKisS8CqyCe20tjQfFr3EG0lpU/4aJSFFT2CC0/G8eDEwI3O9rwIAAA',
  },
  sharedHousehold: {
    src: '/images/shared-household.webp',
    width: 1400,
    height: 1050,
    alt: 'Smiling family of four sharing tea together at a cosy candlelit table at home',
    blurDataURL: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQAgCdASoQAAwAA4BaJQBOgMWvq2Rqn4pQAP70kXXk6Q5JXGfxMb9+bOciZ6P3g77YTZ/V1xM+3MfPuFMdzf0uMUQ+TwzjbeuC+MmsewRkPAZQaXBK8ssyHHJLhs91Eay6BhQx7cQAAA==',
  },
  travelCurrency: {
    src: '/images/travel-currency.webp',
    width: 1400,
    height: 1050,
    alt: 'Assorted foreign banknotes including British pounds, Canadian dollars, Czech koruna and US dollars spread out',
    blurDataURL: 'data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACwAQCdASoQAAwAA4BaJZACdACovSZQAP5abfQ0xay9+Ar27yiYt1IWMIjqs/b42gbp0QhvQIX6q9HA0adTCpPWekxuJPpxSzapXtwSClTjMFqhBQAAAA==',
  },
  receiptScan: {
    src: '/images/receipt-scan.webp',
    width: 1400,
    height: 1050,
    alt: 'Person sorting paper receipts on a white desk with a pink calculator and documents',
    blurDataURL: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwAgCdASoQAAwAA4BaJbACdAD7g4sBAsXRKAD+mqkf3d3Eqg/CdzRd6DSwKbYc3ehA5AwrQMzY8+X7m3/cuIKomSHzFYzwco2SbFiE/xBcYerkEQyitOV9yIEBNV+KpoHl75smKe2Vdof36fJvwAAA',
  },
  financeDashboard: {
    src: '/images/finance-dashboard.webp',
    width: 1600,
    height: 1000,
    alt: 'Laptop displaying a financial chart on a clean white desk with printed reports and stationery',
    blurDataURL: 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoQAAoAA4BaJZwAAudpJKhoAAD+9gm4NYEz9e/2vRncOWYl6y2bhOyxKmZ3fF9S2mSWXA2seHVIAA==',
  },
  goalEmergencyFund: {
    src: '/images/goal-emergency-fund.webp',
    width: 900,
    height: 600,
    alt: 'Top-down view of a glass jar of coins beside loose quarters and dimes on white wood',
    blurDataURL: 'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoQAAsAA4BaJZwAAtzCEBYAAP3alwDns5XYAj+o1XFtQXFyYwxG3YswrsAAAA==',
  },
  goalVacation: {
    src: '/images/goal-vacation.webp',
    width: 900,
    height: 600,
    alt: 'Turquoise waves washing onto a sandy tropical beach at golden-hour sunset in Oahu, Hawaii',
    blurDataURL: 'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoQAAsAA4BaJYgCdAEOwCahAAD+6E0eeiR9Ic/TkEiBWnQi+FB6BEkY5JrtetKZhfELAAAA',
  },
  goalHouseDeposit: {
    src: '/images/goal-house-deposit.webp',
    width: 900,
    height: 600,
    alt: 'Grey shingled family house with a white wraparound porch and a green front lawn',
    blurDataURL: 'data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAsAA4BaJbACsADvbp+Ex+AA/uf5TEZU9YWTbHV+O1El2edIqEEIESXnCw27MF4d1cgHTfIjvQFkGZ4ER6CqP1Zzqw4iVQQm39ory0RMdgAA',
  },
  goalLaptopUpgrade: {
    src: '/images/goal-laptop-upgrade.webp',
    width: 900,
    height: 600,
    alt: 'Laptop with a dark screen on a tidy wooden desk beside gold decor and plant',
    blurDataURL: 'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAQAgCdASoQAAsAA4BaJQBdgB6IN7P/znQAAP7uQew9favQxJn2VKfQik3rhe3x/0fNEwXHoxYg8ZC5hXSAsmAjsYnaXN+gUUOZ5RovHVAAAA==',
  },
  avatarAsma: {
    src: '/images/avatar-asma.webp',
    width: 480,
    height: 480,
    alt: 'Asma Rahman',
    blurDataURL: 'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABQAgCdASoQABAAA4BaJaACdAYvhkwKodh0UAAA/skQaxyOJO4eim2iVR8W+aDfh+s6YmaZExQgsrKcUoOO159jnUhwMEzXbahoP8miTY6qLgZryEK1V821Mg39kf4Zh/CPR4ga2c55XAAA',
  },
  avatarJames: {
    src: '/images/avatar-james.webp',
    width: 480,
    height: 480,
    alt: 'James Whitfield',
    blurDataURL: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQAgCdASoQABAAA4BaJYgCdH8AgpyJOoHA6FQA28Hg1LjQtRycyEha3/N3u+nR4vAHFrSpvwEFqjldOunSBWT/SWUA0Gkc9Fhz9E7C+oy7fPI88g57otD3/6C7BGAEHP6heopFdOpgAA==',
  },
  avatarAmara: {
    src: '/images/avatar-amara.webp',
    width: 480,
    height: 480,
    alt: 'Amara Okafor',
    blurDataURL: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABwAgCdASoQABAAA4BaJZQC7H8AgiCtVQhkEHeAAP74uilxLNmLrPKzjWfzuwzjmKizHd+XkYJxryKxKTUAP6uf/Bu9IW44rlapJoqa/3BS9oXaDa9NPDzqCO6I0nK5Ias7dChvPxLVSROS6vycQAAA',
  },
  avatarDaniel: {
    src: '/images/avatar-daniel.webp',
    width: 480,
    height: 480,
    alt: 'Daniel Reyes',
    blurDataURL: 'data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAQAgCdASoQABAAA4BaJZACdH8AFlbZVvtgAP6fkml0ocMIhdOGzMXKhAgdnDpjJXWS29tb/qVWafYe2T6mJ+IblYf3gDjTR/jbsJT0GKs72zDMaqvIy4bYJ+zMf8Y2sUBoAA==',
  },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;

/** Cover photo for each savings goal, keyed by goal id. */
export const goalCovers: Record<string, ImageKey> = {
  'g-1': 'goalEmergencyFund',
  'g-2': 'goalVacation',
  'g-3': 'goalHouseDeposit',
  'g-4': 'goalLaptopUpgrade',
};
