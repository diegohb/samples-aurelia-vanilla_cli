export class SpaOneApp {
    message = 'Hello World from SPA One!';

    public attached(): Promise<any> {
        return Promise.resolve(true);
    }
}
