import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "components need document comment";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    if (!/components\/.*\/index.tsx$/.test(sourceFile.fileName)) {
      return [];
    }
    const first = sourceFile.getFirstToken();
    if (first && /\/(\/|\*)/.test(first.getFullText())) {
      return [];
    }
    return [new Lint.RuleFailure(
      sourceFile,
      first ? first.getStart() : 0,
      first ? first.getEnd()   : 0,
      Rule.FAILURE_STRING,
      this.getOptions().ruleName,
    )];
  }
}
