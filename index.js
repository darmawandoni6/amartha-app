import chalk from 'chalk';
import ora from 'ora';

const spinner = ora(`Installation in progress... ☕`).start();

async function main() {
  try {
    spinner.text = 'setup husky...';

    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 6000),
    );
    spinner.succeed(chalk.green(`Success setup husky 🎉`));

    spinner.text = '1setup husky...';
    spinner.start();
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 3000),
    );
    spinner.succeed(chalk.green(`Success setup husky 🎉`));
  } catch (error) {
    spinner.fail(error.message);
  }
}

main();
