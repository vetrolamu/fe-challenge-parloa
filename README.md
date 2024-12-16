# Big data, little client

Still to do:
- add some jest tests mocking the api call

## Frontend challenge
We have a really basic app and we would like you to:

1. Fix the class stats table; it's currently using mocked data; and we'd like it to use the data from the api.
2. Update the table component to support filtering of candidates in the list below by class when you click on the class name.
3. Improve the performance of the api call without reducing the size of the dataset being loaded from the api
4. Tell us how you might improve this codebase

## Notes
- the benchmarking is there to help us see the impact of changes from the last task; you can ignore it until then

## Running

- install dependencies `yarn`
- start the server: `node ./server/index.cjs`, server available at http://localhost:3003
- start the client: `yarn client`, client available at http://localhost:5173
- start tests: `yarn test`, can see test output in the terminal
