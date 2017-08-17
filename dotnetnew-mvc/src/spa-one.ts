///<reference path="..\node_modules\@types\jquery\index.d.ts"/>

export class SpaOneApp {
    message = 'Hello World from SPA One!';

    public attached(): Promise<any> {
        $("div.modal-body").text("Confirmed typings. Using reference instead of import will avoid reloading & defining jquery within bundle if it's present at _Layout.");
        return Promise.resolve(true);
    }
}
