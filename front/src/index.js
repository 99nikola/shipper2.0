import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/auth/AuthContext";
import { CartProvider } from './context/cart/CartContext';
import { ProductsProvider } from './context/products/ProductsContext';
import { ShippingProvider } from './context/shipping/ShippingContext';
import { SliderContext, SliderContextProvider } from './context/slider/SliderContext';

ReactDOM.render(
  <React.StrictMode>
      <AuthContextProvider>
        <ProductsProvider>
          <SliderContextProvider>
            <CartProvider>
              <ShippingProvider>
                <App />
              </ShippingProvider>
            </CartProvider>
          </SliderContextProvider>
        </ProductsProvider>
      </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

