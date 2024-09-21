import { init, addHeadlines, getAllHeadlines } from './persistence/mysql';

init().then((res) => {
    console.log('Initialized');
    console.log(res);
    addHeadlines().then((res) => {
        console.log('Added headlines');
        console.log(res);
        getAllHeadlines().then((res) => {
            console.log('Got all headlines');
            console.log(res);
        });
    });
})