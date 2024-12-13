module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(@testing-library)/)", // Don't ignore @testing-library dependencies
        "/node_modules/(?!(@fetch-mock)/)"
    ],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom",
    ],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],

    // jest-fetch-mock
    automock: false,
    resetMocks: false,
    setupFiles: ["./jest.setup.js"],
};