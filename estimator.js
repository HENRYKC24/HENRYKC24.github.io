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

completeValue = () => {
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
  if (unit1 === '') {
    percentagePop.textContent = 'Population percentage that earns (0) USD Daily:';
  } else {
    percentagePop.textContent = 'Population percentage that earns ' + unit1 + ' USD Daily:';
  }
  howMany.textContent = 'Estimate In How Many ' + unit + ':';
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
  severeTabBtn.style.borderBottom = '2px solid black';
  severeTabBtn.style.borderLeft = '2px solid black';
  mildTabBtn.style.borderRight = 'none';
  secondPage.style.backgroundColor = 'rgb(199, 134, 12)';
  hideSevereRestltTab();
},
hideMildResultTab = () => {
  mildResultTab.style.display = 'none';
},
showSevereResultTab = () => {
  severeResultTab.style.display = 'block';
  severeTabBtn.style.borderBottom = 'none';
  mildTabBtn.style.borderBottom = '2px solid black';
  mildTabBtn.style.borderLeft = '2px solid black';
  severeTabBtn.style.borderLeft = 'none';
  mildTabBtn.style.borderLeft = 'none';
  mildTabBtn.style.borderRight = '2px solid black';
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
estimationUnit.addEventListener('blur', () => {
  completeValue();
});
estimationUnit.addEventListener('click', () => {
  completeValue();
});
estimationUnit.addEventListener('keyup', () => {
  completeValue();
});
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
      let downMsg = document.querySelector('#msg-down');
      downMsg.textContent = 'Country/Region field is required';
      // console.log(downMsg);
      document.querySelector('body').scrollTop = -500;
      setTimeout(() => {
        country.textContent = '';
        downMsg.textContent = '';
        document.querySelector('#country').focus();
      }, 3000);
      return;
    }
    if (index === 2) {
      let cases = document.querySelector('#cases-valdn-msg');
      cases.textContent = 'required';
      setTimeout(() => {
        cases.textContent = '';
        document.querySelector('#reported-cases').focus();
      }, 3000);
      return;
    }
    if (index === 3) {
      let unitValue = document.querySelector('#unit-valdn-msg');
      let unit = document.querySelector('#est-unit').value;
      unitValue.textContent = 'required';
      setTimeout(() => {
        unitValue.textContent = '';
        document.querySelector('#unit-val').focus();
      }, 3000);
    }
    return;
  } else if (Number(reqValues[3]) < 0 || Number(reqValues[3]) > 100) {
    let downMsg = document.querySelector('#msg-down');
    downMsg.textContent = 'Population percetage value should be between 0 and 100';
    setTimeout(() => {
      downMsg.textContent = '';
      document.querySelector('#avg-daily-inc-pop').focus();
    }, 3000);
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
    pre.textContent = estimationValue.value + ' ' + estimationUnit.value + ' time:';
    pre.style.fontWeight = "bolder";
  };
  meip.textContent = outputData.impact.infectionsByRequestedTime,
  mesip.textContent = outputData.impact.severeCasesByRequestedTime,
  meahb.textContent = outputData.impact.hospitalBedsByRequestedTime,
  meipicu.textContent = outputData.impact.casesForICUByRequestedTime,
  meipv.textContent = outputData.impact.casesForVentilatorsByRequestedTime;
  const mDollars = inputData.region.avgDailyIncomeInUSD;
  if (mDollars) {
    meedl.textContent = outputData.impact.dollarsInFlight;
    metel.textContent = outputData.impact.dollarsInFlight * takeWholeNum(inDays(inputData.periodType, inputData.timeToElapse));
  } else {
    meedl.textContent = 'You did not provide the input';
    metel.textContent = 'You did not provide the input';
  };
  seip.textContent = outputData.severeImpact.infectionsByRequestedTime,
  sesip.textContent = outputData.severeImpact.severeCasesByRequestedTime,
  seahb.textContent = outputData.severeImpact.hospitalBedsByRequestedTime,
  seipicu.textContent = outputData.severeImpact.casesForICUByRequestedTime,
  seipv.textContent = outputData.severeImpact.casesForVentilatorsByRequestedTime;
  const sDollars = inputData.region.avgDailyIncomeInUSD;
  if (sDollars) {
    seedl.textContent = outputData.severeImpact.dollarsInFlight;
    setel.textContent = outputData.severeImpact.dollarsInFlight * takeWholeNum(inDays(inputData.periodType, inputData.timeToElapse));
  } else {
    seedl.textContent = 'You did not provide the input';
    setel.textContent = 'You did not provide the input';
  };
  sregion.textContent = inputData.region.name.toUpperCase(),
  src.textContent = inputData.reportedCases,
  sci.textContent = outputData.severeImpact.currentlyInfected;
  showSecondPage();
  showMildResultTab()
});

