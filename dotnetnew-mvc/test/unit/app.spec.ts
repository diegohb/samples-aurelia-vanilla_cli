import { SpaOneApp } from "../../src/spa-one/spa-one";
import { SpaTwoApp } from "../../src/spa-two/spa-two";

describe('the app one', () => {
  it('says hello', () => {
    expect(new SpaOneApp().message).toBe('Hello World from SPA One!');
  });
});

describe('the app two', () => {
  it('says hello', () => {
    expect(new SpaTwoApp().message).toContain("SPA Two");
  });
});
