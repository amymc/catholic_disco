#!/usr/bin/env node
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
  message: 'Mary and Pauline come to chat to you. Do you engage in conversation?' + os.EOL,
  choices: [
    'Sure why not, they’re a bit of craic' + os.EOL,
    'No. I don’t really want to talk to anyone. I just came here to get away from my 6 brothers.' +  os.EOL + '  (If only contraception was available, I could have been an only child…)'
  ]
};

const johnDancePrompt = {
  type: 'list',
  name: 'dance',
  message: 'John comes to talk to you and asks if you want to dance' + os.EOL,
  choices: [
    'Yes, sure Fr. So-and-so won’t see us, he’s half blind' + os.EOL,
    'Oh I don\'t know now, that won\'t go down too well with the Fr.' +  os.EOL + '  Get out your rosary beads and he\'ll think we\'re saying a decade together.' + os.EOL,
    'No, thanks to my Catholic education I have no idea how babies are made.' +  os.EOL + '  I’m afraid to have any contact with the opposite sex.'
  ]
};

const noraDancePrompt = {
  type: 'list',
  name: 'dance',
  message: chalk.italic('Fr:') + chalk.yellow.bgBlack(' You’re dancing too close to that cailín.'+ os.EOL + '      If I catch you at it again I\'ll have you deported for corrupting the local dance hall.') + os.EOL,
  choices: [
    'But you can’t deport me, I’m Irish!' + os.EOL,
    'Well, at least I\'m not fiddling with young fellas.'
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

const eavesdropPrompt = {
  type: 'list',
  name: 'eavesdrop',
  message: 'What do you do?' + os.EOL,
  choices: [
    'Nothing. If my abuse at the hands of the Christian Brothers has taught me anything, it\'s that you can\'t win with a man of the cloth.' + os.EOL,
    'Go to the gardaí with this information.'
  ]
};

const genderPrompt = {
  type: 'list',
  name: 'gender',
  message: 'Before we begin chose your gender for the purpose of the game' +  os.EOL + '  Remember this is 1950’s rural Ireland, only 2 genders exist!',
  choices: ['Male', 'Female']
}

function start() {
  clear();
  console.log(chalk.black.bgGreen('++++ Welcome to the catholic disco ++++'));
  console.log('Let’s party like it’s 1959!');
  console.log();
  getGender();
}

function intro() {
  clear();
  console.log('Right so, let\'s see how pious you are.');
  console.log('You\'re at the local dance hall for the monthly disco. The local priest Fr. So-and-so is keeping an eye on goings-on...');
  console.log();
}

function getGender() {
  inquirer.prompt(genderPrompt).then((answers) => {
    intro();
    if(answers.gender === 'Female') {
      haveTheChats();
    } else {
      eavesdrop();
    }
  });
}

function eavesdrop() {
  console.log('On your way to the holy water font you overhear the Bishop talking to Fr. So-and-so...' + os.EOL + os.EOL + chalk.italic('Bishop:') + chalk.yellow.bgBlack(' Oh Fr. So-and-so, I heard you’ve been fiddling with children. ' + os.EOL + '        Ah sure that’s grand, I’m partial to a bit of altar boy myself. ' + os.EOL + '        We’ll move you to a new parish. No one will ever know.') + os.EOL);
  inquirer.prompt(eavesdropPrompt).then((answers) => {
    clear();
    if(answers.eavesdrop === eavesdropPrompt.choices[0]) {
      console.log("Good man. You make a hasty retreat to the dance floor.");
      setTimeout(meetNora, 1000);
    } else {
      console.log('Sure don\'t you know that Garda Burke plays bridge with the Bishop.');
      console.log('');
      console.log('The Bishop manages to get you imprisioned for homosexual acts despite any proof of said acts.');
      setTimeout(gameOver, 1500);
    }
  });
}

function meetNora() {
  console.log('');
  console.log('Nora\'s always giving you the eye when you\'re coming out of confession.' + os.EOL + 'You ask her to dance.' + os.EOL);
  inquirer.prompt(noraDancePrompt).then((answers) => {
    clear();
    if(answers.dance === noraDancePrompt.choices[0]) {
      console.log(chalk.italic('Fr:') + chalk.yellow.bgBlack(' Ah sure nevermind that, the power of the Catholic church knows no bounds.'));
      setTimeout(goOutside, 1500);
    } else {
      console.log('You\'re sent to jail for blasphemy');
      gameOver();
    }
  });
}

function goOutside() {
  clear();
  console.log('Yourself and Nora go round the back of the hall to get some peace from Fr. So-and-so.')
  console.log('Just as you\'re getting down to some serious necking Sr. Fatima appears.');
  setTimeout(function() {
    console.log('');
    console.log(chalk.italic('Sr:') + chalk.yellow.bgBlack(' Off to the priesthood with you young man. That’ll stop your urges.'));
    gameOver();
  }, 2500);
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
  inquirer.prompt(johnDancePrompt).then((answers) => {
    if(answers.dance === johnDancePrompt.choices[0]) {
      becomeNun();
    } else if (answers.dance === johnDancePrompt.choices[1]) {
      gettingClose();
    } else {
      getMedal();
    }
  });
}

function getMedal() {
  clear();
  console.log('Cailín maith. Fr. So-and-so gives you a holy medal for your piousness.');
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
      console.log('You must be joking girl! Sure the catholic church doesn’t believe in contraception.' + os.EOL +'Thanks be to God AIDS doesn’t exist yet.')
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
  console.log('');
  console.log('#makeirelandsecularagain');
  console.log('');
  console.log('#repealthe8th');
  console.log('');
  console.log('Want to see the code for this?');
  console.log('https://github.com/amymc/catholic_disco');
  console.log('');
  console.log('Confused by the reference to Buckaroo or deportation?');
  console.log('See here >>> https://github.com/amymc/catholic_disco/readme.txt')
}

function haveTheChats() {
  inquirer.prompt(chatPrompt).then((answers) => {
    if(answers.chat === chatPrompt.choices[0]) {
      getPenance();
    } else {
      meetJohn();
    }
  });
}

start();
