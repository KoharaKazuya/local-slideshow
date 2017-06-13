"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (!/components\/.*\/index.tsx$/.test(sourceFile.fileName)) {
            return [];
        }
        var first = sourceFile.getFirstToken();
        if (first && /\/(\/|\*)/.test(first.getFullText())) {
            return [];
        }
        return [new Lint.RuleFailure(sourceFile, first ? first.getStart() : 0, first ? first.getEnd() : 0, Rule.FAILURE_STRING, this.getOptions().ruleName)];
    };
    Rule.FAILURE_STRING = "components need document comment";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
