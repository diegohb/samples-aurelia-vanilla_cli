import * as $ from "jquery";

export class SpaOneApp {
    message = 'Hello World from SPA One!';

    public attached(): Promise<any> {
        $("div.modal-body").text("Hello from Bootstrap JQuery plugin!");
        return Promise.resolve(true);
    }
}
