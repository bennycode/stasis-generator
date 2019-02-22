import chalk from 'chalk'

import { testBundlerPicksUpFiles, testClearDistDirectory, testGeneratesPrettyUrls, testRendersPageWithCustomLayout, testRendersPageWithDefaultLayout } from './compiler.test';
import { testLoadRaptorConfig } from './utils.test';


export interface TCase {
	description: string;
	run(): Promise<boolean>;
}
/**
 * 
 * @param tCase Promise<boolean>
 */
export async function test(tCase: TCase): Promise<boolean|undefined> {
	try {
		console.log(chalk.gray(tCase.description))
		const result = await tCase.run()

		if(result) {
			console.log(chalk.green('success'))
		} else {
			console.log(chalk.red(tCase.description))
		}

		return result;
	} catch(e) {
		console.error(chalk.red(e.message))
		console.error(e.stack)
	}
}


export async function executeTests (cases: TCase[]) {
	const all = cases.map(t => test(t))
	try {
		await Promise.all(all)
	} catch(e) {
		console.error(chalk.red(e.message))
		console.error(e.stack)
	}
}

export async function executeSyncTests (cases: TCase[]) {
	for(let i = 0; i < cases.length; i++) {
		try {
			await test(cases[i])
		} catch(e) {
			console.error(chalk.red(e.message))
			console.error(e.stack)
		}
	}
}


const cases: TCase[] = [
	testLoadRaptorConfig(),
	testClearDistDirectory(),
	testRendersPageWithDefaultLayout(),
	testRendersPageWithCustomLayout(),
	testGeneratesPrettyUrls(),
	testBundlerPicksUpFiles()
]

executeSyncTests(cases)