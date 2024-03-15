import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {persistStore} from "redux-persist";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Script from 'next/script';
import {store} from '@/store'
import React from 'react';
import RoutGuard from "@/components/routGuard";

declare global {
  interface Window {
    Kakao: any;
  }
}

export const kakaoInit = () => { // TODO 페이지가 로드되면 실행
  window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
}

const persistor = persistStore(store)


export default function App({ Component, pageProps }: AppProps) {
  return (
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Script
                src='https://developers.kakao.com/sdk/js/kakao.js'
                onLoad={kakaoInit}
            />
            <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
            <RoutGuard>
              <Component {...pageProps} />
            </RoutGuard>
          </PersistGate>
        </Provider>
      </React.StrictMode>
  )
}
