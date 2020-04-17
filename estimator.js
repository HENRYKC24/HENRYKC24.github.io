// if (navigator.serviceWorker) {
//   console.log('Service Worder Suported');
// }
const country = document.querySelector('#country'),
population = document.querySelector('#pop'),
avgDIP = document.querySelector('#avg-daily-inc-pop'),
avgDI = document.querySelector('#avg-daily-inc-usd'),
avgAge = document.querySelector('#avg-age'),
totalHospitalBeds = document.querySelector('[data-total-hospital-beds]'),
reportedCases = document.querySelector('[data-reported-cases]'),
estimationUnit = document.querySelector('[data-period-type]'),
estimationValue = document.querySelector('[data-time-to-elapse]'),
submitBtn = document.querySelector('[data-go-estimate]'),
formPage = document.querySelector('#form-page'),
secondPage = document.querySelector('#second-page'),
tabs = document.querySelector('#tabs'),
mildTabBtn = document.querySelector('#mild-tab-btn'),
severeTabBtn = document.querySelector('#severe-tab-btn'),
homeTabBtn = document.querySelector('#home-tab-btn'),
mildResultTab = document.querySelector('#mild-result'),
severeResultTab = document.querySelector('#severe-result');
let mregion = document.querySelector('#mild-result #mre'),
mrc = document.querySelector('#mild-result #mrc'),
mci = document.querySelector('#mild-result #mci'),
meip = document.querySelector('#mild-result #meip'),
mesip = document.querySelector('#mild-result #mesip'),
meahb = document.querySelector('#mild-result #meahb'),
meipicu = document.querySelector('#mild-result #meipicu'),
meipv = document.querySelector('#mild-result #meipv'),
meedl = document.querySelector('#mild-result #meedl'),
metel = document.querySelector('#mild-result #metel'),
sregion = document.querySelector('#severe-result #sre'),
sci = document.querySelector('#severe-result #sci'),
src = document.querySelector('#severe-result #src'),
seip = document.querySelector('#severe-result #seip'),
sesip = document.querySelector('#severe-result #sesip'),
seahb = document.querySelector('#severe-result #seahb'),
seipicu = document.querySelector('#severe-result #seipicu'),
seipv = document.querySelector('#severe-result #seipv'),
seedl = document.querySelector('#severe-result #seedl'),
setel = document.querySelector('#severe-result #setel');
const tips = document.querySelectorAll('.tips-btn');
for (const tip of tips) {
  tip.setAttribute('title', 'Click for more information on this');
};
const completeValue = () => {
  let unit1 = avgDI.value,
  unit = estimationUnit.value;
  unit = unit.split('');
  unit[0] = unit[0].toUpperCase();
  unit = unit.join('');
  unit1 = unit1.split('');
  if (unit1[0]) {
    unit1[0] = unit1[0].toUpperCase();
  }
  unit1 = unit1.join('');
  const howMany = document.getElementById('label');
  const percentagePop = document.getElementById('label1');
  if (unit1 !== '') {
    percentagePop.textContent = 'Population % earning ' + unit1 + ' USD Daily:';
  } else {
    percentagePop.textContent = 'Provide the USD above before this:';
  }
  howMany.textContent = 'Number of ' + unit + ':';
},
collectData = () => {
  const data = {};
  data.region = {};
  data.region.name = country.value;
  data.region.avgAge = Number(avgAge.value);
  data.region.avgDailyIncomePopulation = Number(avgDIP.value/100);
  data.region.avgDailyIncomeInUSD = Number(avgDI.value);
  data.periodType = estimationUnit.value;
  data.timeToElapse = Number(estimationValue.value);
  data.reportedCases = Number(reportedCases.value);
  data.population = Number(population.value);
  data.totalHospitalBeds = Number(totalHospitalBeds.value);
  return data;
},
showSecondPage = () => {
  hideFormPage();
  secondPage.style.display = 'block';
},
hideSecondPage = () => {
  secondPage.style.display = 'none';
},
showMildResultTab = () => {
  mildResultTab.style.display = 'block';
  mildTabBtn.style.borderBottom = 'none';
  severeTabBtn.style.borderBottom = '1px solid white';
  severeTabBtn.style.borderLeft = '1px solid white';
  mildTabBtn.style.borderRight = 'none';
  secondPage.style.backgroundColor = 'rgb(161, 21, 21)';
  hideSevereRestltTab();
},
hideMildResultTab = () => {
  mildResultTab.style.display = 'none';
},
showSevereResultTab = () => {
  severeResultTab.style.display = 'block';
  severeTabBtn.style.borderBottom = 'none';
  mildTabBtn.style.borderBottom = '1px solid white';
  mildTabBtn.style.borderLeft = '1px solid white';
  severeTabBtn.style.borderLeft = 'none';
  mildTabBtn.style.borderLeft = 'none';
  mildTabBtn.style.borderRight = '1px solid white';
  secondPage.style.backgroundColor = 'rgb(161, 21, 21)';
  hideMildResultTab();
},
hideSevereRestltTab = () => {
  severeResultTab.style.display = 'none';
},
showFormPage = () => {
  formPage.style.display = 'block';
  hideSecondPage();
},
hideFormPage = () => {
  formPage.style.display = 'none';
};
avgDIP.addEventListener('click', () => {
  if (avgDI.value === '') {
    avgDI.focus();
  }
});
estimationUnit.addEventListener('blur', () => {
  completeValue();
});
estimationUnit.addEventListener('click', () => {
  completeValue();
});
estimationUnit.addEventListener('keyup', () => {
  completeValue();
});
estimationValue.addEventListener('keyup', (event) => {
  let estValue = estimationValue.value;
  let wantedText = estimationUnit.options[estimationUnit.selectedIndex].value;
  wantedText = wantedText.split('');
  wantedText[0] = wantedText[0].toUpperCase();
  wantedText = wantedText.join('');
  if (Number(estValue) === 1) {
    let wantedTextArray = wantedText.split('');
    if (wantedTextArray[wantedTextArray.length - 1]  === 's') {
      wantedTextArray.pop();
      estimationUnit.options[estimationUnit.selectedIndex].textContent = wantedTextArray.join('');
    }
  }
  if (Number(estValue) === 0 || Number(estValue) > 1) {
    estimationUnit.options[estimationUnit.selectedIndex].textContent = wantedText;
  }
  let finalValue = estimationUnit.options[estimationUnit.selectedIndex].textContent;
  finalValue = finalValue.split('');
  finalValue[0].toUpperCase();
});
mildTabBtn.addEventListener('click', () => {
  document.querySelector('[id="link5"]').click();
});
severeTabBtn.addEventListener('click', () => {
  document.querySelector('[id="link5"]').click();
});
let options = estimationUnit.children;
for (const option of options) {
  option.addEventListener('click', () => {
    completeValue();
  });
};
avgDI.addEventListener('keyup', () => {
  completeValue();
});
avgDI.addEventListener('blur', () => {
  completeValue();
});
completeValue();
let inputData, outputData;

