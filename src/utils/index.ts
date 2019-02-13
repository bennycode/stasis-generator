import fs from 'fs-extra'
import chalk from 'chalk'
import p from 'path'

export const parseConfigFile = async (path: string) => {
	try {
		let config = await fs.readJson(path)
		const configBasePath = p.dirname(path)
		config = {
			...config,
			// add basep ath to properly resolve config paths
			basePath: configBasePath
		}
		return config
	} catch(e) {
		console.log(chalk.red(e.message))
		process.exit(0)
	}
}
