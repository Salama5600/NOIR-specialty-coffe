import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, Check, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    showToast
  } = useApp();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card'>('apple');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffToFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
      showToast('Order confirmed & nitrogen-sealed!', 'success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setCheckoutSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-[420px] bg-white border-l border-[#EBE4DA] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EBE4DA] flex items-center justify-between bg-white/95 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B57438]" />
              <h3 className="font-serif text-lg font-bold text-[#1A1816]">
                Artisanal Bag & Cart
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full border border-[#EBE4DA] flex items-center justify-center text-[#1A1816] hover:text-[#B57438] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar for free shipping */}
          <div className="px-5 py-3.5 bg-[#FAF7F2] border-b border-[#EBE4DA]">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-[#4A453F] font-medium">
                {diffToFree === 0
                  ? 'Unlocked: Complimentary Express Shipping!'
                  : `$${diffToFree.toFixed(0)} away from Free Express Shipping`}
              </span>
              <span className="font-mono text-[#B57438] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#EBE4DA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B57438] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {checkoutSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#B57438]/15 border border-[#B57438] text-[#B57438] mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#1A1816]">
                  Order Secured with Distinction
                </h4>
                <p className="text-xs text-[#68625B] max-w-xs mx-auto leading-relaxed">
                  Your beans are scheduled for freshly roasted micro-batching and oxygen-free nitrogen packaging.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-[#B57438] text-white text-xs font-bold shadow-md hover:bg-[#9E6028]"
                >
                  Continue Exploring
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center text-[#7A736A] space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-neutral-300" />
                <p className="text-sm font-medium">Your coffee bag is currently empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EBE4DA] flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#EBE4DA]"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-serif text-xs font-bold text-[#1A1816] truncate">
                      {item.name}
                    </h4>
                    <div className="text-[10px] text-[#B57438] font-bold mt-0.5">
                      {item.size} • {item.grind}
                    </div>
                    <div className="font-sans text-xs font-bold text-[#1A1816] mt-1">
                      ${item.price}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-white rounded-full border border-[#EBE4DA] px-2 py-0.5 shadow-sm">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="text-xs text-[#68625B] hover:text-[#B57438] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#1A1816] px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="text-xs text-[#68625B] hover:text-[#B57438] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {!checkoutSuccess && cart.length > 0 && (
            <div className="p-5 border-t border-[#EBE4DA] bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#68625B]">
                  <span>Subtotal:</span>
                  <span className="font-sans font-bold text-[#1A1816]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#68625B]">
                  <span>Insured Express Shipping:</span>
                  <span className="text-[#B57438] font-bold">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$15.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1A1816] pt-2 border-t border-[#EBE4DA]">
                  <span>Final Total:</span>
                  <span className="font-serif text-lg text-[#B57438]">
                    ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 15)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment selector */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'apple'
                      ? 'border-[#B57438] bg-[#B57438]/10 text-[#B57438]'
                      : 'border-[#EBE4DA] text-[#68625B]'
                  }`}
                >
                  <span>🍏 Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#B57438] bg-[#B57438]/10 text-[#B57438]'
                      : 'border-[#EBE4DA] text-[#68625B]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-[48px] rounded-full bg-[#B57438] hover:bg-[#9E6028] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 caramel-glow-hover cursor-pointer shadow-md shadow-[#B57438]/20 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span className="animate-pulse">Processing Encrypted Payment...</span>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'apple'
                        ? 'One-Click Apple Pay'
                        : 'Complete Order'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A736A] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B57438]" />
                <span>256-bit Encrypted Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
