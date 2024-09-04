import { Dependencie } from "../models/dependencie";

const JS_DEPENDENCIES: Dependencie[] = [
    { id: 1, title: 'express', description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
    { id: 2, title: 'axios', description: "Axios is a promise-based HTTP Client for node.js and the browser." },
    { id: 3, title: 'lodash', description: "A modern JavaScript utility library delivering modularity, performance & extras." },
]

const TS_DEPENDENCIES: Dependencie[] = [
    { id: 1, title: 'express', description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
    { id: 2, title: 'axios', description: "Axios is a promise-based HTTP Client for node.js and the browser." },
    { id: 3, title: 'lodash', description: "A modern JavaScript utility library delivering modularity, performance & extras." },
]

type Libraries = {
    [key: string]: Dependencie[];
};

export const dependencie: Libraries = {
    "Javascript": JS_DEPENDENCIES,
    "Typescript": TS_DEPENDENCIES
}