mildTabBtn.addEventListener('click', () => {
  showMildResultTab();
});
severeTabBtn.addEventListener('click', () => {
  showSevereResultTab();
});
homeTabBtn.addEventListener('click', () => {
  showFormPage();
});

const takeWholeNum = (x) => {
  const t = String(x);
  if (t.indexOf('.') < 0) {
    return Number(t);
  }
  return Number(t.slice(0, t.indexOf('.')));
};
const infByReqTime = (elapsedTime, cInf) => {
  const exponent = takeWholeNum(elapsedTime / 3);
  return cInf * (2 ** exponent);
};
const inDays = (periodType, timeToElapse) => {
  let result;
  if (periodType === 'days') {
    result = timeToElapse;
  } else if (periodType === 'weeks') {
    result = timeToElapse * 7;
  } else if (periodType === 'months') {
    result = timeToElapse * 30;
  }
  return result;
};
const covid19ImpactEstimator = (data) => {
  const impactRC = data.reportedCases * 10;
  const sImpactRC = data.reportedCases * 50;
  const normalTTE = takeWholeNum(inDays(data.periodType, data.timeToElapse));
  const impactInfByRT = takeWholeNum(infByReqTime(normalTTE, impactRC));
  const sImpactInfByRT = takeWholeNum(infByReqTime(normalTTE, sImpactRC));
  const impactSCByRT = takeWholeNum(0.15 * impactInfByRT);
  const sImpactSCByRT = takeWholeNum(0.15 * sImpactInfByRT);
  const availableBeds = 0.35 * data.totalHospitalBeds;
  const impactHBByRT = takeWholeNum(availableBeds - (0.15 * impactInfByRT));
  const sImpactHBByRT = takeWholeNum(availableBeds - (0.15 * sImpactInfByRT));
  const impactCForICUByRT = takeWholeNum(0.05 * impactInfByRT);
  const sImpactCForICUByRT = takeWholeNum(0.05 * sImpactInfByRT);
  const impactVent = takeWholeNum((0.02 * impactInfByRT));
  const sImpactVent = takeWholeNum((0.02 * sImpactInfByRT));
  const myltp = impactInfByRT * data.region.avgDailyIncomePopulation;
  const impactDInF = takeWholeNum((myltp * data.region.avgDailyIncomeInUSD) / normalTTE);
  const multp2 = sImpactInfByRT * data.region.avgDailyIncomePopulation;
  const sImpactDInF = takeWholeNum((multp2 * data.region.avgDailyIncomeInUSD) / normalTTE);
  return {
    data,
    impact: {
      currentlyInfected: impactRC,
      infectionsByRequestedTime: impactInfByRT,
      severeCasesByRequestedTime: impactSCByRT,
      hospitalBedsByRequestedTime: impactHBByRT,
      casesForICUByRequestedTime: impactCForICUByRT,
      casesForVentilatorsByRequestedTime: impactVent,
      dollarsInFlight: impactDInF
    },
    severeImpact: {
      currentlyInfected: sImpactRC,
      infectionsByRequestedTime: sImpactInfByRT,
      severeCasesByRequestedTime: sImpactSCByRT,
      hospitalBedsByRequestedTime: sImpactHBByRT,
      casesForICUByRequestedTime: sImpactCForICUByRT,
      casesForVentilatorsByRequestedTime: sImpactVent,
      dollarsInFlight: sImpactDInF
    }
  };
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const reqValues = [country.value, reportedCases.value, estimationValue.value, avgDIP.value];
  let error = false, index = 0;
  for (let i = 0; i < reqValues.length - 1; i++) {
    let text = '', value = reqValues[i];
    if (value === '') {
      error = true;
    }
    for (let i = 0; i < value.length; i++) {
      let char = value[i];
      if (char !== ' ') {
        text += char;
      }
    };
    if (text === '') {
      error = true;
    }
    if (error) {
      index = i + 1;
      break;
    }
  };
  if (error) {
    if (index === 1) {
      let country = document.querySelector('#country-valdn-msg');
      country.textContent = 'required';
      document.querySelector('[id="link1"]').click();
      document.querySelector('#country').focus();
      setTimeout(() => {
        country.textContent = '';
      }, 3000);
      return;
    }
    if (index === 2) {
      let cases = document.querySelector('#cases-valdn-msg');
      cases.textContent = 'required';
      document.querySelector('[id="link3"]').click();
      document.querySelector('#reported-cases').focus();
      setTimeout(() => {
        cases.textContent = '';
      }, 3000);
      return;
    }
    if (index === 3) {
      let unitValue = document.querySelector('#unit-valdn-msg');
      unitValue.textContent = 'required';
      // let unit = document.querySelector('#est-unit').value;
      document.querySelector('#unit-val').focus();
      document.querySelector('[id="link4"]').click();
      document.querySelector('#unit-val').focus();
      setTimeout(() => {
        unitValue.textContent = '';
      }, 3000);
    }
    return;
  } else if (Number(reqValues[3]) < 0 || Number(reqValues[3]) > 100) {
    let perc = document.querySelector('#percent-valdn-msg');
    perc.textContent = 'Population percetage value should be between 0 and 100';
    document.querySelector('#avg-daily-inc-pop').focus();
    setTimeout(() => {
      perc.textContent = '';
    }, 4000);
    return;
  }
  // return false;
  inputData = collectData();
  outputData = covid19ImpactEstimator(inputData),
  mregion.textContent = inputData.region.name.toUpperCase(),
  mrc.textContent = inputData.reportedCases,
  mci.textContent = outputData.impact.currentlyInfected;
  const allPre = document.querySelectorAll('.pre');
  for (const pre of allPre) {
    pre.textContent = estimationValue.value + ' ' + estimationUnit.options[estimationUnit.selectedIndex].textContent + ' time:';
    pre.style.fontWeight = "bolder";
  };
  meip.textContent = outputData.impact.infectionsByRequestedTime;
  mesip.textContent = outputData.impact.severeCasesByRequestedTime;
  const mOutHospBeds = outputData.impact.hospitalBedsByRequestedTime;
  const inHospBeds = inputData.totalHospitalBeds;
  if (mOutHospBeds < 0 && inHospBeds) {
    meahb.textContent = 'Short by ' + (mOutHospBeds * -1) + ' beds';
  } else if (mOutHospBeds > 0 && inHospBeds) {
    meahb.textContent = mOutHospBeds;
  } else if (!inHospBeds) {
    meahb.textContent = 'Oops! No input provided';
  }
  meipicu.textContent = outputData.impact.casesForICUByRequestedTime;
  meipv.textContent = outputData.impact.casesForVentilatorsByRequestedTime;
  const mDollars = inputData.region.avgDailyIncomeInUSD;
  if (mDollars) {
    meedl.textContent = outputData.impact.dollarsInFlight;
    let multiplier = takeWholeNum(inDays(inputData.periodType, inputData.timeToElapse));
    metel.textContent = outputData.impact.dollarsInFlight * multiplier;
  } else {
    meedl.textContent = 'Oops! No input';
    metel.textContent = 'Oops! No input';
  };
  seip.textContent = outputData.severeImpact.infectionsByRequestedTime;
  sesip.textContent = outputData.severeImpact.severeCasesByRequestedTime;
  seahb.textContent = outputData.severeImpact.hospitalBedsByRequestedTime;
  const sOutHospBeds = outputData.impact.hospitalBedsByRequestedTime;
  if (sOutHospBeds < 0 && inHospBeds) {
    seahb.textContent = 'Short by ' + (sOutHospBeds * -1) + ' beds';
  } else if (sOutHospBeds > 0 && inHospBeds) {
    seahb.textContent = sOutHospBeds;
  } else if (!inHospBeds) {
    seahb.textContent = 'Oops! No input provided';
  }
  seipicu.textContent = outputData.severeImpact.casesForICUByRequestedTime;
  seipv.textContent = outputData.severeImpact.casesForVentilatorsByRequestedTime;
  const sDollars = inputData.region.avgDailyIncomeInUSD;
  if (sDollars) {
    seedl.textContent = outputData.severeImpact.dollarsInFlight;
    let multiplier = takeWholeNum(inDays(inputData.periodType, inputData.timeToElapse));
    setel.textContent = outputData.severeImpact.dollarsInFlight * multiplier;
  } else {
    seedl.textContent = 'Oops! No input';
    setel.textContent = 'Oops! No input';
  }
  sregion.textContent = inputData.region.name.toUpperCase();
  src.textContent = inputData.reportedCases;
  sci.textContent = outputData.severeImpact.currentlyInfected;
  showSecondPage();
  showMildResultTab()
  document.querySelector('[id="link5"]').click();
});
const tipsArray = [
  '"Country/State/Region": This is the continent, country, state or any region \
  that you want to forecast the impact of corona virus for. \
  Just type the name of the place you are forecasting for.',
  '"Population": This is the total number of persons living in the region you chose in \
  the input above it. The population of the country, state or any region.\
  This index can be found on the internet using google search.',
  '"Average Daily Income (USD)": This means how much money on the average \
  each person earns as income daily. For example, if most people earn 4,000\
   some day and 6,000  another day, the average daily income is 5,000. That is adding together the incomes for the days \
  and dividing them equally among the days. This index can be found on the \
  internet using google search.',
  '"Population percentage earning some USD Daily": This value can only be provided \
  if and only if you provided the "Average Daily Income (USD)". In a region, there are some people \
  earning a huge amount of money daily. In most cases, these people only represent a\
   small percentage of the population while the majority earns lower. For example, In a region with \
  4000 persons living there as the population, 80 percent (3,600 persons) might be \
  earning 6 dollars per day while the remaining 20 percent (800 persons) earns more. \
  The required value that you should provide is 80. This index can be found on\
   the internet using google search.',
  '"Average Age": This represents the age on each person in the region on the \
  average. For example, if the population of the \
  region is only 4 persons, and first person is 3 years old, second 2, third 1 \
  and fourth is 2. the total age is 8 and if you divide it \
  evenly among the 4 persons you get 8/4 which is 2. This 2 is the value \
  required but you can not determine it on your own. \
  You must find it in the internet using google search or other \
  statistical data sources.',
  '"Total Hospital Beds": This is the total of all the beds in all the hospitals\
   in that region. This information can only be found in the region\'s statistical \
   database. The data can be found on the internet using google search also.',
  '"Reported Cases": This is the total persons that tested positive for COVID-19 in \
  that region. This index can be found on the internet using google search.',
  '"Unit": This is a drop down list that helps you to choose whether you want this \
  app to forecast in days, weeks or months. It is in days by default but you can change it by clicking it \
  to open the list.',
  '"Number of ?": The text here depends of what is the "Unit" value. If the unit \
  value is "Days", it becomes "Number of Days". If it is "Weeks", it reads "Number \
  of Weeks" etc. This means the number of whatever is in the "Unit" list field which \
  i will normalise in days programmatically. So, if you chose 7 days you will get same result as choosing 1 week.'
];
const hideTips = () => {
  document.querySelector('#tips').style.display = 'none';
};
const body = document.querySelector('body');
const tipsButtons = document.querySelectorAll('.tips-btn');
for (let i = 0; i < tipsButtons.length; i++) {
  tipsButtons[i].addEventListener('click', (event) => {
    document.querySelector('#tips').style.display = 'block';
    event.stopPropagation();
    let tipsSection = document.querySelector('#tips div');
    tipsSection.textContent = tipsArray[i];
  })
};
const tipsCloseBtn = document.querySelector('#tips span');
tipsCloseBtn.addEventListener('click', () => {
  document.querySelector('#tips').style.display = 'none';
});

