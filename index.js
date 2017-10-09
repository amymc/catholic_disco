#!/usr/bin/env node
//const commander = require('commander');
const clear = require('clear');
const chalk = require('chalk');
const inquirer = require('inquirer');
const os = require('os');

const progress = [
  '/ Praying',
  '| Praying',
  '\\ Still praying',
  '- On the last hail mary',
  'Penance done!\nYou\'re back in business'
];

const gestation = [
  '/ Tick tock',
  '| Time is passing',
  '\\ The foetus is growing',
  '- You can\'t keep it a secret any longer'
];
let i = 0;
const ui = new inquirer.ui.BottomBar({bottomBar: progress[i % 5]});

const chatPrompt = {
  type: 'list',
  name: 'chat',
  message: 'Mary and Fatima come to chat to you. Do you engage in conversation?' + os.EOL,
  choices: [
    'Sure why not, they’re a bit of craic' + os.EOL,
     'No. I don’t really want to talk to anyone. I just came here to get away from my 6 brothers.' +  os.EOL + '  (If only contraception was available, I could have been an only child…)'
  ]
};

const dancePrompt = {
  type: 'list',
  name: 'dance',
  message: 'John comes to talk to you and asks if you want to dance' + os.EOL,
  choices: [
    'Yes, sure Fr. So-and-so won’t see us, he’s half blind' + os.EOL,
    'Oh I don\'t know now, that won\'t go down too well with the Fr.' +  os.EOL + '  Get out your rosary beads and he\'ll think we\'re saying a decade together.' + os.EOL,
    'No, thanks to my Catholic education I have no idea how babies are made.' +  os.EOL + '  I’m afraid to have any contact with the opposite sex.'
  ]
};

const closePrompt = {
  type: 'list',
  name: 'close',
  message: 'You’re getting fierce close, do you want to go around the back of the dance hall with John' + os.EOL,
  choices: [
    'Yes, Fr. So-and-so looks like he’s busy with an altar boy' + os.EOL,
    'That depends, does he have a condom?' + os.EOL,
    'No, I won’t risk it. I don’t want to get pregnant before marriage and spend the rest of my days in a convent packing buckaroo games.' + os.EOL
  ]
};

function intro() {
  clear();
  console.log(chalk.black.bgGreen('++++ Welcome to the catholic disco ++++'));
  console.log('Let’s socialise like it’s 1950!');
  console.log();
  getGender();
}

function getGender() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'gender',
      message: 'Before we begin chose your gender for the purpose of the game' +  os.EOL + '  Remember this is 1950’s rural Ireland, only 2 genders exist!',
      choices: ['Male', 'Female']
    }
  ]).then(() => {
    haveTheChats();
  });
}

function getPenance() {
  clear();
  console.log('Fr. So-and-so sees you all laughing.');
  console.log();
  console.log(chalk.italic('Fr:') + chalk.yellow.bgBlack(' Careful now, you sound like you’re having too much fun.' +  os.EOL + '    Go and say a few hail marys. That’ll soften your cough for you.'));
  
  setTimeout(doPenance, 3000);
}

function doPenance() {
  console.log();

  const updateProgress = setInterval(function () {
    if (i === 5) {
      clearInterval(updateProgress);
      i = 0;
      setTimeout(meetJohn, 1000);
      return;
    };
    ui.updateBottomBar(progress[i++ % 5]);
  }, 700);

}

function meetJohn() {
  clear();
  inquirer.prompt(dancePrompt).then((answers) => {
    if(answers.dance === dancePrompt.choices[0]) {
      becomeNun();
    } else if (answers.dance === dancePrompt.choices[1]) {
      gettingClose();
    } else {
      getMedal();
    }
  });
}

function getMedal() {
  clear();
  console.log('Cailin maith. Fr. So-and-so gives you a holy medal for your piousness.');
  console.log('');
  console.log('You\'ve survived the disco but you\'ll be plagued by Catholic guilt your whole life');
  gameOver();
}

function gettingClose() {
  clear();
  inquirer.prompt(closePrompt).then((answers) => {
    if(answers.close === closePrompt.choices[0]) {
      getPregnant();
    } else if (answers.close === closePrompt.choices[1]) {
     // gettingClose();
    } else {
     // getMedal();
    }
  });
}

function getPregnant() {
  clear();
  const updateGestation = setInterval(function () {
    if (i === 4) {
      clearInterval(updateGestation);
      i = 0;
      setTimeout(goingToHell, 1000);
      return;
    };
    ui.updateBottomBar(gestation[i++ % 4]);
  }, 700);
}

function goingToHell() {
  clear();
  console.log(chalk.italic('Fr:') + chalk.yellow.bgBlack(' Oh you’re pregnant out of wedlock are you? You’ll go straight to hell for that child,' +  os.EOL + '    but in the meantime we’ll force you to have the baby and then bury you and the child in an unmarked grave.'));
  gameOver();
}

function becomeNun() {
  clear();
  console.log('Oh you underestimated Fr.’s eyesight.');
  console.log();
  setTimeout(function() {
    console.log(chalk.italic('Fr:') + chalk.yellow.bgBlack(' You’re dancing too close to that fella. Off to the nunnery with you to learn a bit of chastity.'));
    gameOver();
  }, 700);
}

function gameOver() {
  console.log('');
  console.log(chalk.black.bgGreen('========================='));
  console.log(chalk.black.bgGreen('++++++++GAME OVER++++++++'));
  console.log(chalk.black.bgGreen('========================='));
}

function haveTheChats() {
  clear();
  console.log('Right so, let\'s see how pious you are.');
  console.log('You\'re at the local dance hall for the monthly disco. The local priest Fr. So-and-so is keeping an eye on goings-on …');
  console.log();

  inquirer.prompt(chatPrompt).then((answers) => {
    if(answers.chat === chatPrompt.choices[0]) {
      getPenance();
    } else {
      meetJohn();
    }
  });
}

intro();




