import { describe, it, should, chai } from "vitest";
import { AnyCoveragePolicy, AnyCoveragePolicyConfig } from "../../../src/lib/policy/any-coverage-policy";
import { IntermediateEntry } from "../../../src/lib/output";
import { None, Some } from "../../../src/lib/core/option";

// @ts-ignore
import helper from "../../helper.js"
should();

chai.use(helper);

describe("AnyCoveragePolicy", () => {

  describe("evaluate", () => {

    const config: AnyCoveragePolicyConfig = {
      fail: 60,
      warn: 80,
      type: "any-coverage-policy",
    }

    const policy = new AnyCoveragePolicy(
      "No unit test coverage under 60%",
      "Unit Test Coverage",
      config
    );


    it("should return the same object if the target is not found", async () => {

      const current: IntermediateEntry = {
        sha: "random-sha",
        url: "random-url",
        action: "action",
        items: [
          {
            name: "Integration Test Coverage",
            url: "sample-url",
            data: {
              type: "test-coverage",
              branch: 100,
              function: 100,
              line: 100,
              statement: 100,
              delta: Some({
                branch: -50,
                line: -50,
                function: -50,
                statement: -50,
              }),
              resultDetails: {
                fail: [],
                pass: [
                  "Sample Policy"
                ],
                warn: [
                  "Sample Policy"
                ],
              }
            }
          }
        ]
      };
      const expected = {
        sha: "random-sha",
        url: "random-url",
        action: "action",
        items: [
          {
            name: "Integration Test Coverage",
            url: "sample-url",
            data: {
              type: "test-coverage",
              branch: 100,
              function: 100,
              line: 100,
              statement: 100,
              delta: Some({
                branch: -50,
                line: -50,
                function: -50,
                statement: -50,
              }),
              resultDetails: {
                fail: [],
                pass: [
                  "Sample Policy"
                ],
                warn: [
                  "Sample Policy"
                ],
              }
            }
          }
        ]
      };

      // act
      const actual = await policy.evaluate(current);

      // assert
      await actual.should.be.congruent(expected);

    });

    it("should return the same object if the target is found but the type is not test-coverage",async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-result",
                skip: 0,
                fail: 0,
                pass: 0,
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [],
                  warn: [],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-result",
                skip: 0,
                fail: 0,
                pass: 0,
                resultDetails: {
                  fail: [
                    "Sample Policy"],
                  pass: [],
                  warn: [],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        actual.should.deep.equal(expected);

    });

    it("should return with resultDetails pass increment by 1 if all coverage is higher than warning threshold", async function() {

      const current: IntermediateEntry = {
        sha: "random-sha",
        url: "random-url",
        action: "action",
        items: [
          {
            name: "Unit Test Coverage",
            url: "sample-url",
            data: {
              type: "test-coverage",
              branch: 96,
              function: 80,
              line: 99,
              statement: 100,
              delta: None(),
              resultDetails: {
                fail: [
                  "Sample Policy"
                ],
                pass: [
                  "All Test Must Pass",
                  "Skipped test must be lower than 20%",
                ],
                warn: [
                  "Function coverage must be higher than 80%",
                ],
              }
            }
          }
        ]
      };
      const expected = {
        sha: "random-sha",
        url: "random-url",
        action: "action",
        items: [
          {
            name: "Unit Test Coverage",
            url: "sample-url",
            data: {
              type: "test-coverage",
              branch: 96,
              function: 80,
              line: 99,
              statement: 100,
              delta: None(),
              resultDetails: {
                fail: [
                  "Sample Policy"
                ],
                pass: [
                  "All Test Must Pass",
                  "Skipped test must be lower than 20%",
                  "No unit test coverage under 60%"
                ],
                warn: [
                  "Function coverage must be higher than 80%",
                ],
              }
            }
          }
        ]
      };

      // act
      const actual = await policy.evaluate(current);

      // assert
      return actual.should.be.congruent(expected);


    });

    describe("any coverage is lower than warning threshold but higher than fail", () => {

      it("should return resultDetails warn increment by 1 if line coverage is lower than warning threshold but higher than fail", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 99,
                line: 69,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 99,
                line: 69,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "No unit test coverage under 60%"
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);


      });

      it("should return resultDetails warn increment by 1 if statement coverage is lower than warning threshold but higher than fail", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 99,
                line: 99,
                statement: 69,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 99,
                line: 99,
                statement: 69,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "No unit test coverage under 60%"
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);

      });

      it("should return resultDetails warn increment by 1 if function coverage is lower than warning threshold but higher than fail", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 69,
                line: 99,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 69,
                line: 99,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "No unit test coverage under 60%"
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);
      });

      it("should return resultDetails warn increment by 1 if branch coverage is lower than warning threshold but higher than fail", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 60,
                function: 99,
                line: 99,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 60,
                function: 99,
                line: 99,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "No unit test coverage under 60%"
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        return actual.should.be.congruent(expected);

      });

      it("should return resultDetails warn increment by 1 if all coverage is lower than warning threshold but higher than fail", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 60,
                function: 69,
                line: 69,
                statement: 69,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 60,
                function: 69,
                line: 69,
                statement: 69,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "No unit test coverage under 60%"
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);


      });

    });


    describe("any coverage is lower than fail threshold", function() {

      it("should return resultDetails fail increment by 1 if function coverage is lower than fail threshold", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 59,
                line: 99,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 59,
                line: 99,
                statement: 100,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy",
                    "No unit test coverage under 60%"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);

      });

      it("should return resultDetails fail increment by 1 if line coverage is lower than fail threshold", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 60,
                line: 59,
                statement: 79,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 60,
                line: 59,
                statement: 79,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy",
                    "No unit test coverage under 60%"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);

      });

      it("should return resultDetails fail increment by 1 if statement coverage is lower than fail threshold", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 60,
                line: 60,
                statement: 59,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 96,
                function: 60,
                line: 60,
                statement: 59,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy",
                    "No unit test coverage under 60%"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);


      });

      it("should return resultDetails fail increment by 1 if branch coverage is lower than fail threshold", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 46,
                function: 100,
                line: 85,
                statement: 90,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 46,
                function: 100,
                line: 85,
                statement: 90,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy",
                    "No unit test coverage under 60%"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);

      });

      it("should return resultDetails fail increment by 1 if all coverage is lower than warn threshold", async function() {

        const current: IntermediateEntry = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 44,
                function: 33,
                line: 59,
                statement: 28,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "Line coverage must be higher than 60%",
                    "Statement coverage must be higher than 60%",
                    "Branch coverage must be higher than 60%",
                  ],
                }
              }
            }
          ]
        };
        const expected = {
          sha: "random-sha",
          url: "random-url",
          action: "action",
          items: [
            {
              name: "Unit Test Coverage",
              url: "sample-url",
              data: {
                type: "test-coverage",
                branch: 44,
                function: 33,
                line: 59,
                statement: 28,
                delta: None(),
                resultDetails: {
                  fail: [
                    "Sample Policy",
                    "No unit test coverage under 60%"
                  ],
                  pass: [
                    "All Test Must Pass",
                    "Skipped test must be lower than 20%",
                  ],
                  warn: [
                    "Function coverage must be higher than 80%",
                    "Line coverage must be higher than 60%",
                    "Statement coverage must be higher than 60%",
                    "Branch coverage must be higher than 60%",
                  ],
                }
              }
            }
          ]
        };

        // act
        const actual = await policy.evaluate(current);

        // assert
        return actual.should.be.congruent(expected);


      });

    });

  });

});
