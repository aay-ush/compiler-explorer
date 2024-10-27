import path from 'path';

import fs from 'fs-extra';

import {ToolInfo} from '../../types/tool.interfaces.js';

import {ToolEnv} from './base-tool.interface.js';
import {BaseTool} from './base-tool.js';

export class CCDTool extends BaseTool {
    static get key() {
        return 'ccd-tool';
    }

    constructor(toolInfo: ToolInfo, env: ToolEnv) {
        super(toolInfo, env);

        this.addOptionsToToolArgs = false;
    }

    override async runTool(compilationInfo: Record<any, any>, inputFilepath: string, args: string[], stdin: string) {
        const sourcefile = inputFilepath;
        const compilerExe = compilationInfo.compiler.exe;
        const options = compilationInfo.options;
        const dir = path.dirname(sourcefile);

        const compileFlags = options.filter((option: string) => option !== sourcefile);
        if (!compilerExe.includes('clang')) {
            compileFlags.push(this.tool.options);
        }

        const query_commands_file = this.getUniqueFilePrefix() + 'query_commands.txt';

        await fs.writeFile(path.join(dir, 'compile_flags.txt'), compileFlags.join('\n'));
        await fs.writeFile(path.join(dir, query_commands_file), stdin);
        args.push(inputFilepath); //'-f', query_commands_file);
        const toolResult = await super.runTool(compilationInfo, sourcefile, args);

        if (toolResult.stdout.length > 0) {
            const lastLine = toolResult.stdout.length - 1;
            toolResult.stdout[lastLine].text = toolResult.stdout[lastLine].text.replaceAll(/(clang-query>\s)/gi, '');
        }

        return toolResult;
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
