import assert = require("assert");
import qrcode_converter from "./qrcode_converter";

describe("qrcode_converter", () => {
  describe("default の qrcode_converter", () => {
    describe("実 URL が与えられたら", () => {
      it("期待する DataURI を返す", () => {
        const dataURI = "https://en.wikipedia.org/wiki/QR_code";
        const ret = qrcode_converter(dataURI);
        // tslint:disable-next-line:max-line-length
        assert(ret === "data:image/gif;base64,R0lGODdhSgBKAIAAAAAAAP///ywAAAAASgBKAAAC/4yPqcvtD6OctNqLs968+w+G4kiWZgKk6roa7ZMiL0urVF27NgzIO0679RqxUJFxjCQVy07TJ9TNhkmco4hl6aKBYJc6lGqJYHGW682eUeUv9DtFj9Xt93oL/4WV4Hh+auV2QHfHZ9YWCFQnmLYH8TS4V7XohYfkyHMluWn5x0kmpLg2ilgqiql5ike6aipqQqp6IncYSGLLiOr58nbY+ZgT+RuJ29lowcoG3FgpXJHcS8Y8Fr284wNpt9gqhkxNrKs9HBtuCAqeqMerfJEtWDunfs0ucby7navZ3R4PP46vzV0qINj63ZvE5Js1XOngIWSzTk7DfOjmtYo4gZDBQuHFcmHUl1FeNYiYBC4wWXDfsJT0MijyRdKfp5XPCM6MeQ8mynPG5mF8mPBjyGjrfn4KatFcQToq3zk1iqHJtKZA8yTkwDTn0z5HKWrIOvFi10LeisZr5vCVy2/TjJ5CO6KtTak2RcgNW1HoJVlLfW4iR3PgS5JmWYItdwlkYGdkrTquV65qYq/gmgLT+deVWbwS9RjmujnYzqs3yUErzRYxO3sauVWEuZg0a9GqXds2N9ve5a2xW8oOdnuf7qHnGOID5LmmrNwlk5IOpZY50t2zqlu/jj279u3cu3v/Dj58ggIAOw==");
      });
    });
  });
});
