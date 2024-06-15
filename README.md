# zapNet

ZapNet is a powerful and flexible HTTP client built on top of the native fetch API, designed to simplify network requests in JavaScript and TypeScript applications. It  offers  streamlined approach to making GET, POST, PUT, DELETE, and PATCH requests with enhanced configurability and convenience.

## Installation

```Code
npm install zapnet
```

or

```Code
yarn add zapnet
```

## Usage

Here's a basic example of how to use zapNet to make a GET request:

```Javascript
import zapNet from "zapnet";

const users = await zapNet.get("https://api.github.com/users");
console.log({users})
```

## Creating an instance

You can create a new instance of zapnet with a custom config.

zapnet.create([config])

```Javascript
const instance = zapnet.create({
  baseUrl: 'https://some-domain.com/api/',
  options:{
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  }
});
```

## Options

You can pass additional options to customize your requests. These options are passed directly to the `fetch` function, so you can use any options that fetch supports, such as headers, credentials, mode, cache, redirect, referrer, integrity, and it also support params.

Example with options:

```Javascript
import zapNet from "zapnet";

const users = await zapNet.get("https://api.github.com/users", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN"
  },
  params:{
    page:1,
    size:20
  }
});
console.log(users);
```

## Handling Responses

`zapNet` automatically parses JSON responses and handles HTTP errors. If the response is not in JSON format or there is an error, `zapNet` will throw an appropriate error.

Example of handling errors:

```Javascript
import zapNet from "zapnet";

try {
  const users = await zapNet.get("https://api.github.com/users");
  console.log(users);
} catch (error) {
    const {message,error,response}
  console.error("Error fetching users:", {message,error,response});

}
```

## Instance methods

The available instance methods are listed below. The specified config will be merged with the instance config.

#### zapnet#request(config)

#### zapnet#get(url[, config])

#### zapnet#delete(url[, config])

#### zapnet#head(url[, config])

#### zapnet#options(url[, config])

#### zapnet#post(url[, data[, config]])

#### zapnet#put(url[, data[, config]])

#### zapnet#patch(url[, data[, config]])

#### zapnet#getUri([config])

## Api

### zapNet.get(url, [options])

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

Happy coding! If you have any questions or feedback, feel free to open an issue or submit a pull request.