// if (navigator.serviceWorker) {
//   console.log('Service Worder Suported');
// }
const putCommas = (x) => {
  let rightPart = '';
  let toDo = '';
  let checker = 0;
  x = String(x);
  if(x[0] == '-') {
      checker = 1;
      let one = x.toString();
      let two = one.split('');
      two.shift();
      x = two.join('');
  };
  if(x.includes('e')){
      return x;
  };
  if(!(Number(x)) || x === 'Infinity'){
      return x;
  };    

  if(x.includes('.')){
      for(let a = 0; a < x.length; a++){
          if(x[a] !== '.'){
              toDo += x[a];
          }else{
              rightPart = x.slice(a);
              break;
          };
      };
  } else {
      toDo = x;
  };
  let toDoArray = toDo.split('');
  let sievedArray = [];
  let len = toDoArray.length;
  for(let i = 0; i < len; i++){
      sievedArray.push(toDoArray[i]);
      if((len - (i + 1)) % 3 === 0 && i !== (len - 1)){
          sievedArray.push(',');
      }
  };
  if(checker){
      return '-' + sievedArray.join('') + rightPart;
  };
  return sievedArray.join('') + rightPart;
};
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
setel = document.querySelector('#severe-result #setel'),
tips = document.querySelectorAll('.tips-btn');
for (const tip of tips) {
  tip.setAttribute('title', 'Click for more information on this');
};
let inputData, outputData;
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
  secondPage.style.backgroundColor = 'rgb(189, 126, 10)';
  hideSevereRestltTab();
  hideTips();
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
  hideTips();
},
hideSevereRestltTab = () => {
  severeResultTab.style.display = 'none';
},
showFormPage = () => {
  formPage.style.display = 'block';
  hideSecondPage();
  hideTips();
},
hideFormPage = () => {
  formPage.style.display = 'none';
};
avgDIP.addEventListener('click', () => {
  if (avgDI.value === '') {
    avgDI.focus();
  }
});
let options = estimationUnit.children;
console.log(options);
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener('click', () => {
    console.log('You clicked an option')
    document.querySelector('#unit-val').focus();
  });
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
// let options = estimationUnit.children;
// for (const option of options) {
//   option.addEventListener('click', () => {
//     completeValue();
//   });
// };
avgDI.addEventListener('keyup', () => {
  completeValue();
});
avgDI.addEventListener('blur', () => {
  completeValue();
});
completeValue();
// let inputData, outputData;

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
const hideTips = () => {
  document.querySelector('#tips').style.display = 'none';
};
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideTips();
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
  mrc.textContent = putCommas(Number(inputData.reportedCases)),
  mci.textContent = putCommas(outputData.impact.currentlyInfected);
  const allPre = document.querySelectorAll('.pre');
  for (const pre of allPre) {
    pre.textContent = putCommas(estimationValue.value) + ' ' + estimationUnit.options[estimationUnit.selectedIndex].textContent + ' time:';
    pre.style.fontWeight = "bolder";
  };
  meip.textContent = putCommas(outputData.impact.infectionsByRequestedTime);
  mesip.textContent = putCommas(outputData.impact.severeCasesByRequestedTime);
  const mOutHospBeds = outputData.impact.hospitalBedsByRequestedTime;
  const inHospBeds = inputData.totalHospitalBeds;
  if (mOutHospBeds < 0 && inHospBeds) {
    meahb.textContent = 'Short by ' + putCommas((mOutHospBeds * -1)) + ' beds';
  } else if (mOutHospBeds > 0 && inHospBeds) {
    meahb.textContent = putCommas(mOutHospBeds);
  } else if (!inHospBeds) {
    meahb.textContent = 'Oops! No input provided';
  }
  meipicu.textContent = putCommas(outputData.impact.casesForICUByRequestedTime);
  meipv.textContent = putCommas(outputData.impact.casesForVentilatorsByRequestedTime);
  const mDollars = inputData.region.avgDailyIncomeInUSD;
  if (mDollars) {
    meedl.textContent = putCommas(outputData.impact.dollarsInFlight);
    let multiplier = takeWholeNum(inDays(inputData.periodType, inputData.timeToElapse));
    metel.textContent = putCommas(outputData.impact.dollarsInFlight * multiplier);
  } else {
    meedl.textContent = 'Oops! No input';
    metel.textContent = 'Oops! No input';
  };
  seip.textContent = putCommas(outputData.severeImpact.infectionsByRequestedTime);
  sesip.textContent = putCommas(outputData.severeImpact.severeCasesByRequestedTime);
  seahb.textContent = putCommas(outputData.severeImpact.hospitalBedsByRequestedTime);
  const sOutHospBeds = outputData.severeImpact.hospitalBedsByRequestedTime;
  if (sOutHospBeds < 0 && inHospBeds) {
    seahb.textContent = 'Short by ' + putCommas((sOutHospBeds * -1)) + ' beds';
  } else if (sOutHospBeds > 0 && inHospBeds) {
    seahb.textContent = putCommas(sOutHospBeds);
  } else if (!inHospBeds) {
    seahb.textContent = 'Oops! No input provided';
  }
  seipicu.textContent = putCommas(outputData.severeImpact.casesForICUByRequestedTime);
  seipv.textContent = putCommas(outputData.severeImpact.casesForVentilatorsByRequestedTime);
  const sDollars = inputData.region.avgDailyIncomeInUSD;
  if (sDollars) {
    seedl.textContent = putCommas(outputData.severeImpact.dollarsInFlight);
    let multiplier = takeWholeNum(inDays(inputData.periodType, inputData.timeToElapse));
    setel.textContent = putCommas(outputData.severeImpact.dollarsInFlight * multiplier);
  } else {
    seedl.textContent = 'Oops! No input';
    setel.textContent = 'Oops! No input';
  }
  sregion.textContent = inputData.region.name.toUpperCase();
  src.textContent = putCommas(Number(inputData.reportedCases));
  sci.textContent = putCommas(outputData.severeImpact.currentlyInfected);
  showSecondPage();
  showMildResultTab()
  document.querySelector('[id="link5"]').click();
  let beds, remainingBeds = outputData.impact.hospitalBedsByRequestedTime;
  if (remainingBeds < 0) {
    beds = 'will be short by ' + putCommas((remainingBeds * -1)) + '. This is \
    because the result will be ' + putCommas(remainingBeds);
  } else {
    beds = 'will be ' + putCommas(remainingBeds);
  }
  let inDaysTime = ' in ' + putCommas(Number(inputData.timeToElapse)) + ' ' + inputData.periodType + ' time';
  let dailyDollarsLost = outputData.impact.dollarsInFlight, totalDollarsLost;
  if (dailyDollarsLost) {
    dailyDollarsLost = inputData.region.name.toUpperCase() + ' will be \
    losing ' + dailyDollarsLost + ' daily from tomorrow till ' +
    inputData.timeToElapse + ' ' + inputData.periodType + '.';
  } else {
    dailyDollarsLost = 'You need to fill the "Population" and the "Average \
    Daily Income (USD)" fields to be able to see this estimate.';
  }
  let days,
  pType = inputData.periodType;
  if (pType === 'days') {
    days = 1;
  } else if (pType === 'weeks') {
    days = 7;
  } else {
    days = 30;
  }
  const explanationArray = [
  'This is simply the reported cases you provided \
  in the form input field for your region. You \
  provided ' + putCommas(Number(inputData.reportedCases)) + '.',
  'Studies have shown that given the reported cases \
  in any region, there could be other infected persons in that \
  region who either have not developed symptoms of COVID-19 or have not \
  been tested. This is estimated to be 10 times the reported cases in \
  "MILD IMPACT" forecast. That is: ' + putCommas(Number(inputData.reportedCases)) + ' × 10. This gives \
  ' + putCommas(Number(outputData.impact.currentlyInfected)) + ' estimated infected persons today.',
  inDaysTime + ', the infected persons (Not reported cases this time) are expected to \
  rise if the necessary precautions adviced by WHO are not taken. This app projects \
  that number to be around ' + putCommas(outputData.impact.infectionsByRequestedTime) + '. This is based on the \
  findings that the number of currently infected persons doubles every 3 days. \
  see the references at the bottom of this page.',
  'Studies have also shown that not all COVID-19 infected \
  persons have severe symptoms that would require hospitalization;\
   at least not immediately. About 15% of infected persons will require \
   hostpitalization according to studies. You can find my references at the bottom of the page. \
   This is the estimated number of severe positive cases that will \
   require hospitalization to recover. Therefore, ' + inDaysTime + 
   ' 15% of ' + putCommas(outputData.impact.infectionsByRequestedTime) + ' infected persons will need to go \
   to the hospital. This gives ' + putCommas(outputData.impact.severeCasesByRequestedTime) + '.',
  inDaysTime + ', the severely infected \
  persons (' + putCommas(outputData.impact.severeCasesByRequestedTime) +
   ') computed above will need to be hospitalized. This implies \
  that, since the total hospital beds today is ' + putCommas(Number(inputData.totalHospitalBeds)) +
  ', as you provided, and ' + putCommas(outputData.impact.severeCasesByRequestedTime) +
   ' severely infected persons will need\
   hospital beds. The available hospital beds today will be: 15% of ' +
    putCommas(Number(inputData.totalHospitalBeds)) + ' (studies have also \
    shown that only an estimate of 15% of hospital beds will be left for COVID-19 \
    patients because other patients will need beds also). If all severely infected \
    COVID-19 pateients should be admitted, the available beds ' + beds,
  'Some of the COVID-19 severely infected people that will go to the \
  hospital will be worse that they will require to be put in the Intensive Care Unit (ICU). \
  This number has been computed, as per research finding, to be ' +
   putCommas(outputData.impact.casesForICUByRequestedTime),
   'This calculation represents the fraction of the COVID-19 petients, \
   who are in the Intensive Care Unit (ICU), that will require ventilators because \
   they are having problems with breathing. They are estimated to be around \
   ' + putCommas(outputData.impact.casesForVentilatorsByRequestedTime) +
    ' according to studies. That is 2% of projected \
   infected people ' + inDaysTime + ' (2% of ' + putCommas(outputData.impact.infectionsByRequestedTime) + ').',
  'This represent the amount of dollars that ' + inputData.region.name.toUpperCase() +
  ' will be loosing because of COVID-19 every day from today till ' +
  putCommas(Number(inputData.timeToElapse)) + ' ' + inputData.periodType + ' of our forecast. This will amount to ' +
   outputData.impact.dollarsInFlight + ' daily from tomorrow till ' + putCommas(Number(inputData.timeToElapse)) +
    ' ' + inputData.periodType + '.',
  'The total economic loss in USD represent the sum total \
  of the daily losses above this. That is the amount of money that the economy of \
  ' + inputData.region.name.toUpperCase() + ' will lose ' + inDaysTime + '. This is computed \
  to be: ' + putCommas(outputData.impact.dollarsInFlight) + ' × ' + putCommas(Number(inputData.timeToElapse)) +
  ' × ' + days +
   ' = ' + putCommas((outputData.impact.dollarsInFlight * Number(inputData.timeToElapse)) * days) + '.'
  ];
