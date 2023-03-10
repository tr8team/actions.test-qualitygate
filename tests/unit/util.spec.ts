import { chai, should, it, describe } from "vitest";
import { object, string } from "zod";
import { parseJSON, toOption, toResult } from "../../src/lib/util.js";
import { Ok } from "../../src/lib/core/result.js";
// @ts-ignore
import helper from "../helper.js";
import { None, Some } from "../../src/lib/core/option";

should();

chai.use(helper);

const testDummy = object({
  name: string()
});

describe("toResult", function() {
  it("should convert an error case to Error Result", async function() {
    const subject = testDummy.safeParse({ name: 5 });
    const act = toResult(subject);

    // assert
    await act.should.be.err;
  });

  it("should convert an success case to Ok Result", async function() {
    const subject = testDummy.safeParse({ name: "hello!" });
    const act = toResult(subject);

    // assert
    return act.should.be.okOf({ name: "hello!" });
  });
});

describe("parseJSON", function() {

  it("should convert a valid JSON into Ok Result with JSON", async function() {

    const subject = `{"name":"ernest","age": 25, "info": { "url":"https://google.com", "male": true }}`;
    const expected = Ok({ name: "ernest", age: 25, info: { url: "https://google.com", male: true } });

    const act = parseJSON<any>(subject);
    return act.should.be.congruent(expected);
  });

  it("should convert an invalid JSON to an Error Result with error", async function() {

    const subject = `<html>Not JSON</html>`;
    const expected = "Unexpected token < in JSON at position 0";

    const act = parseJSON(subject);
    return act.should.be.errErrorMessage(expected);
  });

});


describe("toOption", function() {

  it("should convert an undefined value to None", async function() {

    // arrange
    const subject: string | undefined = undefined;
    const expected = None();

    // act
    const act = toOption(subject);

    // assert
    await act.should.be.congruent(expected);
  });

  it("should convert a null value to None", async function() {

    // arrange
    const subject = null;
    const expected = None();

    // act
    const act = toOption(subject);

    // assert
    await act.should.be.congruent(expected);
  });

  it("should convert a valid value to Some", async function() {

    // arrange
    const subject = "hello!";
    const expected = Some("hello!");

    // act
    const act = toOption(subject);

    // assert
    await act.should.be.congruent(expected);
  });

});
