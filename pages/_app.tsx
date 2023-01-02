import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/organisms/Layout';
import Router from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  function routeChange(){
    (function(){
      const allstylesElems=document.querySelectorAll('style[media="x"]');
      allstylesElems.forEach(elem=>elem.removeAttribute("media"));
    })();
  }
  useEffect(() => {
    Router.events.on('routeChangeComplete', routeChange);
    Router.events.on('routeChangeStart', routeChange);
    return () => {
        Router.events.off('routeChangeComplete', routeChange);
        Router.events.off('routeChangeStart', routeChange);
    };
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