const explanationBtns = document.querySelectorAll('#mild-result button');
const tipsSection = document.querySelector('#tips');
const tipsDiv = document.querySelector('#tips div');
// const link6 = document.querySelector('#link6');
for (let i = 0; i < explanationArray.length; i++) {
  explanationBtns[i].addEventListener('click', () => {
    tipsSection.style.display = 'block';
    event.stopPropagation();
    // for ()
    tipsDiv.innerHTML = explanationArray[i];
    // link6.click();
  })
};



let beds2, remainingBeds2 = outputData.severeImpact.hospitalBedsByRequestedTime;
  if (remainingBeds2 < 0) {
    beds2 = 'will be short by ' + putCommas((remainingBeds2 * -1)) + '. This is \
    because the result will be ' + putCommas(remainingBeds2);
  } else {
    beds2 = 'will be ' + putCommas(remainingBeds2);
  }
  let inDaysTime2 = ' in ' + putCommas(Number(inputData.timeToElapse)) + ' ' + inputData.periodType + ' time';
  let dailyDollarsLost2 = outputData.severeImpact.dollarsInFlight, totalDollarsLost2;
  if (dailyDollarsLost2) {
    dailyDollarsLost2 = inputData.region.name.toUpperCase() + ' will be \
    losing ' + dailyDollarsLost2 + ' daily from tomorrow till ' +
    inputData.timeToElapse + ' ' + inputData.periodType + '.';
  } else {
    dailyDollarsLost2 = 'You need to fill the "Population" and the "Average \
    Daily Income (USD)" fields to be able to see this estimate.';
  }
  const explanationArray2 = [
  'This is simply the reported cases you provided \
  in the form input field for your region. You \
  provided ' + putCommas(Number(inputData.reportedCases)) + '.',
  'Studies have shown that given the reported cases \
  in any region, there could be other infected persons in that \
  region who either have not developed symptoms of COVID-19 or have not \
  been tested. This is estimated to be 50 times the reported cases in \
  "SEVERE IMPACT" forecast. That is: ' + putCommas(Number(inputData.reportedCases)) + ' × 50. This gives \
  ' + putCommas(Number(outputData.severeImpact.currentlyInfected)) + ' estimated infected persons today.',
  inDaysTime2 + ', the infected persons (Not reported cases this time) are expected to \
  rise if the necessary precautions adviced by WHO are not taken. This app projects \
  that number to be around ' + putCommas(outputData.severeImpact.infectionsByRequestedTime) + '. This is based on the \
  findings that the number of currently infected persons doubles every 3 days. \
  see the references at the bottom of this page.',
  'Studies have also shown that not all COVID-19 infected \
  persons have severe symptoms that would require hospitalization;\
   at least not immediately. About 15% of infected persons will require \
   hostpitalization according to studies. You can find my references at the bottom of the page. \
   This is the estimated number of severe positive cases that will \
   require hospitalization to recover. Therefore, ' + inDaysTime2 + 
   ' 15% of ' + putCommas(outputData.severeImpact.infectionsByRequestedTime) + ' infected persons will need to go \
   to the hospital. This gives ' + putCommas(outputData.severeImpact.severeCasesByRequestedTime) + '.',
  inDaysTime2 + ', the severely infected \
  persons (' + putCommas(outputData.severeImpact.severeCasesByRequestedTime) +
   ') computed above will need to be hospitalized. This implies \
  that, since the total hospital beds today is ' + putCommas(Number(inputData.totalHospitalBeds)) +
  ', as you provided, and ' + putCommas(outputData.severeImpact.severeCasesByRequestedTime) +
   ' severely infected persons will need\
   hospital beds. The available hospital beds today will be: 15% of ' +
    putCommas(Number(inputData.totalHospitalBeds)) + ' (studies have also \
    shown that only an estimate of 15% of hospital beds will be left for COVID-19 \
    patients because other patients will need beds also). If all severely infected \
    COVID-19 pateients should be admitted, the available beds ' + beds2,
  'Some of the COVID-19 severely infected people that will go to the \
  hospital will be worse that they will require to be put in the Intensive Care Unit (ICU). \
  This number has been computed, as per research finding, to be ' +
   putCommas(outputData.severeImpact.casesForICUByRequestedTime),
   'This calculation represents the fraction of the COVID-19 petients, \
   who are in the Intensive Care Unit (ICU), that will require ventilators because \
   they are having problems with breathing. They are estimated to be around \
   ' + putCommas(outputData.severeImpact.casesForVentilatorsByRequestedTime) +
    ' according to studies. That is 2% of projected \
   infected people ' + inDaysTime2 + ' (2% of ' + putCommas(outputData.severeImpact.infectionsByRequestedTime) + ').',
  'This represent the amount of dollars that ' + inputData.region.name.toUpperCase() +
  ' will be loosing because of COVID-19 every day from today till ' +
  putCommas(Number(inputData.timeToElapse)) + ' ' + inputData.periodType + ' of our forecast. This will amount to ' +
   outputData.severeImpact.dollarsInFlight + ' daily from tomorrow till ' + putCommas(Number(inputData.timeToElapse)) +
    ' ' + inputData.periodType + '.',
  'The total economic loss in USD represent the sum total \
  of the daily losses above this. That is the amount of money that the economy of \
  ' + inputData.region.name.toUpperCase() + ' will lose ' + inDaysTime2 + '. This is computed \
  to be: ' + putCommas(outputData.severeImpact.dollarsInFlight) + ' × ' + putCommas(Number(inputData.timeToElapse)) +
  ' × ' + days + ' = ' + putCommas((outputData.severeImpact.dollarsInFlight * Number(inputData.timeToElapse)) * days) + '.'
  ];
