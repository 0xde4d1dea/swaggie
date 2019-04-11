import { injectable, inject } from 'inversify';

import genTypes from './genTypes';
import { applyFormatOptions } from './support';
import { ApiSpec, ApiOperation, ClientOptions } from '../types';
import { TYPES } from '../ioc';
import { OperationsGenerator } from './operations-generator';

@injectable()
export class CodeGenerator {
  constructor(
    @inject(TYPES.OperationsGenerator) private readonly operationGenerator: OperationsGenerator
  ) {}

  generate(spec: ApiSpec, operations: ApiOperation[], options: ClientOptions): ApiSpec {
    applyFormatOptions(options);
    this.operationGenerator.generate(spec, operations, options);
    genTypes(spec, options);
    return spec;
  }
}
