import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Phone,
  User,
  MapPin,
  Tag,
  Building2,
  Wallet,
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
  X,
  Gift,
  Timer
} from 'lucide-react';

function ConfettiEffect() {
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: i % 2 === 0 ? '#cc0000' : '#000000',
          }}
        />
      ))}
    </>
  );
}

function ExitDiscountModal({ onClose, onApply }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="bg-white w-full max-w-sm rounded-[32px] border-4 border-[#cc0000] p-8 text-center space-y-6 relative overflow-hidden shadow-[0_20px_50px_rgba(204,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#cc0000]/10 rounded-full" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
          aria-label="Затвори"
        >
          <X size={24} />
        </button>
        <div className="bg-[#cc0000] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-white rotate-12 shadow-xl">
          <Gift size={40} />
        </div>
        <div className="space-y-2">
          <h2 id="exit-modal-title" className="text-3xl font-black text-black uppercase leading-none italic">
            ПОЧАКАЙТЕ!
          </h2>
          <p className="font-bold text-gray-500 text-sm italic">Не бързайте да си тръгвате!</p>
        </div>
        <div className="bg-amber-400 py-4 rounded-2xl border-2 border-black">
          <span className="block text-4xl font-black text-black uppercase">-10% ЕКСТРА</span>
          <span className="block text-[10px] font-black uppercase text-black opacity-80 leading-snug px-1">
            Забелязахме, че напускате формата преди да приключите — останете и вземете тази отстъпка.
          </span>
        </div>
        <button
          type="button"
          onClick={onApply}
          className="w-full bg-[#cc0000] text-white py-4 rounded-xl text-lg font-black shadow-[0_5px_0_rgb(150,0,0)] hover:translate-y-1 transition-all uppercase"
        >
          ВЗЕМИ ОТСТЪПКАТА
        </button>
      </div>
    </div>
  );
}

function ThankYouModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative bg-white w-full max-w-md rounded-[28px] border-4 border-black shadow-[0_24px_60px_rgba(0,0,0,0.25)] overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="thank-you-title"
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#cc0000] via-amber-400 to-[#cc0000]" />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-black transition-colors"
          aria-label="Затвори"
        >
          <X size={20} />
        </button>
        <div className="px-8 pt-12 pb-8 space-y-5">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg ring-4 ring-green-200">
            <CheckCircle size={44} strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <h2 id="thank-you-title" className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
              Благодарим Ви!
            </h2>
            <p className="text-sm md:text-base font-bold text-gray-600 leading-relaxed">
              Поръчката е приета успешно. Ще се свържем с Вас в{' '}
              <span className="text-[#25D366] font-black">WhatsApp</span> скоро за потвърждение.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-black text-white py-4 rounded-xl text-base font-black uppercase tracking-wide shadow-[0_4px_0_#333] hover:translate-y-0.5 active:translate-y-1 transition-transform"
          >
            Разбрах
          </button>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const EURO_TO_BGN = 1.96;
  const EXIT_DISCOUNT_AMOUNT = 9.00; 
  
  const [view, setView] = useState('landing'); 
  const [showExitModal, setShowExitModal] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [timeLeft, setTimeLeft] = useState(900); 
  const [discountTimer, setDiscountTimer] = useState(300); 
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const lastScrollY = useRef(0);
  const galleryRef = useRef(null);
  const skipExitIntentRef = useRef(false);
  const viewRef = useRef(view);
  const discountAppliedRef = useRef(discountApplied);
  const exitOfferEligibleRef = useRef(true);
  const showExitModalRef = useRef(false);
  const hasShownExitPopup = useRef(false);

  viewRef.current = view;
  discountAppliedRef.current = discountApplied;
  showExitModalRef.current = showExitModal;

  useEffect(() => {
    const complete = [name, phone, city, address].every((v) => String(v).trim().length > 0);
    exitOfferEligibleRef.current = !complete;
  }, [name, phone, city, address]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const st = window.history.state;
    if (!st?.appSeeded) {
      window.history.replaceState({ ...st, appSeeded: true }, '', window.location.href);
    }
  }, []);

  const basePrices = {
    unit1: 49.00,
    unit2: 90.00,
  };

  const product = {
    name: "Професионална Газова Горелка 1300°C",
    images: [
      "https://ae01.alicdn.com/kf/S8328a899c6b14184b8929db51169f23am.jpg",
      "https://ae01.alicdn.com/kf/S90bb9a859f04477382af6342cc85e22cR.jpg",
      "https://ae01.alicdn.com/kf/Scf73982cfc45447f8ac6205b843f2967g.jpg",
    ],
    highlights: [
      "Мощен пламък до 1300°C – моментално запалване",
      "Лесна за използване – само с едно натискане",
      "Подходяща за кухня, къмпинг и ремонти",
      "Издръжлива и безопасна конструкция",
      "Работи с газови бутилки (универсален стандарт)"
    ],
    detailTitle: "Подробно за продукта",
    detailParagraphs: [
      "Професионална газова горелка с интензивен и контролируем пламък до 1300°C – идеална за бързо запалване на въглища за BBQ, кухненски задачи, дребни ремонти и къмпинг.",
      "Ергономичен корпус и издръжлива конструкция за ежедневна употреба; запалване с едно натискане и възможност за настройка на пламъка според нуждите ви.",
      "Съвместима със стандартни газови бутилки (универсален накрайник). Поръчвате спокойно – плащате при получаване, след като видите продукта."
    ]
  };

  const mainHeadline = "Мощна Горелка 1300°C – Пали Всичко за Секунди!";
  const subHeadline = "Идеална за BBQ, ремонт, запалване на въглища и много повече!";
  const ctaText = "ПОРЪЧАЙ СЕГА И ПЛАТИ ПРИ ДОСТАВКА";
  const useCaseTitle = "За какво може да се използва?";
  const useCases = [
    "Запалване на въглища за BBQ",
    "Ремонтни дейности",
    "Размразяване през зимата",
    "Кухненски приложения"
  ];

  const triggerExitIntent = () => {
    if (hasShownExitPopup.current) return;
    if (skipExitIntentRef.current) return;
    if (discountAppliedRef.current) return;
    if (!exitOfferEligibleRef.current) return;
    if (showExitModalRef.current) return;

    hasShownExitPopup.current = true;
    setShowExitModal(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      if (discountApplied) {
        setDiscountTimer(prev => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [discountApplied]);

  useEffect(() => {
    const handleScroll = () => {
      if (view === 'landing') {
        setShowStickyBtn(window.scrollY > 400);
      } else {
        setShowStickyBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  useEffect(() => {
    if (view !== 'checkout') return;

    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = lastY - currentY;
      if (diff > 40 && currentY < 150) {
        triggerExitIntent();
      }
      lastY = currentY;
    };

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        triggerExitIntent();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [view]);

  useEffect(() => {
    if (view !== 'checkout') return;

    const onPopState = (e) => {
      if (!hasShownExitPopup.current && !discountAppliedRef.current && !skipExitIntentRef.current && exitOfferEligibleRef.current) {
        window.history.pushState({ appCheckout: true }, '', window.location.href);
        triggerExitIntent();
      } else {
        setView('landing');
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [view]);

  const applyExtraDiscount = () => {
    setDiscountApplied(true);
    setShowConfetti(true);
    setShowExitModal(false);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const goToCheckout = () => {
    skipExitIntentRef.current = false;
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ appCheckout: true }, '', window.location.href);
    }
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const goToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleBackFromCheckout = () => {
    if (discountAppliedRef.current) {
      goToLanding();
      return;
    }
    if (skipExitIntentRef.current) {
      goToLanding();
      return;
    }
    if (exitOfferEligibleRef.current) {
      triggerExitIntent();
      return;
    }
    goToLanding();
  };

  const closeThankYouAndGoHome = () => {
    setShowThankYou(false);
    skipExitIntentRef.current = false;
    goToLanding();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getCheckoutPrice = () => {
    const originalPrice = selectedUnit === 1 ? basePrices.unit1 : basePrices.unit2;
    return discountApplied ? originalPrice - EXIT_DISCOUNT_AMOUNT : originalPrice;
  };

  const currentPriceEuro = getCheckoutPrice();
  const originalPriceInCheckout = selectedUnit === 1 ? basePrices.unit1 : basePrices.unit2;
  const currentPriceBGN = currentPriceEuro * EURO_TO_BGN;

  const sendToTelegram = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      alert('Моля, попълнете име и телефон.');
      return;
    }

    const unitLabel = selectedUnit === 1 ? '1 БРОЙ' : '2 БРОЯ';
    const text = [
      '🛒 НОВА ПОРЪЧКА',
      `📋 ${product.name}`,
      '',
      `👤 ${trimmedName}`,
      `📞 ${trimmedPhone}`,
      '',
      `📦 ${unitLabel}`,
      `💰 €${currentPriceEuro.toFixed(2)}`,
      '',
      `📍 ${city.trim() || '-'}`,
      `🏠 ${address.trim() || '-'}`,
    ].join('\n');

    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.trim();
    const chatIdRaw = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatIdRaw) {
      alert(
        'Липсва VITE_TELEGRAM_BOT_TOKEN или VITE_TELEGRAM_CHAT_ID в .env.local (рестартирайте npm run dev).'
      );
      return;
    }

    const chatId = /^-?\d+$/.test(chatIdRaw) ? Number(chatIdRaw) : chatIdRaw;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    setIsSubmitting(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        if (window.fbq) {
          window.fbq('track', 'Lead');
        }
        skipExitIntentRef.current = true;
        setName('');
        setPhone('');
        setCity('');
        setAddress('');
        setShowThankYou(true);
        return;
      }
      const desc = String(data.description || '');
      let errMsg = 'Грешка при изпращане ❌';
      if (desc.toLowerCase().includes('chat not found')) {
        errMsg =
          'Не е намерен чат в Telegram.\n\n' +
          '1) Отворете вашия бот в Telegram\n' +
          '2) Натиснете START (/start)\n' +
          '3) Проверете VITE_TELEGRAM_CHAT_ID в .env.local';
      } else if (desc.includes('Unauthorized') || desc.toLowerCase().includes('invalid')) {
        errMsg = 'Невалиден Bot Token. Проверете VITE_TELEGRAM_BOT_TOKEN в .env.local';
      } else if (desc) {
        errMsg = `${errMsg}\n${desc}`;
      }
      alert(errMsg);
    } catch {
      alert(
        'Грешка при изпращане ❌\n(Ако е мрежова грешка: някои браузъри блокират директни заявки към Telegram — тогава трябва backend или proxy.)'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full bg-white border-2 border-black rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/10 font-bold text-base transition-all";
  const labelStyle = "text-sm md:text-base font-black uppercase text-black ml-1 tracking-tight block mb-2";

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes arrow-move { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
      .animate-arrow-loop { animation: arrow-move 1s ease-in-out infinite; }
      @keyframes confetti-fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      .confetti-piece { position: fixed; width: 10px; height: 20px; background-color: #cc0000; top: -20px; z-index: 200; animation: confetti-fall 3s linear forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (view === 'checkout') {
    const formValues = { name, phone, city, address };
    const formSetters = { name: setName, phone: setPhone, city: setCity, address: setAddress };
    const checkoutInputs = [
      { key: 'name', label: 'Име и Фамилия', icon: <User size={20} />, placeholder: 'Въведете две имена...' },
      { key: 'phone', label: 'Телефонен Номер', icon: <Phone size={20} />, placeholder: '08XX XXX XXX' },
      { key: 'city', label: 'Град', icon: <Building2 size={20} />, placeholder: 'Вашият град...' },
      { key: 'address', label: 'Адрес за Доставка', icon: <MapPin size={20} />, placeholder: 'Улица, номер, блок...' },
    ];

    return (
      <div className="min-h-[100dvh] bg-[#f2f2f2] pb-[max(2.5rem,env(safe-area-inset-bottom))] max-w-lg mx-auto w-full">
        {showThankYou && <ThankYouModal onClose={closeThankYouAndGoHome} />}
        {showExitModal && (
          <ExitDiscountModal
            onClose={() => setShowExitModal(false)}
            onApply={applyExtraDiscount}
          />
        )}
        {showConfetti && <ConfettiEffect />}
        
        <div className="bg-white border-b-2 border-black p-4 flex items-center justify-between sticky top-0 z-40">
          <button type="button" onClick={handleBackFromCheckout} className="p-2 bg-gray-100 rounded-lg" aria-label="Назад"><ArrowLeft size={20} /></button>
          <span className="font-black text-sm uppercase tracking-tighter">Оформяне на поръчка</span>
          <div className="w-10" />
        </div>

        <div className="p-4 lg:p-8">
          <div className="max-w-2xl mx-auto space-y-4">
            
            {discountApplied && (
              <div className="bg-[#cc0000] text-white p-4 rounded-2xl border-2 border-black flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl text-[#cc0000] animate-pulse">
                    <Gift size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase leading-tight italic">ОТСТЪПКАТА Е АКТИВИРАНА!</p>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter italic">Валидна само още 5 минути</p>
                  </div>
                </div>
                <div className="bg-white/20 px-3 py-1.5 rounded-lg border border-white/30 flex items-center gap-2">
                   <Timer size={14} />
                   <span className="font-black text-sm tabular-nums">{formatTime(discountTimer)}</span>
                </div>
              </div>
            )}

            <div className="bg-white p-5 rounded-[28px] border-2 border-black flex items-center gap-5 relative overflow-hidden shadow-sm">
                <div className="relative">
                 <img src={product.images[0]} className="w-24 h-24 object-cover rounded-2xl border-2 border-black bg-gray-50 shadow-inner" alt="" />
                 {discountApplied && (
                   <div className="absolute -top-2 -left-2 bg-amber-400 text-black text-[10px] font-black px-2 py-1 rounded-lg border-2 border-black shadow-md rotate-[-10deg] animate-pulse">
                     -10% ЕКСТРА
                   </div>
                 )}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-black text-black text-[11px] md:text-sm uppercase leading-tight">{product.name}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                     <span className="text-[10px] font-black text-gray-500 uppercase px-3 py-1 bg-gray-100 rounded-full border border-black/5">
                       {selectedUnit === 1 ? '1 БРОЙ' : '2 БРОЯ (ПАКЕТ)'}
                     </span>
                     <div className="flex flex-col items-end">
                        {discountApplied ? (
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                               <div className="relative">
                                 <span className="text-sm md:text-base font-black text-gray-400 italic">€{originalPriceInCheckout.toFixed(2)}</span>
                                 <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#cc0000] -rotate-12 opacity-80 rounded-full" />
                               </div>
                               <span className="text-2xl md:text-3xl font-black text-[#cc0000]">€{currentPriceEuro.toFixed(2)}</span>
                            </div>
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter mt-1 italic">ПРИЛОЖЕНА СПЕЦИАЛНА ОТСТЪПКА</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-black text-black">€{currentPriceEuro.toFixed(2)}</span>
                        )}
                     </div>
                  </div>
                </div>
            </div>

            <div className="bg-white p-5 lg:p-10 rounded-[32px] shadow-xl border-2 border-black space-y-8">
              <div className="space-y-6">
                {checkoutInputs.map((field) => (
                  <div key={field.key} className="space-y-1">
                    <label className={labelStyle}>{field.label}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black flex items-center justify-center pointer-events-none">
                        {field.icon}
                      </div>
                      <input
                        className={inputStyle}
                        placeholder={field.placeholder}
                        name={field.key}
                        value={formValues[field.key]}
                        onChange={(e) => formSetters[field.key](e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border-2 border-black space-y-3">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
                  <span>Доставка:</span>
                  <span className="text-green-600 font-black italic">БЕЗПЛАТНА</span>
                </div>
                {discountApplied && (
                    <div className="flex justify-between text-xs font-bold text-[#cc0000] uppercase">
                    <span>Специална отстъпка:</span>
                     <span className="font-black italic">-€{EXIT_DISCOUNT_AMOUNT.toFixed(2)}</span>
                   </div>
                )}
                <div className="h-px bg-gray-200 w-full" />
                <div className="flex justify-between items-end">
                  <span className="font-black text-sm uppercase">Общо:</span>
                  <div className="text-right">
                    <p className="font-black text-3xl text-black leading-none">€{currentPriceEuro.toFixed(2)}</p>
                    <p className="text-sm font-black text-[#cc0000] mt-1 uppercase">({currentPriceBGN.toFixed(2)} лв.)</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={sendToTelegram}
                disabled={isSubmitting}
                className="w-full bg-[#cc0000] text-white py-4 rounded-2xl font-black shadow-[0_6px_0_rgb(150,0,0)] hover:translate-y-1 active:translate-y-1.5 transition-all flex flex-col sm:flex-row items-center justify-center gap-2 uppercase disabled:opacity-60 disabled:pointer-events-none px-3"
              >
                <span className="leading-snug text-center text-xs sm:text-sm">{ctaText}</span>
                <CheckCircle size={22} className="shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100dvh] font-sans text-slate-900 max-w-lg mx-auto w-full shadow-none sm:shadow-xl sm:max-w-lg"
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 bg-gradient-to-t from-[#f2f2f2] to-transparent transition-all duration-300 transform max-w-lg mx-auto ${
          showStickyBtn ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={goToCheckout}
          className="w-full bg-[#cc0000] text-white py-3 sm:py-4 rounded-2xl font-black shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-2 border-2 border-white animate-bounce px-2"
        >
          <ShoppingBag size={20} className="shrink-0" />
          <span className="text-[10px] sm:text-[11px] uppercase leading-tight text-center">{ctaText}</span>
        </button>
      </div>

      <div className="bg-[#cc0000] text-white py-2.5 px-4 flex items-center justify-center gap-3 sticky top-0 z-30">
        <Clock size={16} className="animate-pulse shrink-0" />
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-center leading-tight">
          ФЛАШ ОФЕРТА: ПРИКЛЮЧВА СЛЕД {formatTime(timeLeft)}
        </p>
      </div>

      <main className="w-full px-4 py-4 pb-28">
        <div className="grid grid-cols-1 gap-8 items-start">
          <div className="space-y-4" ref={galleryRef}>
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2 border-2 border-black">
              <div className="absolute top-4 left-4 z-10 bg-[#cc0000] text-white px-5 py-2 rounded-full font-black text-sm flex items-center gap-2 border-2 border-white shadow-lg">
                <Tag size={16} /> -50% ОТСТЪПКА
              </div>
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full aspect-square object-contain bg-gray-50 rounded-2xl"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  aria-label={`Изображение ${i + 1}`}
                  aria-pressed={activeImageIndex === i}
                  className={`rounded-xl overflow-hidden border-2 bg-white p-1 h-24 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0000] focus-visible:ring-offset-2 ${
                    activeImageIndex === i ? 'border-[#cc0000] ring-2 ring-[#cc0000]/30 shadow-md' : 'border-black'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain rounded-lg pointer-events-none" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 flex-wrap">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                <span className="text-xs font-black ml-2 text-gray-400 uppercase">4.9/5 (2,840+ ОТЗИВА)</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-black leading-snug uppercase px-1">
                {mainHeadline}
              </h1>
              <p className="text-sm sm:text-[15px] font-bold text-gray-700 leading-snug px-2 max-w-md mx-auto">
                {subHeadline}
              </p>
              <div className="space-y-2 text-left max-w-md mx-auto pt-1">
                {product.highlights.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full p-1 shrink-0 mt-0.5">
                      <CheckCircle size={14} strokeWidth={4} />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-700 uppercase leading-snug">{text}</span>
                  </div>
                ))}
              </div>
              <div className="text-left max-w-md mx-auto w-full pt-2 border-t border-gray-200/80">
                <p className="text-[11px] sm:text-xs font-black text-black uppercase tracking-wide mb-2 text-center sm:text-left">
                  {useCaseTitle}
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-800 list-disc pl-5 marker:text-[#cc0000]">
                  {useCases.map((item, i) => (
                    <li key={i} className="leading-snug pl-0.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-baseline justify-center gap-4 pt-2">
                <span className="text-3xl sm:text-4xl font-black text-[#cc0000]">€49.00</span>
                <div className="relative inline-block">
                  <span className="text-lg sm:text-xl font-black text-black italic">€97.00</span>
                  <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#cc0000] -rotate-6 rounded-full" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { id: 1, label: '1 Брой', sub: 'Плащане при доставка', price: basePrices.unit1 },
                { id: 2, label: '2 Броя (ПАКЕТ)', sub: 'По-изгодно за 2 броя', price: basePrices.unit2, best: true }
              ].map((offer) => (
                <div
                  key={offer.id}
                  onClick={() => setSelectedUnit(offer.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center bg-white relative overflow-hidden active:scale-[0.99] ${
                    selectedUnit === offer.id ? 'border-[#cc0000] shadow-md ring-2 ring-[#cc0000]/20' : 'border-black'
                  }`}
                >
                  {offer.best && (
                    <div className="absolute top-0 right-0 text-[8px] font-black px-3 py-1.5 rounded-bl-xl uppercase border-l border-b border-black bg-amber-400 text-black">
                      Най-изгодно
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${selectedUnit === offer.id ? 'border-[#cc0000]' : 'border-black'}`}>
                      {selectedUnit === offer.id && <div className="w-3 h-3 bg-[#cc0000] rounded-full" />}
                    </div>
                    <div>
                      <h4 className="font-black text-sm sm:text-base text-black">{offer.label}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{offer.sub}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-lg sm:text-xl font-black ${selectedUnit === offer.id ? 'text-[#cc0000]' : 'text-black'}`}>
                      €{offer.price.toFixed(2)}
                    </p>
                    <p className="text-[9px] font-black px-2 py-0.5 rounded mt-1 bg-gray-100 text-black uppercase tracking-tighter">
                      {(offer.price * EURO_TO_BGN).toFixed(2)} лв.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={goToCheckout}
              className="w-full bg-black text-white py-4 sm:py-5 rounded-2xl text-xs sm:text-sm font-black shadow-xl active:bg-[#cc0000] transition-colors flex flex-col sm:flex-row items-center justify-center gap-2 uppercase touch-manipulation px-3"
            >
              <span className="leading-snug text-center">{ctaText}</span>
              <ArrowRight size={22} className="animate-arrow-loop shrink-0" />
            </button>
            <div className="flex flex-col gap-2 text-center text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight px-1">
              <p className="leading-snug">🚚 Бърза доставка за 1-2 дни</p>
              <p className="leading-snug">💰 Плащане при получаване</p>
            </div>

            <div className="text-left max-w-md mx-auto w-full space-y-4 pt-2 border-t-2 border-gray-200">
              <h2 className="font-black text-sm sm:text-base uppercase text-black tracking-tight text-center sm:text-left">
                {product.detailTitle}
              </h2>
              <div className="space-y-3 text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                {product.detailParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(i);
                      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`rounded-xl overflow-hidden border-2 bg-gray-50 aspect-square p-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cc0000] focus-visible:ring-offset-2 ${
                      activeImageIndex === i ? 'border-[#cc0000] ring-2 ring-[#cc0000]/25' : 'border-black/20'
                    }`}
                    aria-label={`Галерия: изображение ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain rounded-lg pointer-events-none" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white py-10 px-4 mt-8 border-t-2 border-black">
        <div className="max-w-lg mx-auto grid grid-cols-1 gap-8">
          <div className="text-center space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 border-black shadow-sm">
              <Truck size={32} className="text-[#cc0000]" />
            </div>
            <h3 className="font-black text-lg uppercase">Доставка до адрес</h3>
            <p className="text-sm text-gray-600 font-bold uppercase leading-tight">
              Изпращаме в цяла България с куриер до вратата ви.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 border-black shadow-sm">
              <ShieldCheck size={32} className="text-[#cc0000]" />
            </div>
            <h3 className="font-black text-lg uppercase">2 Години гаранция</h3>
            <p className="text-sm text-gray-600 font-bold uppercase leading-tight">
              Покритие при заводски дефект – купувате спокойно.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 border-black shadow-sm">
              <Wallet size={32} className="text-[#cc0000]" />
            </div>
            <h3 className="font-black text-lg uppercase">Нулев риск</h3>
            <p className="text-sm text-gray-600 font-bold uppercase leading-tight">
              Прегледайте пратката при куриера – плащате само ако сте доволни.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