const explanationBtns2 = document.querySelectorAll('#severe-result button');
const tipsSection2 = document.querySelector('#tips');
// const tipsDiv2 = document.querySelector('#tips div');
// const link6 = document.querySelector('#link6');
for (let i = 0; i < explanationArray2.length; i++) {
  explanationBtns2[i].addEventListener('click', () => {
    tipsSection.style.display = 'block';
    event.stopPropagation();
    // for ()
    tipsDiv.innerHTML = explanationArray2[i];
    // link6.click();
  })
}





});
const body = document.querySelector('body');
const tipsButtons = document.querySelectorAll('.tips-btn');
const inputs = document.querySelectorAll('input');
const tipsSection = document.querySelector('#tips');
const tipsDiv = document.querySelector('#tips div');
for (let i = 0; i < tipsButtons.length; i++) {
  tipsButtons[i].addEventListener('click', (event) => {
    tipsSection.style.display = 'block';
    // event.stopPropagation();
    tipsDiv.innerHTML = tipsArray[i];
    
  })
};
const tipsArray = [
  '"Country/State/Region": This is the continent, country, state or any region \
  that you want to forecast the impact of corona virus for. \
  Just type the name of the place you are forecasting for.',
  '"Population": This is the total number of persons living in the region you chose in \
  the input above it. The population of the country, state or any region.\
  This index can be found on the internet using google search.\
  Assuming you are forecasting for Nigeria, You can click this \
  link to go right away <a target="_blank" \
  href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">\
  Population of all countries</a>',
  '"Average Daily Income (USD)": This means how much money on the average \
  each person earns as income daily. For example, if most people earn 4,000\
   some day and 6,000  another day, the average daily income is 5,000. \
   That is adding together the incomes for the days \
  and dividing them equally among the days. This index can be found on the \
  internet using google search. Assuming you are forecasting for Nigeria,\
   You can follow this link for direct navigation \
  <a href="https://weetracker.com/2019/12/09/over-100-million-nigerians-earn-below-700-naira-daily/\
  " target="_blank">Nigeria average daily income</a>',
  '"Population percentage earning some USD Daily": This value can only be provided \
  if and only if you provided the "Average Daily Income (USD)". In a region, there are some people \
  earning a huge amount of money daily. In most cases, these people only represent a\
   small percentage of the population while the majority earns lower. For example, In a region with \
  4000 persons living there as the population, 80 percent (3,600 persons) might be \
  earning 6 dollars per day while the remaining 20 percent (800 persons) earns more. \
  The required value that you should provide is 80. This index can be found on\
   the internet using google search. As at when i wrote this program, \
   Wikipedia Encyclopedia said about 50%.\
   Assuming you are forecasting for Nigeria, Find our here: \
   <a href="https://en.wikipedia.org/wiki/Poverty_in_Nigeria" target="_blank">\
   The percentage of nigerians living below 2 dollars income per day</a>. If \
   you want to use this, enter 50 in this field.',
  '"Average Age": This represents the age on each person in the region on the \
  average. For example, if the population of the \
  region is only 4 persons, and first person is 3 years old, second 2, third 1 \
  and fourth is 2. the total age is 8 and if you divide it \
  evenly among the 4 persons you get 8/4 which is 2. This 2 is the value \
  required but you can not determine it on your own. \
  You must find it in the internet using google search or other \
  statistical data sources. Assuming you are forecasting for Nigeria,\
   You can go to this statistical site: \
  <a href="https://www.statista.com/statistics/382229/average-age-of-the-population-in-nigeria/"\
   target="_blank">Average age in Nigeria</a>',
  '"Total Hospital Beds": This is the total of all the beds in all the hospitals\
   in that region. This information can only be found in the region\'s statistical \
   database. The data can be found on the internet using google search also. \
    Assuming you are estimating the impact of COVID-19 In Nigeria, \
    As at 2014, 6 years ago, total hospital beds in Nigeria was 134,000 \
   according to the link below. With 3.8% growth, it can be estimated \
   to be 162,000 total hospital beds in 2020. <a href="\
   https://2016.export.gov/industry/health/healthcareresourceguide/eg_main_092285.asp"\
    target="_blank">Total hospital beds in Nigeria</a>',
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
let remainingBeds, beds;
// inputData = collectData();
// console.log(inputData)
// outputData = covid19ImpactEstimator(inputData);
const tipsCloseBtn = document.querySelector('#tips span');
tipsCloseBtn.addEventListener('click', () => {
  document.querySelector('#tips').style.display = 'none';
});

