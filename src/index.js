
import ReactDom from 'react-dom';
import 'papercss';

import getRouter from './router/router';

ReactDom.render(
    getRouter(), document.getElementById('root'));