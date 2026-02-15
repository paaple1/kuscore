export const CATEGORY_LABELS = {
  japanese: "国語",
  social: "地歴・公民",
  math: "数学",
  science: "理科",
  foreign: "外国語",
  info: "情報"
};

const RAW_MAX = {
  japanese: 200,
  social: 200,
  socialOne: 100,
  math: 200,
  science: 200,
  scienceBasic: 100,
  foreign: 200,
  info: 100
};

export const FACULTIES = [
  {
    id: "integrated",
    name: "総合人間学部",
    programs: [
      {
        id: "integrated-humanities",
        name: "文系",
        ctSubjects: [
          { id: "social", rawMax: RAW_MAX.social, weight: 50, count: 2 },
          { id: "math", rawMax: RAW_MAX.math, weight: 100, count: 2 },
          { id: "info", rawMax: RAW_MAX.info, weight: 25 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 150 },
          { id: "social", max: 100, rawMax: 100 },
          { id: "math", max: 200, rawMax: 150 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 175, secondary: 650, overall: 825 }
      },
      {
        id: "integrated-science",
        name: "理系",
        ctSubjects: [
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 100 },
          { id: "info", rawMax: RAW_MAX.info, weight: 25 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 100 },
          { id: "math", max: 200, rawMax: 200 },
          { id: "science", max: 200, count: 2, rawMax: 200 },
          { id: "foreign", max: 150, rawMax: 150 }
        ],
        totals: { ct: 125, secondary: 700, overall: 825 }
      }
    ]
  },
  {
    id: "letters",
    name: "文学部",
    programs: [
      {
        id: "letters-main",
        name: "一般",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.social, weight: 50, count: 2 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.scienceBasic, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 15 }
        ],
        ctScale: { from: 265, to: 250 },
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 150 },
          { id: "social", max: 100, rawMax: 100 },
          { id: "math", max: 100, rawMax: 150 },
          { id: "foreign", max: 150, rawMax: 150 }
        ],
        totals: { ct: 250, secondary: 500, overall: 750 }
      }
    ]
  },
  {
    id: "education",
    name: "教育学部",
    programs: [
      {
        id: "education-humanities",
        name: "文系",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.social, weight: 50, count: 2 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.scienceBasic, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 15 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 200, rawMax: 150 },
          { id: "social", max: 100, rawMax: 100 },
          { id: "math", max: 150, rawMax: 150 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 265, secondary: 650, overall: 915 }
      },
      {
        id: "education-science",
        name: "理系",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 50 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 15 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 100 },
          { id: "math", max: 200, rawMax: 200 },
          { id: "science", max: 100, rawMax: 100 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 265, secondary: 650, overall: 915 }
      }
    ]
  },
  {
    id: "law",
    name: "法学部",
    programs: [
      {
        id: "law-main",
        name: "一般",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 200 },
          { id: "social", rawMax: RAW_MAX.social, weight: 200, count: 2 },
          { id: "math", rawMax: RAW_MAX.math, weight: 200, count: 2 },
          { id: "science", rawMax: RAW_MAX.scienceBasic, weight: 100, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 200 },
          { id: "info", rawMax: RAW_MAX.info, weight: 50 }
        ],
        ctScale: { from: 950, to: 285 },
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 150 },
          { id: "social", max: 100, rawMax: 100 },
          { id: "math", max: 150, rawMax: 150 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 285, secondary: 600, overall: 885 }
      }
    ]
  },
  {
    id: "economics",
    name: "経済学部",
    programs: [
      {
        id: "economics-humanities",
        name: "文系",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.social, weight: 50, count: 2 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.scienceBasic, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 50 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 150 },
          { id: "social", max: 100, rawMax: 100 },
          { id: "math", max: 150, rawMax: 150 },
          { id: "foreign", max: 150, rawMax: 150 }
        ],
        totals: { ct: 300, secondary: 550, overall: 850 }
      },
      {
        id: "economics-science",
        name: "理系",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 50 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.socialOne, weight: 50 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 50 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 100 },
          { id: "math", max: 300, rawMax: 200 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 300, secondary: 650, overall: 950 }
      }
    ]
  },
  {
    id: "science",
    name: "理学部",
    programs: [
      {
        id: "science-main",
        name: "一般",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 25 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 25 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 100 },
          { id: "math", max: 300, rawMax: 200 },
          { id: "science", max: 300, count: 2, rawMax: 200 },
          { id: "foreign", max: 225, rawMax: 150 }
        ],
        totals: { ct: 250, secondary: 975, overall: 1225 }
      }
    ]
  },
  {
    id: "medicine",
    name: "医学部",
    programs: [
      {
        id: "medicine-md",
        name: "医学科",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 50 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 25 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 100 },
          { id: "math", max: 250, rawMax: 200 },
          { id: "science", max: 300, count: 2, rawMax: 200 },
          { id: "foreign", max: 300, rawMax: 150 }
        ],
        totals: { ct: 275, secondary: 1000, overall: 1275 }
      },
      {
        id: "medicine-hs",
        name: "人間健康科学科",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 50 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 50 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 25 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 150, rawMax: 100 },
          { id: "math", max: 200, rawMax: 200 },
          { id: "science", max: 200, count: 2, rawMax: 200 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 275, secondary: 750, overall: 1025 }
      }
    ]
  },
  {
    id: "pharmacy",
    name: "薬学部",
    programs: [
      {
        id: "pharmacy-main",
        name: "一般",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 40 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 40 },
          { id: "math", rawMax: RAW_MAX.math, weight: 40, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 40, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 40 },
          { id: "info", rawMax: RAW_MAX.info, weight: 20 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 100, rawMax: 100 },
          { id: "math", max: 200, rawMax: 200 },
          { id: "science", max: 200, count: 2, rawMax: 200 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 220, secondary: 700, overall: 920 }
      }
    ]
  },
  {
    id: "engineering",
    name: "工学部",
    programs: [
      {
        id: "engineering-main",
        name: "一般",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 25 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 50 },
          { id: "math", rawMax: RAW_MAX.math, weight: 25, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 25, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50, readingRatio: 0.5 },
          { id: "info", rawMax: RAW_MAX.info, weight: 50 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 100, rawMax: 100 },
          { id: "math", max: 250, rawMax: 200 },
          { id: "science", max: 250, rawMax: 200, count: 2 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 225, secondary: 800, overall: 1025 }
      }
    ]
  },
  {
    id: "agriculture",
    name: "農学部",
    programs: [
      {
        id: "agriculture-main",
        name: "一般",
        ctSubjects: [
          { id: "japanese", rawMax: RAW_MAX.japanese, weight: 70 },
          { id: "social", rawMax: RAW_MAX.socialOne, weight: 100 },
          { id: "math", rawMax: RAW_MAX.math, weight: 50, count: 2 },
          { id: "science", rawMax: RAW_MAX.science, weight: 50, count: 2 },
          { id: "foreign", rawMax: RAW_MAX.foreign, weight: 50 },
          { id: "info", rawMax: RAW_MAX.info, weight: 30 }
        ],
        secondarySubjects: [
          { id: "japanese", max: 100, rawMax: 100 },
          { id: "math", max: 200, rawMax: 200 },
          { id: "science", max: 200, count: 2, rawMax: 200 },
          { id: "foreign", max: 200, rawMax: 150 }
        ],
        totals: { ct: 350, secondary: 700, overall: 1050 }
      }
    ]
  }
];
