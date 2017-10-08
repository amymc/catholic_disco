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
let i = 0;
const ui = new inquirer.ui.BottomBar({bottomBar: progress[i % 5]});

const chatPrompt = {
  type: 'list',
  name: 'chat',
  message: 'Mary and Fatima come to chat to you. Do you engage in conversation?',
  choices: [
    'Sure why not, they’re a bit of craic',
    'No. I don’t really want to talk to anyone. I just came here to get away from my 6 brothers.' +  os.EOL + '  (If only contraception was available, I could have been an only child…)'
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
  console.log();
  console.log('Fr. So-and-so sees you all laughing.');
  console.log();
  console.log(chalk.italic('Fr:') + chalk.yellow.bgBlack(' Careful now, you sound like you’re having too much fun.' +  os.EOL + '    Go and say a few hail marys. That’ll soften your cough for you.'));
  
  setTimeout(doPenance, 500);
}

function doPenance() {
  console.log();

  const updateProgress = setInterval(function () {
    if (i === 4) {
      clearInterval(updateProgress);
    };
    ui.updateBottomBar(progress[i++ % 5]);
  }, 500);

}

function meetJohn() {
  console.log();
  
}

function haveTheChats() {
  console.log();
  console.log('Right so, let\'s see how pious you are.');
  console.log('You\'re at the local dance hall for the monthly disco. The local priest Fr. So-and-so is keeping an eye on goings-on …');
  console.log();

  inquirer.prompt(chatPrompt).then(function (answers) {
    if(answers.chat = chatPrompt.choices[0]) {
      getPenance();
    } else {
      meetJohn();
    }
  });
}

intro();




