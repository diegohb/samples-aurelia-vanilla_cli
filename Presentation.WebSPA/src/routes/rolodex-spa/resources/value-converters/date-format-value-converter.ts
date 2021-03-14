import { LogManager } from "aurelia-framework";
// ReSharper disable once UnusedLocalImport
import moment from "moment";

export class DateFormatValueConverter {
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    toView(value: string, format: string = "M/D/YYYY h:mm:ss a") {
        // ReSharper disable once TsResolvedFromInaccessibleModule
        let formattedDate = moment(value).format(format);
        this._logger.debug("date formatted", { original: value, formatted: formattedDate });
        return formattedDate;
    }
}