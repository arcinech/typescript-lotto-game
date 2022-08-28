import inquirer from 'inquirer';

const chosenNumbers: Array<number> = [];
const randomNumbers: Array<number> = [];

const startApp = async (): Promise<void> => {
  const validateInput = (text: string): boolean => {
    const number: number = parseInt(text, 10);
    return (
      !isNaN(number) &&
      number > 0 &&
      number < 50 &&
      !chosenNumbers.includes(number)
    );
  };

  do {
    const result = await inquirer.prompt([
      {
        name: 'number',
        type: 'input',
        message: 'Select a number...',
      },
    ]);

    if (validateInput(result.number)) {
      chosenNumbers.push(parseInt(result.number));
    } else {
      console.log('Incorrect input');
    }
  } while (chosenNumbers.length < 6);

  const validateRandomNumber = (number: number): boolean => {
    return !randomNumbers.includes(number);
  };

  const randomNewNumber = (): number => {
    return Math.floor(Math.random() * 48) + 1;
  };

  do {
    const number: number = randomNewNumber();
    if (validateRandomNumber(number)) {
      randomNumbers.push(number);
    }
  } while (randomNumbers.length < 6);

  const howManyHits = randomNumbers.filter((number) =>
    chosenNumbers.includes(number)
  );

  console.log(`You choose ${howManyHits.length} numbers correctly`);
};

startApp();
