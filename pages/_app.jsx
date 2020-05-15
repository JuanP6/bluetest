import App from 'next/app';
import {Provider} from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../redux/store';
import PropTypes from 'prop-types';

const MyApp = (props) => {

    const {Component, pageProps, store} = props;

        return (
            <Provider store={store}>
                <Component {...pageProps}/>
            </Provider> 
        );
}

const makeStore = () => store;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({Component, ctx})  => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps: pageProps};
}

export default withRedux(makeStore)(MyApp);