//import {BaseCompiler} from '../base-compiler.js';
import {ClangCompiler} from './clang.js';

//import path from 'path';
//import {ExecutionOptionsWithEnv} from '../../types/compilation/compilation.interfaces.js';
//import {ParseFiltersAndOutputOptions} from '../../types/features/filters.interfaces.js';

export class ChkCCompiler extends ClangCompiler {
    static override get key() {
        return 'chkc';
    }

    /*
    override optionsForFilter(filters: ParseFiltersAndOutputOptions, outputFilename: string) {
        let options = [`-o=${this.filename(outputFilename)}`];
        if (this.compiler.intelAsm && filters.intel && !filters.binary) {
            options = options.concat(this.compiler.intelAsm.split(' '));
        }
        if (!filters.binary) {
            options.push('-S');
        }
        return options;
    }

    override async runCompiler(
        compiler: string,
        options: string[],
        inputFilename: string,
        execOptions: ExecutionOptionsWithEnv,
    ) {
        if (!execOptions) {
            execOptions = this.getDefaultExecOptions();
        }

        execOptions.customCwd = path.dirname(inputFilename);

        return await super.runCompiler(compiler, options, inputFilename, execOptions);
    }

    override getOutputFilename(dirPath: string, outputFilebase: string) {
        return path.join(dirPath, outputFilebase + ".chkdc");
    }
    */
}
