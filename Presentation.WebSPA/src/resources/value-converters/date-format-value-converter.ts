// ReSharper disable once UnusedLocalImport
import moment from "moment";

export class DateFormatValueConverter {
    toView(value: string, format: string = "M/D/YYYY h:mm:ss a") {
        // ReSharper disable once TsResolvedFromInaccessibleModule
        return moment(value).format(format);
    }
}