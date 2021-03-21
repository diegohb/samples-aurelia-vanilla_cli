import { bindable, bindingMode, observable, LogManager } from "aurelia-framework";

export abstract class SingleItemSelectorElementBase {
    protected readonly _logger = LogManager.getLogger(typeof SingleItemSelectorElementBase);
    @observable protected _selectedItemIndex: number = -1;

    constructor() {

    }

    @bindable({ defaultBindingMode: bindingMode.oneTime, attribute: "empty-text", default: "choose" })
    public emptyText: string;

    @bindable({ defaultBindingMode: bindingMode.twoWay, attribute: "class" })
    public cssClass: string;

    @bindable({ defaultBindingMode: bindingMode.twoWay, attribute: "disabled" })
    public disabled: boolean;

    @bindable({ defaultBindingMode: bindingMode.oneTime, attribute: "display-property" })
    public displayPropertyName: string;

    @bindable({ defaultBindingMode: bindingMode.oneTime, attribute: "value-property" })
    public valuePropertyName: string;

    @bindable({ defaultBindingMode: bindingMode.toView, changeHandler: "_itemsChanged" })
    public items: any[];

    @bindable({ defaultBindingMode: bindingMode.twoWay, attribute: "selected-item", changeHandler: "_selectedItemChanged" })
    public selectedItem: any;

    @bindable()
    public onChange: Function;

    public getDisplayValue(pItem: any): string {
        if (!pItem)
            return this.emptyText;

        if (this.displayPropertyName)
            return pItem[this.displayPropertyName];

        if (typeof pItem === "object" && this.valuePropertyName)
            return pItem[this.valuePropertyName];
        else
            return pItem.toString();
    }


    protected _itemsChanged(pNewValue: any[], pOldValue: any[]): void {
        this._validateProperties();
        this._selectedItemIndex = -1;
    }

    protected _selectedItemChanged(pNewValue: any, pOldValue: any): void {
        if (!this.items || this.items.length < 1) {
            throw new Error("Unexpected error. Selected item changed but items is empty!");
        }

        let selectedIndex = this.items.indexOf(pNewValue);
        if (selectedIndex === -1) {
            this._logger.warn("Unable to find item within list.", pNewValue);
            throw new Error("Item doesn't exist in array.");
        }
        this._selectedItemIndex = selectedIndex;
    }

    protected async _selectedItemIndexChanged(pNewIndex: number, pOldIndex: number): Promise<void> {
        if (!this.onChange)
            return;

        try {
            const oldItem: any = this.items[pOldIndex];
            const newItem: any = this.items[pNewIndex];
            await this.onChange({ pSender: this, pNewValue: newItem, pOldValue: oldItem });
        } catch (err) {
            this._logger.error("Error occurred trying to call supplied onChange method.", err);
        }
    }

    protected _validateProperties() {
        if (!Array.isArray(this.items)) {
            this._logger.error("Invalid array of items provided to SingleItemSelectorElementBase.");
            return;
        }

        if (!this.items || this.items.length === 0) {
            this._logger.error("Array of items provided to SingleItemSelectorElementBase is empty.");
            return;
        }

        const allContainProperties: boolean = this.items.every(pItem => {
            if (typeof pItem === "object" && this.valuePropertyName && pItem[this.valuePropertyName] === undefined)
                return false;

            if (this.displayPropertyName) {
                if (pItem[this.displayPropertyName] === undefined)
                    return false;

                //check is valid type to be rendered in html
                if (typeof pItem[this.displayPropertyName] !== "string" && typeof pItem[this.displayPropertyName] !== "number") {
                    return false;
                }
            }

            return true;
        });

        if (!allContainProperties) {
            this._logger.error("Invalid item found in data source provided to SingleItemSelectorElementBase.");
        }
    }
}
