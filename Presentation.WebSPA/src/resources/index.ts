import {FrameworkConfiguration} from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
  config.globalResources(["./value-converters/date-format-value-converter"]);
}
