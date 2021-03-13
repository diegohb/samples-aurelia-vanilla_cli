import { customElement, bindable, bindingMode, LogManager } from "aurelia-framework";
import { SingleItemSelectorElementBase } from "./single-item-selector-element-base";

@customElement("lr-single-selector")
export class LeftRightSingleSelectorElement extends SingleItemSelectorElementBase {
    protected readonly _logger = LogManager.getLogger(typeof LeftRightSingleSelectorElement);

    constructor() {
        super();
    }

    @bindable({ defaultBindingMode: bindingMode.oneTime, default: "", attribute: "label-text" })
    public labelText: string;

    @bindable({ defaultBindingMode: bindingMode.oneTime, attribute: "allow-cycle", default: false })
    public allowCycle: boolean;

    // ReSharper disable once InconsistentNaming
    private async activate(pModel: any): Promise<void> {
        this.items = pModel.items;
        this.selectedItem = pModel.selectedItem;
        this.displayPropertyName = pModel.displayProperty;
        this.valuePropertyName = pModel.valueProperty;
        //this.onChange = pModel.onChange; //TODO: unable to pass this through properly using <compose> because it will pass all args to first arg
    }

    public selectPrevious(): void {
        if (this.disabled)
            return;

        let newIndex: number = this._selectedItemIndex - 1;
        if (newIndex < 0)
            newIndex = this.allowCycle ? this._getMaxIndex() : 0;

        this.selectedItem = this.items[newIndex];
    }

    public selectNext(): void {
        if (this.disabled)
            return;

        let newIndex = this._selectedItemIndex + 1;
        let maxIndex = this._getMaxIndex();
        if (newIndex > maxIndex)
            newIndex = this.allowCycle ? 0 : maxIndex;

        this.selectedItem = this.items[newIndex];
    }

    private _getMaxIndex(): number {
        return this.items.length - 1;
    }
}