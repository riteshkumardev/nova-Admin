const option = (label, value) => {
  return {
    label,
    value,
  };
};

const cseFirstYearFirstSem = [
  option("M1", "M1"),
  option("CHEMISTRY", "CHEMISTRY"),
  option("ENGLISH", "ENGLISH"),
  option("BEE", "BEE"),
];

const cseFirstYearSecondSem = [
  option("M2", "M2"),
  option("EG", "EG"),
  option("PPS", "PPS"),
  option("AP", "AP"),
];

const cseSecondYearFirstSem = [
  option("ADE", "ADE"),
  option("COA", "COA"),
  option("DS", "DS"),
  option("OOP", "OOP"),
];

const cseSecondYearSecondSem = [
  option("JAVA", "JAVA"),
  option("OS", "OS"),
  option("DBMS", "DBMS"),
  option("BEFA", "BEFA"),
  option("DM", "DM"),
];

const cseThirdYearFirstSem = [
  option("WT", "WT"),
  option("FLAT", "FLAT"),
  option("CN", "CN"),
  option("SE", "SE"),
];

const cseThirdYearSecondSem = [
  option("ML", "ML"),
  option("Compiler Design", "Compiler Design"),
  option(
    "Design and Analysis of Algorithms",
    "Design and Analysis of Algorithms"
  ),
];

const cseFourthYearFirstSem = [
  option("Cryptography & Network Security", "Cryptography & Network Security"),
  option("Data Mining", "Data Mining"),
];

const cseFourthYearSecondSem = [
  option("Organizational Behaviour", "Organizational Behaviour"),
];
const cse = {
  1: [...cseFirstYearFirstSem, ...cseFirstYearSecondSem],
  2: [...cseSecondYearFirstSem, ...cseSecondYearSecondSem],
  3: [...cseThirdYearFirstSem, ...cseThirdYearSecondSem],
  4: [...cseFourthYearFirstSem, ...cseFourthYearSecondSem],
};

const cseSections = ["A", "B", "C", "D", "E", "F", "G"];
const years = ["First", "Second", "Third", "Fourth"];
export const classesOptions = [
  {
    ...option("CSE", "cse"),
    children: [
      ...years.map((year, ind) => ({
        ...option(year, year.toLowerCase()),
        children: [
          ...cseSections.map((section) => ({
            ...option(section, section),
            children: cse[ind + 1],
          })),
        ],
      })),
    ],
  },
  {
    label: "ECE",
    value: "ece",
    children: [],
  },
  {
    label: "IT",
    value: "it",
    children: [],
  },
];
