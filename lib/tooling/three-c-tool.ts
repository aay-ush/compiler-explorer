//import path from 'path';

//import fs from 'fs-extra';

import {ToolInfo} from '../../types/tool.interfaces.js';
import {assert} from '../assert.js';
//import * as exec from '../exec.js';
import {logger} from '../logger.js';
//import * as utils from '../utils.js';

import {ToolEnv} from './base-tool.interface.js';
import {BaseTool} from './base-tool.js';

export class ThreeCTool extends BaseTool {
    static get key() {
        return 'three-c-tool';
    }

    constructor(toolInfo: ToolInfo, env: ToolEnv) {
        super(toolInfo, env);

        this.addOptionsToToolArgs = false;
    }

    override async runTool(compilationInfo: Record<any, any>, inputFilePath?: string, args?: string[]) {
        if (compilationInfo.code !== 0) {
            return this.createErrorResponse('Unable to start analysis due to compilation error.');
        }

        assert(inputFilePath);

        if (inputFilePath == null) {
            return this.createErrorResponse('Input file path not provided.');
        }
        //const sourceDir = path.dirname(inputFilepath);

        // Deal with args
        args = [];

        // Necessary arguments
        args.push('-addcr');
        /*
        args.push('analyze', '--source-file', inputFilepath);
        const outputFilePath = path.join(sourceDir, 'pvs-studio-log.log');
        args.push(
            '--output-file',
            outputFilePath,
            // Exclude directories from analysis
            '-e',
            '/opt',
            '-e',
            '/usr',
            '--pvs-studio-path',
            path.dirname(this.tool.exe) + '/pvs-studio',
            // TODO: expand this to switch() for all supported compilers:
            // visualcpp, clang, gcc, bcc, bcc_clang64, iar, keil5, keil5_gnu
            '--preprocessor',
        );
        */

        logger.warn('input: ', inputFilePath);
        logger.warn('args: ', args);

        return await super.runTool(compilationInfo, inputFilePath, args);
        // If you are to modify this code,
        // don't forget that super.runTool() does args.push(inputFilepath) inside.
        //const result = await super.runTool(compilationInfo, inputFilePath, args);
        /*
        if (result.code !== 0) {
            return result;
        }

        const plogConverterResult = await exec.execute(this.plogConverterPath, plogConverterArgs, plogExecOptions);
        if (plogConverterResult.code !== 0) {
            logger.warn('plog-converter failed', plogConverterResult);
            return this.convertResult(plogConverterResult, inputFilepath);
        }
        const plogRawOutput = await fs.readFile(plogConverterOutputFilePath, 'utf8');

        result.stdout = utils.parseOutput(plogConverterOutput, plogConverterResult.filenameTransform(inputFilepath));

        // Now let's trim the documentation link
        if (result.stdout.length > 0) {
            const idx = result.stdout[0].text.indexOf('The documentation for all analyzer warnings is available here:');
            result.stdout[0].text = result.stdout[0].text.substring(idx).concat('\n\n');
        }

        // The error output is unnecessary for the user
        // If you need to debug PVS-Studio-tool, you can comment out this line
        //result.stderr = [];
        */

        //return result;
    }

    /*
    override getDefaultExecOptions() {
        const execOptions = super.getDefaultExecOptions();
        execOptions.env = {
            ...execOptions.env,
            PATH: process.env.PATH + ':/opt/compiler-explorer/three-c-latest/bin',
        };

        return execOptions;
    }
    */
}
