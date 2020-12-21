import "tailwindcss/tailwind.css";
import { createWrapper} from 'next-redux-wrapper'

import store from '../redux/store'

const WrappedApp = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

const makeStore = (context) => store
const wrapper = createWrapper(makeStore, {debug: true})

export default wrapper.withRedux(WrappedApp)
